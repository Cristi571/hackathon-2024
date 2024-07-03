import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Authenticate user based on JWT token
export const authenticateUser = (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    try {
        // Verify JWT token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { [key: string]: any };

        // Return success response with decoded token data
        res.json({ success: true, data: decoded });
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(403).json({ message: 'Invalid token', error: error });
    }
};
