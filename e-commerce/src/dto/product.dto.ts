import { ICategoryWithSubCategoryResponse, IMenu, IProductResponse } from '../types/products';

export class MenuResponseDto {
  public name: string;
  public parentCategory: null;
  public id: number;

  constructor(model: IMenu) {
    this.name = model.name;
    this.parentCategory = model.parent_category;
    this.id = model.id;
  }
}


export class ProductResponseDto {
  public id: number;
  public name: string;
  public description: string;
  public price: string;
  public discount: number;
  public count: number;
  public categoryId: number;
  public imageUrl: string;

  constructor(model: IProductResponse) {
    this.id = model.id;
    this.name = model.name;
    this.description = model.description;
    this.price = model.price;
    this.discount = model.discount;
    this.count = model.count;
    this.categoryId = model.category_id;
    this.imageUrl =  model.image_url;
  }
}


export class CategoryWithSubCategoryDto {
  public id: number;
  public name: string;
  public parentCategory: number;
  public parentName: string;
  public parentId: number;
  public children: CategoryWithSubCategoryDto[] = [];

  constructor(model:ICategoryWithSubCategoryResponse) {
    this.id = model.id;
    this.name = model.name;
    this.parentCategory = model.parent_category;
    this.parentName = model.parent_name;
    this.parentId = model.parent_id;
  }
}
