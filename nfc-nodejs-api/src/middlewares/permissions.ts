// src/middleware/permissions.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

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
      console.log("isAdmin : false");
      return res.status(403).json({ message: 'Access Denied: Insufficient rights to access this resource.' });
    }
    console.log("isAdmin : true");
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Access Denied: Invalid Token!', error });
  }
};

// Middleware to verify if user is an admin
export const isManager = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    if (decoded.role !== 'manager') {
      console.log("isManager : false");
      return res.status(403).json({ message: 'Access Denied: Insufficient rights to access this resource.' });
    }
    console.log("isManager : true");
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Access Denied: Invalid Token!', error });
  }
};


// Middleware to verify if the user making the request is the same as the user of the request
export const isHimself = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
      return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
  }

  try {
      // Verify JWT token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { [key: string]: any };

      // Extract id from decoded token
      const userId = decoded.id;

      // Compare with userId from request body
      if (userId !== req.body.id) {
        console.log("isHimself : false");
        return res.status(403).json({ message: 'Access Denied: You do not have permission to perform this action.' });
      }
      console.log("isHimself : true");
      next();
  } catch (error) {
      return res.status(401).json({ message: 'Access Denied: Invalid Token!', error });
  }
};



// Middleware function to check isAdmin || isManager || isHimself
export const isAdminOrManager = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
  }

  try {
    // Verify JWT token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { [key: string]: any };

    // Extract id from decoded token
    const userId = decoded.id;

    // Compare with userId from request body or params, or check if admin
    if (decoded.role === 'admin' || decoded.role === 'manager') {
      console.log("isAdminOrManager : true");
      next();
    } else {
      console.log("isAdminOrManager : false");
      return res.status(403).json({ message: 'Access Denied: You do not have permission to perform this action.' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Access Denied: Invalid Token!', error });
  }
};

export const isAdminOrManagerOrHimself = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
  }

  try {
    // Verify JWT token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { [key: string]: any };

    // Extract email from decoded token
    const email = decoded.email;
    // Fetch user data from database by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare with userId from request body or params, or check if admin
    if (decoded.role === 'admin' || decoded.role === 'manager' || user.id === req.body.id) {
      console.log("isAdminOrManagerOrHimself : true");
      next();
    } else {
      console.log("isAdminOrManagerOrHimself : false");
      return res.status(403).json({ message: 'Access Denied: You do not have permission to perform this action.' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Access Denied: Invalid Token!', error });
  }
};