import mongoose, { Schema, Document } from 'mongoose';

interface IUserLogin extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  loginTime: Date;
  ipAddress: string;
}

const UserLoginSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  loginTime: { type: Date, default: Date.now },
  ipAddress: { type: String, required: true },
});

const UserLogin = mongoose.model<IUserLogin>('UserLogin', UserLoginSchema);

export default UserLogin;
