import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
return (
    <nav className="navbar">
        <div className="navbar-container">
            <Link to="/" className="navbar-logo">
                REACT CONNECT
            </Link>
            <div className="menu-links">
                <Link to="/" className="navbar-item">
                    Home
                </Link>
                <Link to="/products" className="navbar-item">
                    Products
                </Link>
                <Link to="/stay-tuned" className="navbar-item">
                    Stay Tuned
                </Link>
                <Link to="/about-us" className="navbar-item">
                    About Us
                </Link>
                <Link to="/contact-us" className="navbar-item">
                    Contact Us
                </Link>
            </div>
        </div>
    </nav>
);
};

export default NavBar;