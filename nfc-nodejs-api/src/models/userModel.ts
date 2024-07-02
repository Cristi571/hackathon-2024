import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  nfc_id: string;
  payload: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema = new Schema({
  nfc_id: { type: String, required: true },
  payload: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model<IUser>('User', userSchema);
export default User;