// ❤️❤️ ❤️❤️ ❤️❤️
import React, { useState } from "react";

const ActivityType = ({ onAnswer }) => {
  const [type, setType] = useState("");

  const handleNext = () => {
    onAnswer("activityType", type);
  };

  return (
    <div>
      <p>The city of Angels!</p>
      <p>Are we looking for something indoors or outdoors?</p>
      <select
        className="activity-type-select"
        onChange={(e) => setType(e.target.value)}
      >
        <option value="indoor">Indoor</option>
        <option value="outdoor">Outdoor</option>
      </select>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default ActivityType;
