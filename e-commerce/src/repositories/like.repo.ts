import { pool } from '../db/pool';
import { ILikeData } from '../types/like';

class LikeRepo {

  async createLike({ isLike, userId, productId }:ILikeData) {
    return pool.query('INSERT INTO likes(user_id, product_id, is_like) VALUES($1, $2, $3)', [userId, productId, isLike]);
  }

  async updateLike({ userId, isLike, productId }:ILikeData) {
    return pool.query('UPDATE likes SET is_like=$1 WHERE product_id=$2 AND user_id=$3', [isLike, productId, userId]);
  }

  async getLikeByUserId(userId: string, productId: string) {
    return pool.query('SELECT * FROM likes WHERE product_id=$1 AND user_id=$2', [ productId, userId]);

  }
}

export default new LikeRepo();
