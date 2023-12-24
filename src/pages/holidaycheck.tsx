import { useEffect, useState } from "react";
import { DateTime } from "luxon";

const useHolidayCheck = () => {
  const [currentTime, setCurrentTime] = useState(DateTime.local());
  const [holiday, setHoliday] = useState([]);

  useEffect(() => {
    const fetchHolidayData = async () => {
      try {
        const response = await fetch("https://backend-rung.onrender.com/holiday/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setHoliday(data);
      } catch (error) {
        console.log("Error fetching holiday data:", error);
      }
    };

    fetchHolidayData();

    const interval = setInterval(() => {
      setCurrentTime(DateTime.local());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const isClosed = () => {
    const currentDate = currentTime.toJSDate();
    const isWithinSpecifiedHours = currentTime.hour < 17 || currentTime.hour >= 21;

    return (
      isWithinSpecifiedHours ||
      holiday.some((holidayData) => {
        const holidayStartTime = DateTime.fromJSDate(holidayData.startDate);
        const holidayEndTime = DateTime.fromJSDate(holidayData.endDate);

        return currentDate >= holidayStartTime.toJSDate() && currentDate <= holidayEndTime.toJSDate();
      })
    );
  };

  const getHolidayNoteForCurrentTime = () => {
    const currentDateTime = DateTime.local();
    const matchingHoliday = holiday.find((holidayData) => {
      const holidayStartDateTime = DateTime.fromISO(holidayData.start_data);
      const holidayEndDateTime = DateTime.fromISO(holidayData.end_data);

      if (currentDateTime >= holidayStartDateTime && currentDateTime <= holidayEndDateTime) {
        console.log("Matched Holiday Note:", holidayData.holiday_note);
        return true;
      }

      return false;
    });

    return matchingHoliday?.holiday_note ?? "Today";
  };

  return { isClosed, getHolidayNoteForCurrentTime };
};

export default useHolidayCheck;
