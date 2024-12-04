// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Router } from 'express';
import LikeController from '../controller/like.controller';
import { verifyToken } from '../middleware/verifyToken';
const router = Router();

router.post('/', verifyToken, LikeController.like);


export default router;
