import ProductRepo from '../repositories/product.repo';
import { BadRequestError } from '../errors';

class ProductService {

  async menu() {
    return await ProductRepo.getParentCategory();
  }

  async productsByCategories(categoryId?: string) {

    if (!categoryId || Number.isNaN(Number(categoryId))) {
      throw new BadRequestError('Category id must be an integer');
    }

    return  await ProductRepo.getProductsByCategory(categoryId);
  }
}

export default new ProductService();
