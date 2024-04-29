// ❤️❤️ ❤️❤️ ❤️❤️
// import React from 'react'

// const DateIdeas = ({ ideas }) => {
//   return (
//     <div>
//       <p>
//         If you wanted something more casual we can try {ideas.casual} in {ideas.casualAddress} or for something more elevated we can try {ideas.elevated} in {ideas.elevatedAddress}?
//       </p>
//     </div>
//   )
// }

// export default DateIdeas

// DateIdeas.js

// DateIdeas.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const DateIdeas = ({ ideas }) => {
  const [dateSuggestions, setDateSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [message, setMessage] = useState(""); // jeff
  const [cravings, setCravings] = useState(""); // jeff

  // Function to fetch date suggestions from the server based on user answers
  const fetchDateSuggestions = async () => {
    try {
      const response = await axios.post("/date-suggestions", {
        answers: ideas,
      });
      setDateSuggestions(response.data.suggestions);
      setShowSuggestions(true); // Set to true to display suggestions
    } catch (error) {
      console.error("Error fetching date suggestions:", error);
    }
  };

  // Fetch date suggestions when component mounts
  // useEffect(() => {
  //   fetchDateSuggestions();
  // }, [ideas]);

  //Jeff
  useEffect(() => {
    fetch("http://localhost:8080/location")
      .then((res) => res.json())
      //the .city has to be in line, we cant use .message
      // i think its b/c data is traveling as {"city: sf"}
      .then((data) => setMessage(data.city))
      .then((data) => console.log("dateideas", data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/craving")
      .then((res) => res.json())
      //the .city has to be in line, we cant use .message
      // i think its b/c data is traveling as {"city: sf"}
      .then((data) => setCravings(data.cravings))
      .then((data) => console.log("dateideas", data));
  }, []);

  return (
    <div>
      {showSuggestions ? (
        <div>
          <h2>Date Ideas</h2>
          <p>Here are some date ideas based on your preferences:</p>
          <ul>
            {dateSuggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
          <p>Are you satisfied with these suggestions?</p>
          {/* Add buttons for user response */}
          <button onClick={() => setShowSuggestions(false)}>No</button>
          <button onClick={() => setShowSuggestions(true)}>Yes</button>
        </div>
      ) : (
        <p> {message} </p>
      )}
    </div>
  );
};

export default DateIdeas;
