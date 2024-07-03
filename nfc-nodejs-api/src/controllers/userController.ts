import { Request, Response } from 'express';
import User from '../models/userModel';
import { v4 as uuidv4 } from 'uuid';
import { generateToken } from '../utils/jwtUtils';


// Get all users from MongoDB
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Use Mongoose to find all users
    const users = await User.find();

    // Return the array of users as JSON response
    res.json(users);
  } catch (error) {
    // Handle server errors if something goes wrong with database query
    res.status(500).json({ message: 'Server Error' });
  }
};


// Create a new user
export const createUser = async (req: Request, res: Response) => {
  const { firstname, lastname, email, role } = req.body;
  
  if (!firstname || !lastname || !email || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Generate a unique ID for the user
    const userId = uuidv4();

    // Create the payload for the JWT token
    const payload = {
      sub: userId,
      name: `${firstname} ${lastname}`,
      email,
      role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365) // 1 year expiration
    };
    
    // Generate the JWT token
    const token = generateToken(payload);

    // Create a new user instance
    const user = new User({ 
      token,
      id: userId,
      firstname,
      lastname,
      email,
      role
    });
    
    await user.save();

    // Return the new user data with the token
    res.status(201).json({ 
      message: 'User created successfully', 
      token, 
      user: { id: userId, firstname, lastname, email, role } 
    });

  } catch (error: any) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
