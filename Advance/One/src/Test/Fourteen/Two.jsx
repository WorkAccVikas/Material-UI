import { useState } from "react";
import OTPInput from "./OTPInput";
import Button from "@mui/material/Button";

const Two = () => {
  const [otp, setOtp] = useState(""); // State to store the complete OTP

  const handleOTPComplete = (enteredOTP) => {
    setOtp(enteredOTP); // Update the OTP state
  };

  const handleVerifyOTP = () => {
    console.log("Verifying OTP:", otp);
    // Add your OTP verification logic here (e.g., API call)
    alert(`OTP Verified: ${otp}`);
  };

  const isOTPComplete = otp.length === 6;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <OTPInput numFields={6} onComplete={handleOTPComplete} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleVerifyOTP}
        disabled={!isOTPComplete} // Disable the button until OTP is complete
        style={{ marginTop: "20px" }}
      >
        Verify OTP
      </Button>
    </div>
  );
};

export default Two;
