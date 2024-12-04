import { IReviewData, IReviewResponse } from '../types/review';
import { pool } from '../db/pool';

class ReviewRepo {
  async addReview({ userId, review, productId, rating }: IReviewData) {
    return pool.query('INSERT INTO reviews(user_id, product_id, review_text, rating) VALUES($1, $2, $3, $4)',
      [userId, productId, review, rating]);
  }

  async removeReview({ reviewId, userId }:{ reviewId: number, userId: string }) {
    return pool.query('DELETE FROM reviews WHERE id=$1 AND user_id=$2', [reviewId, userId]);
  }

  async updateReview({ userId, review, productId, rating }: IReviewData) {
    return pool.query('UPDATE reviews review_text=$1 rating=$2 WHERE user_id=$3 AND product_id=$4',
      [review, rating, userId, productId]);
  }

  async getUserReviewProduct({ userId, productId }: Omit<IReviewData, 'review'>) {
    return pool.query('SELECT * FROM reviews WHERE user_id=$1 AND product_id=$2',
      [userId, productId]);
  }

  async getAllReviewsByProduct(productId: number) {
    return pool.query<IReviewResponse>('SELECT * FROM reviews WHERE product_id=$1', [productId]);
  }
}

export default new ReviewRepo();
