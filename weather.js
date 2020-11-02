const axios = require("axios");
const chalk = require("chalk");
const logger = require("./logger");
const WEATHER_API_URI = "https://api.openweathermap.org/data/2.5/weather";
const WEATHER_API_KEY = "50fbc8f10154c339525017d4b1f18ab5";
const TIMEZONE_API_KEY = "ZN6NMI40YXY6";
const TIMEZONE_API_URI = `http://api.timezonedb.com/v2.1/get-time-zone?key=${TIMEZONE_API_KEY}&format=json&by=position`;

const getWeather = async (...locations) => {
  locations.forEach(async (location) => {
    try {
      const { data } = await axios.get(
        `${WEATHER_API_URI}?${
          isNaN(location) ? "q" : "zip"
        }=${location}&appid=${WEATHER_API_KEY}&units=metric`
      );

      const { weather, main, name, coord } = data;
      let { data: timeZoneData } = await axios.get(
        `${TIMEZONE_API_URI}&lat=${coord.lat}&lng=${coord.lon}`
      );

      logger("Location Name", name);
      logger("Temperature  ", `${main.temp}°C`);
      logger("Feels like   ", `${main.feels_like}°C`);
      logger("Humidity     ", `${main.humidity}%`);
      logger(
        "Local Time   ",
        new Date().toLocaleString("en-US", {
          timeZone: timeZoneData.zoneName,
        })
      );
      console.log();
    } catch (error) {
      if (error.response.status === 404) {
        console.error(chalk.bgRed("Provided location is not correct\n"));
      } else if (error.response.status === 501) {
        console.error(chalk.red("Internal server error occured"));
      } else {
        console.error(error.response.statusText);
      }
    }
  });
};

module.exports = getWeather;
