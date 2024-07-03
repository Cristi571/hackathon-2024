import { Request, Response } from 'express';
import User from '../models/userModel';
import { generateToken } from '../utils/jwtUtils';
import { UserRoles } from '../types/userTypes';


// Get all users from MongoDB
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Use Mongoose to find all users
    const users = await User.find();

    // Return the array of users as JSON response
    res.status(200).json(users);
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

    // Create the payload for the JWT token
    const payload = {
      token : '',
      firstname,
      lastname,
      email,
      role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365) // 1 year expiration
    };
    
    // Generate the JWT token
    const token = generateToken(payload);
    
    // Add the generated token to the payload object
    payload.token = token;

    // Create a new user instance
    const user = new User(payload);
    
    await user.save();

    // Return the new user data with the token
    res.status(201).json({ 
      message: 'User created successfully', 
      user : payload
    });

  } catch (error: any) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }

};


// Update an existing user
export const updateUser = async (req: Request, res: Response) => {
  const { id, firstname, lastname, email } = req.body;

  try {
      // Update user information in the database
      const updatedUser = await User.findByIdAndUpdate(id, { firstname, lastname, email }, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Server error', error });
  }
};


// Update an existing user roles
export const updateUserRoles = async (req: Request, res: Response) => {
  const { id, role } = req.body;
  if (!id || !role) {
    return res.status(400).json({ message: 'Missing required parameters {id and/or role}' });
  }

  // Validate role
  if (!Object.values(UserRoles).includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
      // Update user information in the database
      const updatedUserRoles = await User.findByIdAndUpdate(id, { role }, { new: true });

      if (!updatedUserRoles) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json({ message: 'User role updated successfully', user: updatedUserRoles });
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Server error', error });
  }
};
