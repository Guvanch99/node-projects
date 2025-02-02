export interface IMenu{
  name: string
  parent_category: null
  id: number
}

export interface IProductResponse{
  id: number,
  name: string,
  description: string
  price: string
  discount: number
  count: number
  category_id: number
  image_url: string
}


export interface ICategoryWithSubCategoryResponse{
   id: number;
   name: string;
   parent_category: number;
   parent_name: string;
   parent_id: number;
}
