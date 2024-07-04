import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/userModel';
import UserConnection from '../models/userConnectionModel';
import UserLogin from '../models/userLoginModel';

const generateAccessToken = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: '24h',
    });
};

// Authenticate user based on JWT token and MongoDB data
export const authenticateUser = async (req: Request, res: Response) => {
    // Get the token from the authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        try {
            // Verify JWT token using the secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { [key: string]: any };

            // Extract email from decoded token
            const email = decoded.email;

            // Fetch user from the database using email
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Create a new UserConnection record
            const userConnection = new UserConnection({ user: user._id, connectedAt: new Date() });
            await userConnection.save();

            // Log the user login
            const ipAddress = req.ip || req.connection.remoteAddress || '';
            const userLogin = new UserLogin({ userId: user._id, ipAddress });
            await userLogin.save();

            // Return success response with decoded token data and user information
            return res.json({ success: true, user });
        } catch (error) {
            console.error('Error verifying token:', error);
            return res.status(403).json({ message: 'Invalid token', reason: error });
        }
    }

    // Authenticate by email and password
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide your credentials.' });
    }

    try {
        // Fetch user from the database using email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract the salt and the hashed password
        const [salt, storedHashedPassword] = user.password.split(':');

        if (!salt || !storedHashedPassword) {
            return res.status(500).json({ message: 'Error processing user credentials' });
        }

        // Hash the provided password with the salt
        const hashedPassword = crypto.createHmac('sha256', salt)
            .update(password)
            .digest('hex');

        // Compare the hashed password with the stored hashed password
        if (hashedPassword !== storedHashedPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const newToken = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET!, {
            expiresIn: '1d',
        });

        // Create a new UserConnection record
        const userConnection = new UserConnection({ user: user._id, connectedAt: new Date() });
        await userConnection.save();
        const userResponse = {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            iat : user.createdAt
        };

        // Return success response with the token
        return res.json({ 
            success: true, 
            token: newToken,
            user : userResponse
        });
    } catch (error) {
        console.error('Error authenticating user:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
};
