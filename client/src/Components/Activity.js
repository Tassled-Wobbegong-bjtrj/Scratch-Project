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
import React, { useState, useEffect } from "react";
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
//       <button onClick={handleNext}>Next</button>
//     </div>
//   )
// }

const Activity = ({ onAnswer }) => {
  const [act, setAct] = useState("");

  const handleNext = () => {
    onAnswer("activity", act); // goes to next component
    fetch("http://localhost:8080/act", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ act }), // Convert the React state to JSON and send it as the POST body
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
  // const dragon = {
  //   IndoorActivity: {
  //     location: "Urban Putt",
  //     address: "1096 South Van Ness Avenue, San Francisco, CA 94110",
  //     details:
  //       "Urban Putt offers a unique indoor mini-golf experience set within a creatively designed space that's perfect for a fun and interactive date. After enjoying the whimsical courses, you can relax at the bar with a drink.",
  //     website: "https://www.urbanputt.com",
  //   },
  //   Dining: {
  //     location: "Tacolicious",
  //     address: "741 Valencia St, San Francisco, CA 94110",
  //     details:
  //       "Just a short drive from Urban Putt, Tacolicious serves up some of the city's finest tacos in a vibrant and stylish setting. Their menu features locally sourced ingredients and innovative taco creations, alongside a great selection of cocktails.",
  //     website: "http://tacolicious.com",
  //   },
  // };

  return (
    <div>
      <p>Mmmm... Yum you want something casual or a little more high-end</p>
      {/* <div className="card-container">
      <h2>Date Night Plan</h2>
      <div className="activity">
        <h3>{dragon.IndoorActivity.location}</h3>
        <p>{dragon.IndoorActivity.address}</p>
        <p>{dragon.IndoorActivity.details}</p>
        <a href={dragon.IndoorActivity.website} target="_blank" rel="noopener noreferrer">Visit Website</a>
      </div>
      <div className="dining">
        <h3>{dragon.Dining.location}</h3>
        <p>{dragon.Dining.address}</p>
        <p>{dragon.Dining.details}</p>
        <a href={dragon.Dining.website} target="_blank" rel="noopener noreferrer">Visit Website</a>
      </div>
    </div> */}
      <form>
        <input
          className="location-input"
          type="text"
          value={act}
          onChange={(e) => setAct(e.target.value)}
        />
        <button onClick={handleNext}>Next</button>
      </form>
    </div>
  );
};

export default Activity;
