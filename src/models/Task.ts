import mongoose, { Document, Schema } from 'mongoose';
import { DateTime } from 'luxon';

export interface ITask extends Document {
  tag: string;
  title: string;
  details: string;
  createdAt: Date;
  timeDue: Date;
}

const taskSchema: Schema = new Schema({
  tag: { type: String, required: true },
  title: { type: String, required: true },
  details: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  timeDue: { type: Date, required: true }
});

taskSchema.set('toJSON', {
  transform: function (_doc, ret: any, options: any) {
    const tz = options?.timeZone;
    if (tz && ret.createdAt) {
      ret.createdAt = DateTime.fromJSDate(ret.createdAt).setZone(tz).toISO();
    }

    if (tz && ret.timeDue) {
      ret.timeDue = DateTime.fromJSDate(ret.timeDue)
        .setZone(tz)
        .toISO();
    }
    return ret;
  },
});

export const Task = mongoose.model<ITask>('Task', taskSchema);