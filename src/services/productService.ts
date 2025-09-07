import {getProductResponse} from "../types/product";
import { Product, IProduct } from "../models/Product";

export class ProductService {
  static async getProducts(): Promise<getProductResponse> {
    const products = await Product.find({}).lean<IProduct[]>();

    if (!products || products.length === 0) {
      return {
        success: false,
        message: 'No products found',
      };
    }
    return {
      success: true,
      message: 'List of products',
      data: products,
    };
  }

  static async getSingleProduct(): Promise<getProductResponse> {
    const product = await Product.findOne({}).lean<IProduct>();

    if (!product) {
      return {
        success: false,
        message: 'No product found',
      };
    }
    return {
      success: true,
      message: 'Single product',
      data: [product],
    };
  }

  static async createProduct(productData: Partial<IProduct>): Promise<getProductResponse> {
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();

    if (!savedProduct) {
      return {
        success: false,
        message: 'Product creation failed',
      };
    }

    return {
      success: true,
      message: 'Product created successfully',
      data: [savedProduct],
    };
  }
}