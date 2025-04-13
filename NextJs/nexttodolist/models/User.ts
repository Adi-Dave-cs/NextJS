import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  userEmail:string;
  userName: string;
  password: string;
  salt : string;
  role:string;
}

const UserSchema = new Schema<IUser>({
  userEmail:{type : String, required:true, unique:true},
  userName: { type: String, required: true },
  password: { type: String, required: true },
  salt : {type : String, required:true},
  role : {type : String, default:'user'}
}, {collection : 'userList'});

export default mongoose.models.User ||
  mongoose.model<IUser>('User', UserSchema);
