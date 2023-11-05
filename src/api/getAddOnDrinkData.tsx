export default async function handler(req, res) {
    try {
      const response = await fetch("https://backend-rung.onrender.com/add_on_drink", { mode: "cors" });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        res.status(200).json(data);
      } else {
        // Handle cases where the response is not JSON
        res.status(500).json({ error: "Invalid response format" });
      }
    } catch (error)
     {const response = await fetch("https://backend-rung.onrender.com/add_on_food", { mode: "cors" });
    if (!response.ok) {
      console.error("Network response was not ok");
    }
    const responseText = await response.text();
    console.log("Response Text:", responseText);
    
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  