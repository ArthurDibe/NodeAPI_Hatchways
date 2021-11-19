////////////////////////////////////////////////////////////
//
//   File: server.js
//   Developer: Arthur Dibe
//
//   HOW TO START:
//     1) npm install
//     2) npm start
//
//   OBS: After starting the server, tests results outputs
//        are saved in a file called "testResults.txt"
//
////////////////////////////////////////////////////////////

const express = require("express");
const fetch = require("node-fetch");
const generateOutputs = require("./saveOutputs.js");
const chalk = require('chalk')
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
  console.log("[SERVER CALLED]: /api/ping");
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

    console.log(`[SERVER CALLED]: /api/posts?tags=${tags}&sortBy=${sortBy}&direction=${direction}`);
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

    // ------------- Sort the Elements according sort by
    switch (sortOptions.findIndex((option) => option == sortBy)) {
      case 0:
        if (direction == "asc")
          responses.sort((postA, postB) => postA.id - postB.id);
        else responses.sort((postA, postB) => postB.id - postA.id);

        break;
      case 1:
        if (direction == "asc")
          responses.sort((postA, postB) => postA.reads - postB.reads);
        else responses.sort((postA, postB) => postB.reads - postA.reads);

        break;
      case 2:
        if (direction == "asc")
          responses.sort((postA, postB) => postA.likes - postB.likes);
        else responses.sort((postA, postB) => postB.likes - postA.likes);

        break;
      case 3:
        if (direction == "asc")
          responses.sort((postA, postB) => postA.popularity - postB.popularity);
        else
          responses.sort((postA, postB) => postB.popularity - postA.popularity);

        break;
    }

    // ------------- Remove Repeated Objects
    const uniqueResponse = responses.reduce((first, second) => {
      if (!first.some((obj) => obj.id === second.id)) {
        first.push(second);
      }
      return first;
    }, []);

    codeStatus = 200;
    respObj = { posts: uniqueResponse };
  }

  res.status(codeStatus).json(respObj);
});

// ROUTE 404 - route not found
app.use((req, res) => {
  console.log('[SERVER CALLED]: 404')
  res.status(404).json({ error: "Request failed with status code 404" });
});
