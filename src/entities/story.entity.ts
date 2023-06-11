import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface StoryModel extends Document {
  storyTitle: string;
  storyContent: string;
  userId: ObjectId;
}

const StorySchema: Schema = new Schema({
  storyTitle: { type: String, required: true },
  storyContent: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export const storyModel: any = (): any => {
  return mongoose.model<StoryModel>('Story', StorySchema);
};