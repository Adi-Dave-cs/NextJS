import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  userName: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
});

export default mongoose.models.User ||
  mongoose.model<IUser>('User', UserSchema, process.env.MONGO_USER_TABLE);
