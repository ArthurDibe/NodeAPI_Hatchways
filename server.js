////////////////////////////////////////////////////////////
//
//   File: server.js
//   Developer: Arthur Dibe
//
//   HOW TO START:
//     1) npm install
//     2) npm start
//
//   OBS: Once you run the server, it will generate a file 
//        called "output.txt" where you can check some outputs 
//        examples when callling the routes
//
////////////////////////////////////////////////////////////

const express = require("express");
const fetch = require("node-fetch");
const generateOutputs = require("./saveOutputs.js");
const helper = require('./helperFunctions.js')
const chalk = require('chalk');
const { response } = require("express");
const yellow = chalk.bold.yellow
const magenta = chalk.magenta
const green = chalk.bold.green
const app = express();
// to parse the incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const HTTP_PORT = process.env.PORT || 3000;

app.listen(HTTP_PORT, () => {
  console.log(`[${yellow(`SERVER ${green('ON')}`)}]: ${magenta(HTTP_PORT)}`);
  console.log("--------------------------------------------");
});

// Generate outputs
generateOutputs()

// ROUTE 1
app.get("/api/ping", (req, res) => {
  res.status(200).json({ success: true });
});

// ROUTE 2
app.get("/api/posts", async (req, res) => {
  const tags = req.query.tags;
  const sortBy = req.query.sortBy || "id";
  const direction = req.query.direction || "asc";
  const sortOptions = ["id", "reads", "likes", "popularity"];
  const directOptions = ["asc", "desc"];
  let codeStatus = 400;
  let respObj;
  let responseAPI;

  if (!tags) {
    respObj = { error: "Tags parameter is required" };
  } else if (!sortOptions.find((option) => option == sortBy)) {
    respObj = { error: "sortBy parameter is invalid" };
  } else if (!directOptions.find((option) => option == direction)) {
    respObj = { error: "direction parameter is invalid" };
  } else {
    let responses = [];
    const tagList = tags.split(",");
    // ------------- Fetch the posts from API - synchronize by using Promise.all and .map
    await Promise.all(
      tagList.map(async (tag) => {
        const url = `https://api.hatchways.io/assessment/blog/posts?tag=${tag}`;
        const options = {
          method: "GET",
        };

        responseAPI = await fetch(url, options).then((resp1) => resp1.json());

        responses.push(...responseAPI.posts);
      })
    );

    // ------------- Sort the Elements
    responses = helper.sortElements(responses, sortOptions, sortBy, direction)

    // ------------- Remove Repeated Objects
    const uniqueResponse = helper.removeRepeatedElements(responses)

    codeStatus = 200;
    respObj = { posts: uniqueResponse };
  }

  res.status(codeStatus).json(respObj);
});

// ROUTE 404 - route not found
app.use((req, res) => {
  res.status(404).json({ error: "Request failed with status code 404" });
});
