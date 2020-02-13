const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPaths = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Define handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPaths);
hbs.registerPartials(partialsPath);

//Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ilan The only one"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Ilan The only one"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is Andrew from the future",
    title: "Help",
    name: "Ilan The only one"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        return res.send({
          location,
          forecast: forecastData,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found",
    title: "404",
    name: "Ilan The only one"
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page not found",
    title: "404",
    name: "Ilan The only one"
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
