import { pool } from '../db/pool';
import { ICategoryWithSubCategoryResponse, IMenu, IProductResponse } from '../types/products';

class ProductRepo {

  async getParentCategory(isHiddenCategories?: boolean) {
    return await pool.query<IMenu>('SELECT * from categories where parent_category IS NULL and is_hide = $1', [!!isHiddenCategories]);
  }

  async getProductById(id: number) {
    return await pool.query<IProductResponse>('SELECT * from products WHERE id=$1', [id]);
  }

  async getCategoryWithSubCategory(isHiddenCategories?: boolean) {
    return await pool.query<ICategoryWithSubCategoryResponse>(`
    SELECT child.id, child.name, child.parent_category, parent.name AS parent_name, parent.id AS parent_id, parent.parent_category
    FROM categories  AS child
    JOIN categories AS parent ON parent.id = child.parent_category
    WHERE parent.is_hide=$1
    ORDER BY parent.parent_category DESC
  `,[!!isHiddenCategories]);
  }

  async getProductsByCategory(categoryId: string) {
    return await pool.query<IProductResponse>('SELECT products.*, product_images.image_url from products JOIN product_images ON product_images.id = products.id WHERE category_id =$1', [categoryId]);
  }
  async getAllProducts() {
    return await pool.query<IProductResponse>('SELECT products.*, product_images.image_url from products JOIN product_images ON product_images.id = products.id');
  }
}

export default new ProductRepo();
