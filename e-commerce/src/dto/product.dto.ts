import { IMenu, IProductResponse } from '../types/products';

export class MenuResponseDto {
  public name: string;
  public parentCategory: null;

  constructor(model: IMenu) {
    this.name = model.name;
    this.parentCategory = model.parent_category;

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
