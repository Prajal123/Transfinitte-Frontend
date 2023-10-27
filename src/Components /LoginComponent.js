import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Snackbar, SnackbarContent, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './main-style.css';

const LoginComponent = () => {
  const [showOTPField, setShowOTPField] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success');

  const navigate = useNavigate();

  const openSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarOpen(true);
  };

  const handleSendOTP = async () => {
    if (!phoneNumber) {
      openSnackbar('Please enter a valid mobile number.', 'error');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/users/login', { mobileNumber: phoneNumber });
      setShowOTPField(true);
      openSnackbar('OTP sent successfully', 'success');
    } catch (error) {
      console.error(error);
      openSnackbar('Failed to send OTP. Please try again.', 'error');
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      openSnackbar('Please enter the OTP.', 'error');
      return;
    }
  
    try {
      // Send a POST request to verify the OTP
      const response = await axios.post('http://localhost:3000/api/users/verifyPhOTP', {
        mobileNumber: phoneNumber,
        otp: otp,
      });
  
      if (response.status === 200) {
        // Redirect the user to the "/home" route upon successful login
        navigate('/home');
  
        // Display a success message
        openSnackbar('Logged in Successfully!', 'success');
      } else {
        // Handle the case where the OTP verification failed (e.g., invalid OTP)
        openSnackbar('Invalid OTP. Please try again.', 'error');
      }
    } catch (error) {
      console.error(error);
      openSnackbar('An error occurred while verifying OTP. Please try again.', 'error');
    }
  };
  

  useEffect(() => {
    // Use this effect to navigate the user to "/home" if needed.
    // Example:
    // navigate('/home');
  }, [navigate]);

  return (
    <div className="container">
      <div className="left-container">Welcome to the GPS Finder App</div>
      <div className="right-container">
        <div className="login-container">
          <Typography>Please fill the following credentials</Typography>
          <TextField
            label="Phone Number"
            variant="standard"
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          {showOTPField ? (
            <div className="otp-container">
              <TextField
                label="OTP"
                variant="standard"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <Button
                className="submit-button"
                variant="contained"
                onClick={handleVerifyOTP}
              >
                Submit
              </Button>
            </div>
          ) : (
            <div className="otp-button-container">
              <Button
                className="otp-button"
                variant="contained"
                onClick={handleSendOTP}
              >
                Send OTP
              </Button>
            </div>
          )}
        </div>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <SnackbarContent
          message={snackbarMessage}
          action={
            <IconButton size="small" color="inherit" onClick={() => setSnackbarOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          sx={{
            backgroundColor: snackbarType === 'success' ? 'green' : 'red',
          }}
        />
      </Snackbar>
    </div>
  );
};
export default LoginComponent;
