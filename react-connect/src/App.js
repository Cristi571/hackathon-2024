import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import HomePage from './views/HomePage';
import AuthenticationPage from './views/AuthenticationPage';
import LoginPage from './views/LoginPage';
import DashboardPage from './views/DashboardPage';
import ProductsPage from './views/ProductsPage';
import StayTunedPage from './views/StayTunedPage';
import AboutUsPage from './views/AboutUsPage';
import ContactUsPage from './views/ContactUsPage';
import DeclareProblemPage from './views/DeclareProblemPage';



const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/authenticate" element={<AuthenticationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/stay-tuned" element={<StayTunedPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/declare-problem" element={<DeclareProblemPage />} />
      </Routes>
    </Router>
  );
};

export default App;