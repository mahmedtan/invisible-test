const axios = require("axios");
const API_URI = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "50fbc8f10154c339525017d4b1f18ab5";

const getWeather = (...locations) => {
  const promiseArr = locations.map((location) => {
    return axios.get(
      `${API_URI}?${
        isNaN(location) ? "q" : "zip"
      }=${location}&appid=${API_KEY}&units=metric`
    );
  });
  Promise.all(promiseArr).then((responses) => {
    responses
      .map((res) => res.data)
      .forEach(({ weather, main, name, timezone }) => {
        console.log(`Location Name: ${name}`);
        console.log(`Temperature: ${main.temp}°C ${weather[0].main}`);
        console.log(`Feels like: ${main.feels_like}°C`);
        console.log(`Humidity: ${main.humidity}%`);
        console.log(`Time: ${timezone / 60 / 24}\n`);
      });
  });
};

module.exports = getWeather;
