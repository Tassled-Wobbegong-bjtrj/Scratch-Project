// ❤️❤️ ❤️❤️ ❤️❤️
import React, { useState } from "react";

const DinnerPlans = ({ onAnswer }) => {
  const [craving, setCraving] = useState("");

  const handleNext = () => {
    onAnswer("dinnerPlans", craving);
    fetch("http://localhost:8080/craving", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ craving }),
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
      <p>Cool, nothing like a romantic evening inside</p>
      <p>What about dinner plans, is there anything you're craving?</p>
      <form>
        <input
          className="dinner-input"
          type="text"
          value={craving}
          onChange={(e) => setCraving(e.target.value)}
        />
        <button onClick={handleNext}>Next</button>
      </form>
    </div>
  );
};

export default DinnerPlans;
