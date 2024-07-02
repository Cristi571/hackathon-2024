import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

export const authenticateNFC = async (req: Request, res: Response) => {
  const { nfc_id, token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    
    let user = await User.findOne({ nfc_id });

    if (!user) {
      user = new User({ nfc_id, payload: JSON.stringify(decoded) });
      await user.save();
    }

    res.status(200).json({ message: 'Authentication successful', user });
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed', error });
  }
};
