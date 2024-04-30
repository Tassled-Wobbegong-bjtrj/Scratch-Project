// // ❤️❤️ ❤️❤️ ❤️❤️
// QuestionWindow.js
import React, { useState } from "react";
import Maintainer from "./Maintainer";
import Location from "./Location";
import ActivityType from "./ActivityType";
import Activity from "./Activity";
import DinnerPlans from "./DinnerPlans";
import DateIdeas from "./DateIdeas";

const QuestionWindow = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (question, answer) => {
    setAnswers({ ...answers, [question]: answer });
    setStep(step + 1);
  };

  return (
    <div>
      <Maintainer />
      {step === 1 && <Location onAnswer={handleAnswer} />}
      {step === 2 && <ActivityType onAnswer={handleAnswer} />}
      {step === 4 && (
        <Activity
          onAnswer={handleAnswer}
          previousActivity={answers.activityType}
        />
      )}
      {step === 3 && <DinnerPlans onAnswer={handleAnswer} />}
      {step === 5 && <DateIdeas ideas={answers} />}
    </div>
  );
};

export default QuestionWindow;
