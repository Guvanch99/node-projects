// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Router } from 'express';
import ProductController from '../controller/product.controller';
const router = Router();

router.get('/menu',  ProductController.menu);
router.get('/products',  ProductController.allProducts);
router.get('/subCategory',  ProductController.withSubCategory);
router.get('/products/:categoryId',  ProductController.getProductByCategory);


export default router;
