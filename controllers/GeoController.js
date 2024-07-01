const ip = require("ip");
const axios = require("axios");

async function GeoController(req, res) {
  const visitorName = req.query.visitor_name;
  const clientIp = ip.address();

  try {
    const geoResponse = await axios.get(`http://ip-api.com/json/${clientIp}`);

    const { city } = geoResponse.data;

    const location = city || "New York";
    const weatherResponse = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=da62c04782ee4945abb14728240107&q=${city}`
    );

    const temperature = weatherResponse.data?.current?.temp_c || 11;

    const response = {
      client_ip: clientIp,
      location: location,
      greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celcius in ${location}`,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching geo data:", error.message);
    res.status(500).json({ error: "Failed to fetch geo data" });
  }
}

module.exports = GeoController;
