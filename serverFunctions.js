const axios = require("axios");
const url = "http://localhost:3000";

const serverFunctions = {
  ping: () =>
    axios
      .get(url + "/api/ping")
      .then((resp) => resp.data)
      .catch((err) => "Error"),
  pageNotFound: (route) =>
    axios
      .get(url + route)
      .then((resp) => resp.data)
      .catch((err) => "Request failed with status code 404"),
};

module.exports = serverFunctions;
