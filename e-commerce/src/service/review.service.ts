import ReviewRepo from '../repositories/review.repo';
import { IReviewData } from '../types/review';

class ReviewService {

  async reviewProduct(data: IReviewData) {
    const { rows } = await ReviewRepo.getUserReviewProduct(data);

    const isReviewByProductExists = rows.length;

    if (isReviewByProductExists) {
      await ReviewRepo.updateReview(data);
    } else {
      await ReviewRepo.addReview(data);
    }
  }

  async removeReview({ reviewId, userId }:{ reviewId: number, userId: string }) {
    return await ReviewRepo.removeReview({ reviewId, userId });
  }

  async productReviews(productId: number) {
    return await ReviewRepo.getAllReviewsByProduct(productId);
  }

}

export default new ReviewService();
