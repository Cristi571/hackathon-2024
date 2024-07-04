import { Request, Response } from 'express';
import crypto from 'crypto';
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
    const { firstname, lastname, email, password, role } = req.body;
  
    if (!firstname || !lastname || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      // Vérifiez si l'utilisateur existe déjà
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      
      // Prepare the payload
      const payload = {
        token : '',
        firstname,
        lastname,
        email,
        role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365) // Expiration d'un an
      };
  
      // Créez un sel et hachez le mot de passe
      const salt = crypto.randomBytes(16).toString('hex');
      const hashedPassword = crypto.createHmac('sha256', salt)
        .update(password)
        .digest('hex');
      
      const fullHashedPassword = `${salt}:${hashedPassword}`;
  
      // Générez le token JWT
      const token = generateToken(payload);

  
      // Créez une nouvelle instance de l'utilisateur
      const user = new User({
        token,
        firstname,
        lastname,
        email,
        password: fullHashedPassword,
        role
      });
  
      await user.save();
  
      // Retournez les données de l'utilisateur avec le token
      res.status(201).json({
        message: 'User created successfully',
        user: {
          firstname,
          lastname,
          email,
          role,
          token
        }
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


// Delete an existing user from MongoDB
export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ message: 'Missing required parameters {id}' });
    }

    try {
        // Update user information in the database
        const deleteUser = await User.findByIdAndDelete(userId);
        if (!deleteUser) {
        return res.status(404).json({ message: 'User not found. No deletion occurred.' });
        }
        return res.status(200).json({ message: 'User account successfully deleted.' });
    } catch (error) {
        console.error('Error deleting user account:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
