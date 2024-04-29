// ❤️❤️ ❤️❤️ ❤️❤️
// Maintainer.js
// import React, { useState } from 'react'
// // Import axios for making HTTP requests
// import axios from 'axios'

// const Maintainer = () => {
//   const [answers, setAnswers] = useState({})

//   // Handle user input and send it to the server
//   const handleAnswer = async (question, answer) => {
//     setAnswers({ ...answers, [question]: answer })

//     try {
//       // Make a POST request to the server to generate a response
//       const response = await axios.post('/generate-response', { question, answer })
//       console.log(response.data.response) // Log the response from the server
//     } catch (error) {
//       console.error('Error:', error)
//     }
//   }

//   return null
// }

// export default Maintainer

///////  Test (Fetch)
// Maintainer.js

import React, { useState } from 'react'

const Maintainer = () => {
  const [answers, setAnswers] = useState({})

  const handleAnswer = async (question, answer) => {
    setAnswers({ ...answers, [question]: answer })
    console.log(answers)

    try {
      const response = await fetch('/generate-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question, answer })
      })
      const data = await response.json()
      console.log(data.response)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return null
}

export default Maintainer
