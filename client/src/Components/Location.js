import React, { useState } from "react";

const Location = ({ onAnswer }) => {
  const [city, setCity] = useState("");

  const handleNext = () => {
    onAnswer("location", city); // goes to next component
    fetch("http://localhost:8080/location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city }), // Convert the React state to JSON and send it as the POST body
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
      <p>So... what city are we meeting up at?</p>
      <form>
        <input
          className="location-input"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleNext}>Next</button>
      </form>
    </div>
  );
};

export default Location;
