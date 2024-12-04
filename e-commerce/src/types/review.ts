export interface IReviewData{
  userId: string;
  productId: string
  review: string
  rating: number
}

export interface IReviewResponse {
  user_id: number
  product_id: number
  rating: number
  review_text: string
  id: number
}
