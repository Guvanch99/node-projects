import { IReviewResponse } from '../types/review';

export class ReviewDto {
  id: number;
  rating: number;
  reviewText: string;
  userId: number;
  productId: number;

  constructor(model:IReviewResponse) {
    this.id = model.id;
    this.rating = model.rating;
    this.reviewText = model.review_text;
    this.productId = model.product_id;
    this.userId = model.user_id;
  }

}
