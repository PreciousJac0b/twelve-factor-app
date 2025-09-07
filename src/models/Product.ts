import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

export const Product = mongoose.model<IProduct>('Product', productSchema);

