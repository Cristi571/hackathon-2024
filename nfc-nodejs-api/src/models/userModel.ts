import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  token: string;
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema({
  token: { type: String, required: true },
  id: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
