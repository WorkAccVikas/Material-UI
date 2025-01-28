import React from "react";
import OTPInput from "./OTPInput";

const One = () => {
  const handleOTPComplete = (otp) => {
    console.log("OTP Entered:", otp);
    // You can perform further actions like validation or API calls here
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <OTPInput numFields={6} onComplete={handleOTPComplete} />
    </div>
  );
};

export default One;
