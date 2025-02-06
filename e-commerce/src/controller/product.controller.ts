import ProductService from '../service/product.service';
import { Request, Response } from 'express';
import { MenuResponseDto, ProductResponseDto } from '../dto/product.dto';
import { stringToBoolean } from '../utils/stringToBoolean';
class ProductController {

  async menu(req: Request, res:Response) {
    const { rows } = await ProductService.menu(stringToBoolean(req.params?.isHiddenCategories));
    const menuDtos = rows.map(row => new MenuResponseDto(row));
    return res.status(200).json(menuDtos);
  }

  async getProductByCategory(req: Request, res:Response) {
    const { rows } = await ProductService.productsByCategories(
      req.params.categoryId as unknown as string | undefined,
    );
    const productDtos = rows.map(row => new ProductResponseDto(row));
    return res.status(200).json(productDtos);
  }

  async allProducts(req: Request, res:Response) {
    const { rows } = await ProductService.allProducts();
    const productDtos = rows.map(row => new ProductResponseDto(row));
    return res.status(200).json(productDtos);
  }

  async withSubCategory(req: Request, res:Response) {
    const withSubCategory = await ProductService.categoryWithSubCategories(stringToBoolean(req.params?.isHiddenCategories));
    return res.status(200).json(withSubCategory);
  }

}

export default new ProductController();
