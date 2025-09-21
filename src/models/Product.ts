import mongoose, { Document, Schema } from 'mongoose';
import { DateTime } from 'luxon';

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  createdAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

productSchema.set('toJSON', {
  transform: function (_doc, ret: any, options: any) {
    const tz = options?.timeZone;
    if (tz && ret.createdAt) {
      ret.createdAt = DateTime.fromJSDate(ret.createdAt).setZone(tz).toISO();
    }
    return ret;
  },
});

export const Product = mongoose.model<IProduct>('Product', productSchema);

