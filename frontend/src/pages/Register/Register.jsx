import React, { useState } from "react";
import StepName from "../Steps/StepName/StepName";
import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail";
import StepAvatar from "../Steps/StepAvatar/StepAvatar";
import StepUsername from "../Steps/StepUsername/StepUsername";
import StepOtp from "../Steps/StepOtp/StepOtp";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
  3: StepName,
  4: StepAvatar,
  5: StepUsername,
};

const Register = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];
  function onNext() {
    setStep(step + 1);
  }

  return (
    <div>
      <h1>I am register</h1>
      <Step onNext={onNext} />
    </div>
  );
};

export default Register;
