"use client";

import RegisterForm from "@/components/RegisterForm";
import WelcomePage from "@/components/WelcomePage";
import { useState } from "react";

const Register = () => {
  const [step, setStep] = useState(1);
  return (
    <div>{step === 1 ? <WelcomePage nextStep={setStep} /> : <RegisterForm nextStep={setStep} />}</div>
  );
};

export default Register;
