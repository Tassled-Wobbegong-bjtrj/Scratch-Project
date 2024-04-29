// ❤️❤️ ❤️❤️ ❤️❤️
import React, { useState } from 'react'

const Location = ({ onAnswer }) => {
  const [city, setCity] = useState('')

  const handleNext = () => {
    onAnswer('location', city)
  }

  return (
    <div>
      <p>What city did you two want to spend the evening in?</p>
      <input className="location-input" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      <button className="button" onClick={handleNext}>
        Next
      </button>
    </div>
  )
}

export default Location
