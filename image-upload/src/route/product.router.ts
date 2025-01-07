// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import { imageUpload } from '../middleware/fileUpload';
const router = Router();

router.post('/upload-image', imageUpload.single('avatar'), ProductController.uploadImage);
router.delete('/remove-iamge',  ProductController.removeImage);

export default router;
