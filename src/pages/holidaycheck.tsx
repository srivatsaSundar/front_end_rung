import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import axios from "axios";
import { toast } from "react-toastify";

const useHolidayCheck = () => {
  const [currentTime, setCurrentTime] = useState(DateTime.local());
  const [holiday, setHoliday] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://api.mrrung.com/shop_time_list/")
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error in fetching data");
      });
  };
  useEffect(() => {
    const fetchHolidayData = async () => {
      try {
        const response = await fetch(
          "https://api.mrrung.com/holiday/",
        );
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
    // Format current date and time to match the holiday data format
    const currentDateTimeFormatted = currentTime.toISO();

    const currentDate = currentTime.toJSDate();
    const currentShopTimings = data[0];

    const startTime = DateTime.fromISO(
      currentShopTimings?.shop_opening_time,
    ).toJSDate();
    const endTime = DateTime.fromISO(
      currentShopTimings?.shop_closing_time,
    ).toJSDate();

    const isNoService =
      currentDate < startTime || currentDate >= endTime;

    console.log("isNoService:", isNoService);

    const holidayCheck = holiday.some((holidayItem) => {
      // Keep holiday start and end time as is
      const holidayStartTime = holidayItem.start_data;
      const holidayEndTime = holidayItem.end_data;

      // console.log("currentDateTimeFormatted:", currentDateTimeFormatted);
      // console.log("holidayStartTime:", holidayStartTime);
      // console.log("holidayEndTime:", holidayEndTime);

      return (
        currentDateTimeFormatted >= holidayStartTime &&
        currentDateTimeFormatted <= holidayEndTime
      );
    });

    // console.log("holidayCheck:", holidayCheck);

    return isNoService || holidayCheck;
  };

  const getHolidayNoteForCurrentTime = () => {
    const currentDateTime = DateTime.local();
    const matchingHoliday = holiday.find((holidayData) => {
      const holidayStartDateTime = DateTime.fromISO(holidayData.start_data);
      const holidayEndDateTime = DateTime.fromISO(holidayData.end_data);

      if (
        currentDateTime >= holidayStartDateTime &&
        currentDateTime <= holidayEndDateTime
      ) {
        // console.log("Matched Holiday Note:", holidayData.holiday_note);
        return true;
      }

      return false;
    });

    return matchingHoliday?.holiday_note ?? "Today";
  };

  return { isClosed, getHolidayNoteForCurrentTime };
};

export default useHolidayCheck;
