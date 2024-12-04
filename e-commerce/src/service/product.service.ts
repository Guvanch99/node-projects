import ProductRepo from '../repositories/product.repo';
import { BadRequestError } from '../errors';
import { CategoryWithSubCategoryDto } from '../dto/product.dto';

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

  async allProducts() {
    return await ProductRepo.getAllProducts();
  }

  async categoryWithSubCategories() {
    const result = await ProductRepo.getCategoryWithSubCategory();

    const categoryWithSubCategories = result.rows;

    const categoryWithSubCategoriesDto = categoryWithSubCategories
      .map((category) => new CategoryWithSubCategoryDto(category));

    return this.buildCategoryTree(categoryWithSubCategoriesDto, null);
  }

  buildCategoryTree(categories: CategoryWithSubCategoryDto[], parentId: number | null) {
    return categories
      .filter(category => category.parentCategory === parentId)
      .map(category => {


        const result = {
          ...category,
          children: this.buildCategoryTree(categories, category.parentId),
        } as CategoryWithSubCategoryDto;

        return result;
      });

  }

}

export default new ProductService();
