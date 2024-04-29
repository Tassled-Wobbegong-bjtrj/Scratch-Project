const express = require('express')
const path = require('path')
const app = express()
const PORT = 8080
const controller = require('./controller')
const { getActivities, getRestaurants } = require('./controller')

// parses JSON from incoming request
app.use(express.json())
app.use(express.static(path.join(__dirname, './client/src')))

//just store answers to prompts here. in global scope
let location
let indoorOutdoor
let activityChosen
let restaurantChoice

//example just for workflow purpose. we can delete/update later

// app.get('/', (req, res) => {
//   res.json({ prompt: 'What location do you want to spend the evening in?' });
//   //res.status(200).send(res.local.options)
// });



// handle location and indoor/outdoor from client
app.post('/generate-response', getActivities,(req, res) => {
  //location = req.body.location;
  // res.status(200).send(response);
  
});


// send first prompt (location & indoor/outdoor )to API;
app.post('/indoorOutdoor', async (req, res) => {
  indoorOutdoor = req.body.indoorOutdoor
  try {
    // Call controller function to interact with OpenAI API
    const activities = await getActivities(location, indoorOutdoor)

    // Send response back to client - this still needs to be formatted
    // send two activities options back to user
    res.json({ activities })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// send second prompt (food type) to API;
app.post('/foodType', (req, res) => {
  res.json({ prompt: 'What are you craving for?' })
})

// send two restaurants (casual or fancy) back to user
app.post('/craving', async (req, res) => {
  const craving = req.body.craving
  try {
    // Call controller function to get restaurant options based on the craving
    const restaurants = await getRestaurants(craving)
    // Send response back to client
    res.json({ restaurants })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Global error handling middleware
app.use('*', (req, res) => {
  return res.status(404)
})
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' }
  }
  const errorObj = Object.assign({}, defaultErr, err)
  console.log(errorObj.log)
  return res.status(errorObj.status).json(errorObj.message)
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`)
})

//test on Rick branch
