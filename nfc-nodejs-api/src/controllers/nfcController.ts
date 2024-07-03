import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import UserConnection from '../models/userConnectionModel';

export const authenticateNFC = async (req: Request, res: Response) => {
  const { nfc_id, token } = req.body;

  console.log('Received NFC ID:', nfc_id);
  console.log('Received Token:', token);
  console.log('JWT_SECRET:', process.env.JWT_SECRET);

  try {
    const secret = process.env.JWT_SECRET!;
    console.log('Using Secret:', secret);

    const decoded = jwt.verify(token, secret);
    console.log('Decoded JWT:', decoded);

    let user = await User.findOne({ nfc_id });
    console.log('User found:', user);

    if (!user) {
      console.log('User not found with NFC ID:', nfc_id);
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const userPayload = JSON.parse(user.payload);

    if (JSON.stringify(userPayload) !== JSON.stringify(decoded)) {
      console.log('Payload mismatch. User payload:', userPayload, 'Decoded payload:', decoded);
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const userConnection = new UserConnection({ user: user._id });
    await userConnection.save();

    console.log('Authentication successful');
    res.json({ message: 'Authentication successful', user });
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(401).json({ message: 'Authentication failed', error });
  }
};
