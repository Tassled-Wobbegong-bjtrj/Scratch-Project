// ❤️❤️ ❤️❤️ ❤️❤️
import React, { useState } from "react";

// const ActivityType = ({ onAnswer }) => {
//   const [type, setType] = useState("");

//   const handleNext = () => {
//     onAnswer("activityType", type);
//   };

//   return (
//     <div>
//       <p>The city of Angels!</p>
//       <p>Are we looking for something indoors or outdoors?</p>
//       <select
//         className="activity-type-select"
//         onChange={(e) => setType(e.target.value)}
//       >
//         <option value="indoor">Indoor</option>
//         <option value="outdoor">Outdoor</option>
//       </select>
//       <button onClick={handleNext}>Next</button>
//     </div>
//   );
// };

// our component to check indoor or ourdoor.
const ActivityType = ({ onAnswer }) => {
  const [type, setType] = useState("");

  const handleNext = () => {
    onAnswer("type", type); // goes to next component
    // we make a post request here because we want to use the data on the backend to put into our openAI prompt
    fetch("http://localhost:8080/type", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type }), // Convert the React state to JSON and send it as the POST body
      // i wonder if it matters if its city or location....
      // this definitely matters what you label the body as.
      // so we are sending over this json.stringified city
      // ** short hand for { city: city }
      // stringify is turning this into '{city: city}' b/c http requests is
      // remember hyperTEXT transfer protocol
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        // Handle the successful response here
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here
      });
  };
  return (
    <div>
      {/* this first p tag was the goal of being able to talk back and forth with gpt to get the final response */}
      {/* <p>The city of Angels!</p> */}
      <p>Are we looking for something indoors or outdoors?</p>
      <form>
        <input
          className="location-input"
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <button onClick={handleNext}>Next</button>
      </form>
    </div>
  );
};

export default ActivityType;
