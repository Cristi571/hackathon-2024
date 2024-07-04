import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import '../styles/AuthenticationPage.css';

const AuthenticationPage = () => {
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate(); // For navigation

  const handleScanAuth = () => {
    if (loading) return; // Prevent starting a new scan if already scanning

    setScanResult(null); // Reset scan status and animations
    setLoading(true); // Start loading animation

    setTimeout(() => {
      const scanSuccess = Math.random() < 0.5; // Simulate scan success randomly
      setScanResult(scanSuccess ? 'success' : 'failure');
      setLoading(false); // Stop loading animation

      if (scanSuccess) {
        // Perform connection and redirect to dashboard after 2 seconds
        setTimeout(() => {
          performConnection();
          navigate('/dashboard'); // Redirect to the dashboard page
        }, 2000);
      }
    }, Math.floor(Math.random() * (8000 - 2000) + 2000)); // Random delay between 2 to 8 seconds
  };

  const performConnection = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Default user data
    const defaultUserData = {
      "_id": "66859b623caf5da3f890d320",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI1MjgxYzg2LThlZGUtNDNmMC05MWZiLTJlYzljYjFiMjBlMSIsInRva2VuIjoiIiwiZmlyc3RuYW1lIjoiSm9obiIsImxhc3RuYW1lIjoiRG9lIiwiZW1haWwiOiJqb2huLmRvZUBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjAwMzIwOTgsImV4cCI6MTc1MTU2ODA5OH0.x69VgjmQYpsyUd2Hb7AyydY3QZgFlN1bUUHG_y3UKyk",
      "id": "b5281c86-8ede-43f0-91fb-2ec9cb1b20e1",
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@admin.com",
      "role": "admin",
      "createdAt": "2024-07-03T18:41:38.346Z",
      "updatedAt": "2024-07-03T18:41:38.346Z",
      "__v": 0
    };

    // Store default user data in local storage
    localStorage.setItem('token', defaultUserData.token);
    localStorage.setItem('user', JSON.stringify(defaultUserData));
  };

  return (
    <div className="authpage-container">
      <h1>Stay calm and connect with OctiCode</h1>
      <div className="auth-options">
        <Button 
          variant="contained" 
          color="primary" 
          component={Link} 
          to="/login"
        >
          Type Credentials
        </Button>

        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleScanAuth} 
          disabled={scanResult === 'success'} // Disable button on success
        >
          Scan Your Card
        </Button>
      </div>

      <div className="auth-links">
        <Link to="/declare-problem">Declare a Problem</Link>
        <Link to="/recover-account">Recover Your Account</Link>
      </div>

      {loading && (
        <div className="scan-loading">
          <CircularProgress />
          <p>Scanning...</p>
        </div>
      )}

      {scanResult && (
        <div className={`scan-result-message ${scanResult}`}>
          {scanResult === 'success' ? (
            <div className="success-animation">
              <CheckCircleOutlineIcon style={{ fontSize: 80, color: '#4CAF50' }} />
              <p>Scan successful!</p>
            </div>
          ) : (
            <div className="failure-animation">
              <HighlightOffIcon style={{ fontSize: 80, color: '#F44336' }} />
              <p>Scan failed. Please try again.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthenticationPage;
