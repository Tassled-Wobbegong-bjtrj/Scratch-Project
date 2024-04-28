// ❤️❤️ ❤️❤️ ❤️❤️
// import React, { useState } from 'react'

// const Activity = ({ onAnswer }) => {
//   const [activity, setActivity] = useState('')

//   const handleNext = () => {
//     onAnswer('activity', activity)
//   }

//   return (
//     <div>
//       <p>How about ____ or ____?</p>
//       <input className="activity-input" type="text" value={activity} onChange={(e) => setActivity(e.target.value)} />
//       <button onClick={handleNext}>Next</button>
//     </div>
//   )
// }

// export default Activity

// Activity.js
// Activity.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Activity = ({ onAnswer, prevAnswer }) => {
  const [activity, setActivity] = useState('')

  useEffect(() => {
    // Fetch activity suggestions based on previous answer using OpenAI
    async function fetchActivitySuggestions() {
      try {
        const response = await axios.post('/activity-suggestions', { prevAnswer })
        setActivity(response.data.suggestions)
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
