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
  const [types, setType] = useState("");
  const [response, setResponse] = useState("");
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
      .then((data) => setCravings(data.craving))
      .then((data) => console.log("dateideas", data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/type")
      .then((res) => res.json())
      //the .city has to be in line, we cant use .message
      // i think its b/c data is traveling as {"city: sf"}
      .then((data) => setType(data.type))
      .then((data) => console.log("type", data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/chat")
      .then((res) => res.json())
      //the .city has to be in line, we cant use .message
      // i think its b/c data is traveling as {"city: sf"}
      .then((data) => setResponse(data))
      .then((data) => console.log("dateideas", data));
  }, []);

  return (
    <div id="final-suggestion-wrapper">
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
        <p
          id="final-suggestion"
          style={({ fontSize: "18px" }, { textAlign: "center" })}
        >
          {/* <div className="card-container">
            <h2>Date Night Plan</h2>
            <div className="activity">
              <h3>{response.IndoorActivity.location}</h3>
              <p>{response.IndoorActivity.address}</p>
              <p>{response.IndoorActivity.details}</p>
              <a
                href={response.IndoorActivity.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
              </a>
            </div>
            <div className="dining">
              <h3>{response.Dining.location}</h3>
              <p>{response.Dining.address}</p>
              <p>{response.Dining.details}</p>
              <a
                href={response.Dining.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
              </a>
            </div>
          </div> */}
          {response.response}
          {/* {message} {cravings} {types} */}
        </p>
      )}
    </div>
  );
};

export default DateIdeas;
