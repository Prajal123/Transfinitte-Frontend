import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

import './main-style.css';

const LoginComponent = () => {
  const [showOTPField, setShowOTPField] = useState(false);

  const handleSendOTP = () => {
    setShowOTPField(true);
  };

  return (
    <div className="container">
      <div className="left-container">Welcome to the GPS Finder App</div>
      <div className="right-container">
        <div className="login-container">
          <Typography>Please fill the following credentials</Typography>
          <TextField label="Phone Number" variant="standard" type="number" />
          {showOTPField ? (
            <div className="otp-container">
              <TextField label="OTP" variant="standard" type="text" />
              <Button className="submit-button" variant="contained">
                Submit
              </Button>
            </div>
          ) : (
            <div className="otp-button-container">
              <Button className="otp-button" variant="contained" onClick={handleSendOTP}>
                Send OTP
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
