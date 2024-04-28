// ❤️❤️ ❤️❤️ ❤️❤️
import React, { useState } from 'react'

const ActivityType = ({ onAnswer }) => {
  const [type, setType] = useState('')

  const handleNext = () => {
    onAnswer('activityType', type)
  }

  return (
    <div>
      <p>Nice, were you looking for an indoor or outdoor activity?</p>
      <select className="activity-type-select" onChange={(e) => setType(e.target.value)}>
        <option value="indoor">Indoor</option>
        <option value="outdoor">Outdoor</option>
      </select>
      <button onClick={handleNext}>Next</button>
    </div>
  )
}

export default ActivityType
