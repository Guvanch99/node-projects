import { Request, Response } from 'express';
import ProductService from '../service/product.service';

class ProductController {
  async uploadImage(req: Request, res: Response) {

    const url = await ProductService.uploadImage(req);
    return res.status(200).json({ url });
  }

  async removeImage(req: Request, res: Response) {
    await ProductService.removeImage(req.body.id);
    return res.status(200).json({ message: 'ok' });
  }
}

export default new ProductController();
