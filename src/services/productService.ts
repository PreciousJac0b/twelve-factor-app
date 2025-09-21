import { getProductResponse } from "../types/product";
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

  static async getSingleProduct(timeZone: string): Promise<getProductResponse> {
    if (!timeZone) {
      timeZone = 'Africa/Lagos';
    }
    const product = await Product.findOne({});

    if (!product) {
      return {
        success: false,
        message: 'No product found',
      };
    }
    const json = product.toJSON(<any>{ timeZone });
    return {
      success: true,
      message: 'Single product',
      data: [json],
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

  static async testDate(): Promise<void> {
    const nowUTC = new Date();
    console.log(nowUTC.toISOString())
  }
}