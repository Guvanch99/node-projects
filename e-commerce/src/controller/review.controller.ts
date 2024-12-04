import { Response, Request } from 'express';
import { TypedRequestBody } from '../types/global';
import { StatusCodes } from 'http-status-codes';
import ReviewService from '../service/review.service';
import { IReviewData } from '../types/review';
import { BadRequestError } from '../errors';
import { ProductResponseDto } from '../dto/product.dto';
import { ReviewDto } from '../dto/review.dto';

class ReviewController {

  async review(req: TypedRequestBody<{reviewText: string, productId: string, rating?: number}>, res: Response) {

    const data: IReviewData = {
      review: req.body.reviewText,
      rating: req.body.rating ?? 1,
      productId: req.body.productId,
      userId: req!.user!.id.toString()
    };

    await ReviewService.reviewProduct(data);

    return res.status(StatusCodes.OK).json({ message: 'Success' });
  }

  async removeReview(req: TypedRequestBody<unknown>, res: Response) {
    const reviewId = (req as Request).params.reviewId as unknown as string | undefined;

    if (!reviewId) {
      throw new BadRequestError('There is no review id for this review');
    }

    await ReviewService.removeReview({
      reviewId: Number(reviewId),
      userId: req!.user!.id.toString()
    });

    return res.status(StatusCodes.OK).json({ message: 'Success' });
  }

  async getReviewsByProduct(req: TypedRequestBody<unknown>, res: Response) {
    const productId = (req as Request).params.productId as unknown as string | undefined;

    if (!productId) {
      throw new BadRequestError('There is no productId for this review');
    }
    const { rows } = await ReviewService.productReviews(Number(productId));

    const reviewsDtos = rows.map(row => new ReviewDto(row));

    return res.status(StatusCodes.OK).json(reviewsDtos);
  }

}


export default new ReviewController();
