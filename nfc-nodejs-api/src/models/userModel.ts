import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  nfc_id: string;
  payload: string;
}

const userSchema: Schema = new Schema({
  nfc_id: { type: String, required: true, unique: true },
  payload: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
