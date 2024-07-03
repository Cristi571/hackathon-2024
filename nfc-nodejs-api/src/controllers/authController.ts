import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import UserConnection from '../models/userConnectionModel';

// Authenticate user based on JWT token and mongodb data
export const authenticateUser = async (req: Request, res: Response) => {
    // Get the token from the authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    try {
        // Verify JWT token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { [key: string]: any };

        // Extract email from decoded token
        const email = decoded.email;

        // Fetch user from database using email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new UserConnection record
        const userConnection = new UserConnection({ user: user._id });
        await userConnection.save();

        // Return success response with decoded token data and user information
        res.json({ success: true, user });
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(403).json({ message: 'Invalid token', reason : error });
    }
};
