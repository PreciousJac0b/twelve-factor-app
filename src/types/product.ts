import { IProduct } from "../models/Product";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}


export interface getProductResponse {
  success: boolean;
  message: string;
  data?: IProduct[];
}

export interface ValidationResult {
  success: boolean;
  errors?: string[];
}