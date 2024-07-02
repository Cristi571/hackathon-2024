import { Request, Response } from 'express';
import User from '../models/userModel';
import { encrypt, decrypt } from '../utils/cryptoUtils';

export const addUser = async (req: Request, res: Response) => {
  const { nfc_id, payload } = req.body;

  if (!nfc_id || !payload) {
    return res.status(400).json({ message: 'nfc_id and payload are required' });
  }

  try {
    const encryptedPayload = encrypt(JSON.stringify(payload));
    const user = new User({ nfc_id, payload: JSON.stringify(encryptedPayload) });
    await user.save();
    res.status(201).json({ message: 'User added successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error adding user', error });
  }
};