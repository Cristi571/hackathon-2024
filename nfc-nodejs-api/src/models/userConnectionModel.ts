import mongoose, { Schema, Document } from 'mongoose';

export interface IUserConnection extends Document {
  user: mongoose.Schema.Types.ObjectId;
  connectedAt: Date;
}

const userConnectionSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  connectedAt: { type: Date, default: Date.now },
});

const UserConnection = mongoose.model<IUserConnection>('UserConnection', userConnectionSchema);
export default UserConnection;