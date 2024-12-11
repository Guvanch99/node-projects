import { Response } from 'express';
import { TypedRequestBody } from '../types/global';
import { StatusCodes } from 'http-status-codes';
import LikeService from '../service/like.service';

class LikeController {

  async like(req: TypedRequestBody<{isLike: boolean, productId: string}>, res: Response) {
    const data = {
      isLike: req.body.isLike,
      productId: req.body.productId,
      userId: req!.user!.id.toString()
    };
    await LikeService.likeProduct(data);
    return res.status(StatusCodes.OK).json({ message: 'Updated' });
  }

}


export default new LikeController();
