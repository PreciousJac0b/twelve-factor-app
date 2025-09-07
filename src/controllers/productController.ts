import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { validateProductData } from '../validations/validateProduct';

export class ProductController {
  static async getProducts(_: Request, res: Response): Promise<void> {
    try {
      const result = await ProductService.getProducts();
      res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async getSingleProduct(_: Request, res: Response): Promise<void> {
    try {
      const result = await ProductService.getSingleProduct();
      res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }

  }

  static async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const productData = req.body;
      const validationResult = validateProductData(productData);

      if (!validationResult.success) {
        res.status(400).json(validationResult.errors);
        return;
      }

      const result = await ProductService.createProduct(productData);

      res.status(result.success ? 201 : 400).json(result);
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
}
}