// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Router } from 'express';
import BannerController from '../controller/banner.controller';
const router = Router();

router.post('/', BannerController.banners);


export default router;
