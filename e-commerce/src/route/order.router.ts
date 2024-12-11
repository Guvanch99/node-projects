// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken';
import OrderController from '../controller/order.controller';
const router = Router();

router.post('/', verifyToken, OrderController.order);
router.post('/history', verifyToken, OrderController.orderHistory);


export default router;
