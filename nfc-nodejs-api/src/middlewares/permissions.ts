// src/middleware/permissions.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Interface for decoded token
export interface DecodedToken {
  sub: string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

// Middleware to verify if user is an admin
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access Denied: Insufficient access rights to access this resource.' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Access Denied: Invalid Token!', error });
  }
};
