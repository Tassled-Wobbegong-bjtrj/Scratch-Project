const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;
const controller = require('./controller');

// parses JSON from incoming request
app.use(express.json());
app.use(express.static(path.join(__dirname, './client/src')));

// send first prompt (location & indoor/outdoor )to API;

// send two activities options back to user

// send second prompt (food type) to API;

// send two restaurants (casual or fancy) back to user

// Global error handling middleware
app.use('*', (req, res) => {
  return res.status(404);
});
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
