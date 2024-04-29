// // ❤️❤️ ❤️❤️ ❤️❤️
// // Activity.js
// import React, { useState, useEffect } from 'react'
// import axios from 'axios'

// const Activity = ({ onAnswer, prevAnswer }) => {
//   const [activity, setActivity] = useState('')

//   useEffect(() => {
//     // Fetch activity suggestions based on previous answer using OpenAI
//     async function fetchActivitySuggestions() {
//       try {
//         const response = await axios.post('/activity-suggestions', { prevAnswer })
//         setActivity(response.data.suggestions)
//       } catch (error) {
//         console.error('Error fetching activity suggestions:', error)
//       }
//     }
//     fetchActivitySuggestions()
//   }, [prevAnswer])

//   const handleNext = () => {
//     onAnswer('activity', activity)
//   }

//   return (
//     <div>
//       <p>How about {activity}?</p>
//       <button className="button" onClick={handleNext}>
//         Next
//       </button>
//     </div>
//   )
// }

// export default Activity

// Test (Fetch)
// Activity.js
import React, { useState, useEffect } from 'react'

const Activity = ({ onAnswer, prevAnswer }) => {
  const [activity, setActivity] = useState('')

  useEffect(() => {
    const fetchActivitySuggestions = async () => {
      try {
        const response = await fetch('/activity-suggestions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prevAnswer })
        })
        const data = await response.json()
        setActivity(data.suggestions)
      } catch (error) {
        console.error('Error fetching activity suggestions:', error)
      }
    }
    fetchActivitySuggestions()
  }, [prevAnswer])

  const handleNext = () => {
    onAnswer('activity', activity)
  }

  return (
    <div>
      <p>How about {activity}?</p>
      <button onClick={handleNext}>Next</button>
    </div>
  )
}

export default Activity
