import { pool } from '../db/pool';
import { IMenu, IProductResponse } from '../types/products';

class ProductRepo {

  async getParentCategory() {
    return await pool.query<IMenu>('SELECT * from categories where parent_category IS NULL');
  }

  async getProductsByCategory(categoryId: string) {
    return await pool.query<IProductResponse>('SELECT products.*, product_images.image_url from products JOIN product_images ON product_images.id = products.id WHERE category_id =$1', [categoryId]);
  }
}

export default new ProductRepo();
