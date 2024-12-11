export interface IOrder {
  address: IAddress
  products: IOrderDetail[]
}

export interface IAddress {
  city: string;
  street: string;
}


export interface IOrderDetail {
  productId: string
  quantity: number
  price: number
}


export interface OrderHistory{
  price: number,
  quantity: number,
  total: number,
  name: string
}
