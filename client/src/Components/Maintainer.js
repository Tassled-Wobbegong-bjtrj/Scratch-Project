// ❤️❤️ ❤️❤️ ❤️❤️

// import React, { useState } from 'react'

// const Maintainer = () => {
//   const [answers, setAnswers] = useState({})

//   // Manage the state of user input and answers
//   const handleAnswer = (question, answer) => {
//     setAnswers({ ...answers, [question]: answer })
//     // Handle interaction with the server
//   }

//   return null
// }

// export default Maintainer
// Maintainer.js
import React, { useState } from 'react'
// Import axios for making HTTP requests
import axios from 'axios'

const Maintainer = () => {
  const [answers, setAnswers] = useState({})

  // Handle user input and send it to the server
  const handleAnswer = async (question, answer) => {
    setAnswers({ ...answers, [question]: answer })

    try {
      // Make a POST request to the server to generate a response
      const response = await axios.post('/generate-response', { question, answer })
      console.log(response.data.response) // Log the response from the server
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return null
}

export default Maintainer
