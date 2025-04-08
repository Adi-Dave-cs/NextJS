import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  userName: string;
  password: string;
  salt : string;
}

const UserSchema = new Schema<IUser>({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  salt : {type : String, required:true}
}, {collection : 'userList'});

export default mongoose.models.User ||
  mongoose.model<IUser>('User', UserSchema);
