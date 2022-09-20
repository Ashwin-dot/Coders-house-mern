import React from "react";

const StepOpt = ({ onNext }) => {
  return (
    <div>
      <h1>Step Opt</h1>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default StepOpt;
