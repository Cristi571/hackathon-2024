import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import '../styles/AuthenticationPage.css';

const AuthenticationPage = () => {
  const handleCredentialsAuth = () => {
    console.log('Credentials authentication selected');
    // Handle credentials authentication logic
  };

  const handleScanAuth = () => {
    console.log('Scan your card authentication selected');
    // Handle scan card authentication logic
  };

  return (
    <div className="authpage-container">
      <h1>Stay calm and connect with OctiCode</h1>
      <div className="auth-options">
        <Button variant="contained" color="primary" onClick={handleCredentialsAuth}>
          Type Credentials
        </Button>
        
        <Button variant="contained" color="secondary" onClick={handleScanAuth}>
          Scan Your Card
        </Button>
      </div>

      <div className="auth-links">
        <Link to="/declare-problem">Declare a Problem</Link>
        <Link to="/recover-account">Recover Your Account</Link>
      </div>
    </div>
  );
};

export default AuthenticationPage;