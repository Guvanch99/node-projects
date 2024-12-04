import { ILikeData } from '../types/like';
import LikeRepo from '../repositories/like.repo';

class LikeService {
  async likeProduct(data: ILikeData) {
    const { rows } = await LikeRepo.getLikeByUserId(data.userId, data.productId);

    const isBeforeLiked = rows.length;

    if (isBeforeLiked) {
      await LikeRepo.updateLike(data);
    } else {
      await LikeRepo.createLike(data);
    }
  }

}

export default new LikeService();
