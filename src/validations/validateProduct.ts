import { IProduct } from '../models/Product';
import { ValidationResult } from '../types/product';

export function validateProductData(data: Partial<IProduct>): ValidationResult {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== 'string') {
    errors.push('Name is required and must be a string');
  }

  if (data.price === undefined || typeof data.price !== 'number') {
    errors.push('Price is required and must be a number');
  }

  if (!data.description || typeof data.description !== 'string') {
    errors.push('Description is required and must be a string');
  }

  return {
    success: errors.length === 0,
    errors: errors.length ? errors : undefined,
  };
}