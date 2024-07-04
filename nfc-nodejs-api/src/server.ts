import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import app from './app';
import connectDB from './config/db';

dotenv.config();

const PORT = process.env.PORT || 5001;

// Connect to the database
connectDB();

const server = express();

// Middleware to parse JSON bodies
server.use(express.json());

// CORS configuration
server.use(cors()); // Allow all origins - you can configure specific origins if needed

// Use the app as a middleware
server.use(app);

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
