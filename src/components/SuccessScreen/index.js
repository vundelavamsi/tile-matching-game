import React from 'react';

const SuccessScreen = ({ score, timeTaken }) => {
  return (
    <div className="success-screen">
      <h2>Congratulations!</h2>
      <p>Your Score: {score}</p>
      <p>Time Taken: {timeTaken} seconds</p>
    </div>
  );
};

export default SuccessScreen;
