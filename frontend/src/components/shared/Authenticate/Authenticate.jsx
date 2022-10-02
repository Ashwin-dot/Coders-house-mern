import React, { useState } from "react";
import StepOtp from "../../../pages/Steps/StepOtp/StepOtp";
import StepPhoneEmail from "../../../pages/Steps/StepPhoneEmail/StepPhoneEmail";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
};

const Authenticate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];
  function onNext() {
    setStep(step + 1);
  }

  return (
    <div>
      <h1>Login</h1>
      <Step onNext={onNext} />
    </div>
  );
};

export default Authenticate;
