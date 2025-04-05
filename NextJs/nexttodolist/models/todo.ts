import mongoose, { Schema, Document } from 'mongoose';

export interface ITodo extends Document {
  completed: boolean;
  userName: string;
  TodoDescription: string;
  TodoTitle: string;
}

const UserTodoSchema = new Schema<ITodo>({
  userName: { type: String, required: true, unique: true, ref: 'User' },
  completed: { type: Boolean, default: false },
  TodoDescription: { type: String, default: '' },
  TodoTitle: { type: String, required: true },
});

export default mongoose.models.Todo ||
  mongoose.model<ITodo>('Todo', UserTodoSchema, process.env.MONGO_TODO_TABLE);
