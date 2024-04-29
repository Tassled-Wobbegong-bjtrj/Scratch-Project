// ❤️❤️ ❤️❤️ ❤️❤️
import React, { useState } from 'react'

const DinnerPlans = ({ onAnswer }) => {
  const [craving, setCraving] = useState('')

  const handleNext = () => {
    onAnswer('dinnerPlans', craving)
  }

  return (
    <div>
      <p>Cool, what about dinner plans, is there anything you're craving?</p>
      <input className="dinner-input" type="text" value={craving} onChange={(e) => setCraving(e.target.value)} />
      <button className="button" onClick={handleNext}>
        Next
      </button>
    </div>
  )
}

export default DinnerPlans
