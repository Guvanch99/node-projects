import { pool } from '../db/pool';
import { ICategoryWithSubCategoryResponse, IMenu, IProductResponse } from '../types/products';

class ProductRepo {

  async getParentCategory() {
    return await pool.query<IMenu>('SELECT * from categories where parent_category IS NULL');
  }

  async getCategoryWithSubCategory() {
    return await pool.query<ICategoryWithSubCategoryResponse>(`
    SELECT child.id, child.name, child.parent_category, parent.name AS parent_name, parent.id AS parent_id, parent.parent_category
    FROM categories  AS child
    JOIN categories AS parent ON parent.id = child.parent_category
    ORDER BY parent.parent_category DESC
  `);
  }

  async getProductsByCategory(categoryId: string) {
    return await pool.query<IProductResponse>('SELECT products.*, product_images.image_url from products JOIN product_images ON product_images.id = products.id WHERE category_id =$1', [categoryId]);
  }
  async getAllProducts() {
    return await pool.query<IProductResponse>('SELECT products.*, product_images.image_url from products JOIN product_images ON product_images.id = products.id');

  }
}

export default new ProductRepo();
