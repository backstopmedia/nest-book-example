import { Schema } from 'mongoose';

export const EntrySchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  body: String,
  image: String,
  created_at: Date
});
