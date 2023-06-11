import mongoose, { Schema, Document } from 'mongoose';
import { StoryModel } from './story.entity';

export interface UserModel extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const userModel: any = (): any => {
  return mongoose.model<UserModel>('User', UserSchema);
};

