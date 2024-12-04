// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken';
import ReviewController from '../controller/review.controller';
const router = Router();

router.post('/', verifyToken, ReviewController.review);
router.get('/:productId', verifyToken, ReviewController.getReviewsByProduct);
router.delete('/:reviewId', verifyToken, ReviewController.removeReview);


export default router;
