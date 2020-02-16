const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/41b38cdeab70bf883ea5ae2cac22c4e9/${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location.", undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degress out. There is a ${body.currently.precipProbability} % chance of rain. 
        The high toady is ${body.daily.data[0].temperatureMax} with a low of ${body.daily.data[0].temperatureMin}`
      );
    }
  });
};

module.exports = forecast;
