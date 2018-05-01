import { Document } from 'mongoose';

export interface Entry extends Document {
  readonly _id: string;
  readonly title: string;
  readonly body: string;
  readonly image: string;
  readonly created_at: Date;
}
