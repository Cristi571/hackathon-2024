import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../styles/HomePage.css';

const HomePage = () => {    
    return (
    <div className="homepage-container">
        <h1>Welcome to OctiCode</h1>
        <p>Your trusted ally for tailored digital security and excellence in software engineering.</p>
        <Button variant="contained" color="primary" component={Link} to="/authenticate">
            Let's Start
        </Button>
    </div>
    );
};
    
export default HomePage;