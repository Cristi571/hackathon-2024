import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

/**
 * Generate a JWT token.
 * @param payload - The data to be encoded in the token.
 * @returns The generated JWT token.
 */
export const generateToken = (payload: object): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    // expiresIn: '1y' // Set the token to expire in 1 year
  });
};

export const verifyToken = (token: string): object | string => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

// Middleware to verify JWT token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { [key: string]: any };
    // req.user = decoded; // Assign decoded JWT payload to req.user
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token', error });
  }
};
