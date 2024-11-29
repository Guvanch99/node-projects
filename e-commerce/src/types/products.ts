export interface IMenu{
  name: string
  parent_category: null
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
