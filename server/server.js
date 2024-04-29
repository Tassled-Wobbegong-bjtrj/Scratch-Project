const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const PORT = 8080;
// const controller = require("./controller");
const { getActivities, getRestaurants } = require("./controller");
const OpenAI = require("openai");
require("dotenv").config();
//declaring variables in global so we have access to them
const locations = {};
const cravings = {};
const types = {};

//import AI here and store the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // API Key is in .env file
});

// parses JSON from incoming request
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/src")));

// jeff test location -> we need to post to the endpoint and then get request to see data
app.post("/location", (req, res) => {
  console.log("location", req.body); // Logs the message to the console
  locations.city = req.body.city;
  // city = req.body.city;
  // console.log(city);
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

app.get("/chat", async (req, res) => {
  let response = await getActivities(
    locations.city,
    types.type,
    cravings.craving
  );
  return res.json({ response: response });
});

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
