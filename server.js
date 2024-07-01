const ip = require("ip");
const axios = require("axios");
const express = require("express");

const GeoController = require("./controllers/GeoController");

const app = express();
const port = process.env.PORT || 3000;

app.get("/api/hello", GeoController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
