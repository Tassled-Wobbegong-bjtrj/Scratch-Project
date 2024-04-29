const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const PORT = 8080;
const controller = require("./controller");
const { getActivities, getRestaurants } = require("./controller");
const OpenAI = require("openai");
require("dotenv").config();
const locations = {};
const cravings = {};
const types = {};
const responses = {};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // API Key is in .env file
});

// parses JSON from incoming request
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/src")));

//just store answers to prompts here. in global scope
let location;
let indoorOutdoor;
let activityChosen;
let restaurantChoice;

let city;
let type;
let food;

//jeff test connection

//to get the front end to show on srver side
app.get("/", (req, res) => {
  res.sendFile(path.resolve("../client/public/index.html"));
});

//jeff test connection
app.get("/message", (req, res) => {
  res.json({ message: "hello from server!" });
});

// jeff test location -> we need to post to the endpoint and then get request to see data
app.post("/location", (req, res) => {
  console.log("location", req.body); // Logs the message to the console
  locations.city = req.body.city;
  city = req.body.city;
  res
    .status(201)
    .json({ success: true, msg: "Message received", data: req.body });
});

app.get("/location", (req, res) => {
  res.status(200).json(locations); // Send all messages as JSON
});

// type
app.post("/type", (req, res) => {
  console.log("type", req.body); // Logs the message to the console
  types.type = req.body.type;

  res
    .status(201)
    .json({ success: true, msg: "Message received", data: req.body });
});

app.get("/type", (req, res) => {
  res.status(200).json(types); // Send all messages as JSON
});

// cravings
app.post("/craving", (req, res) => {
  console.log("dinner", req.body); // Logs the message to the console
  cravings.craving = req.body.craving;
  console.log(cravings.craving);
  res
    .status(201)
    .json({ success: true, msg: "Message received", data: req.body });
});

app.get("/craving", (req, res) => {
  res.status(200).json(cravings); // Send all messages as JSON
});

// mock gpt prompt/response
app.post("/chat", (req, res) => {
  if (!city) {
    return res.status(400).json({
      error:
        "City is not defined. Please make sure to submit the location first.",
    });
  }
  responses = {
    response: `Hey chatGPT, could you give us a good evening date idea with an indoor activity and a high end sushi spot in ${city}?`,
  };

  console.log(responses);
  res.json(responses);
});

app.get("/chat", (req, res) => {
  // open api
  // send the output
  city = req.body.city;
  async function getActivities(city) {
    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Hey chatGPT, could you give us a good evening date idea with an indoor activity and a high end sushi spot in ${city}?`,
          },
        ],
        model: "gpt-3.5-turbo",
      });
      const response = chatCompletion.choices[0].message; // // if we didnt have contentstring message: "String"
      // {message: "string"}
      console.log(response, chatCompletion);
      return res.json(response);
    } catch (error) {
      console.error("Error:", error);
      return "Sorry, I couldn't get an answer.";
    }
  }
  getActivities(city);
  // res.json({
  //   response: `Hey chatGPT, could you give us a good evening date idea with an ${type} activity and a high end sushi spot in ${city}?`,
  // });
  // res.json(responses);
});

// handle location from client
app.post("/", (req, res) => {
  location = req.body.location;
  res.json({ prompt: "Do you prefer to do an indoor or outdoor activity?" });
});

// send first prompt (location & indoor/outdoor )to API;
app.post("/indoorOutdoor", async (req, res) => {
  indoorOutdoor = req.body.indoorOutdoor;
  try {
    // Call controller function to interact with OpenAI API
    const activities = await getActivities(location, indoorOutdoor);

    // Send response back to client - this still needs to be formatted
    // send two activities options back to user
    res.json({ activities });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// send second prompt (food type) to API;
app.post("/foodType", (req, res) => {
  res.json({ prompt: "What are you craving for?" });
});

// send two restaurants (casual or fancy) back to user
// app.post("/craving", async (req, res) => {
//   const craving = req.body.craving;
//   try {
//     // Call controller function to get restaurant options based on the craving
//     const restaurants = await getRestaurants(craving);
//     // Send response back to client
//     res.json({ restaurants });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// Global error handling middleware
app.use("*", (req, res) => {
  return res.status(404);
});
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

//test on Rick branch
