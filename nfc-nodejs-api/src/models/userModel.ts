import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  nfc_id: string;
  payload: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema({
  nfc_id: { type: String, required: true },
  payload: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);