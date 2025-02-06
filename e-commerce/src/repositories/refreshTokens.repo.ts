import { pool } from '../db/pool';

class RefreshTokensRepo {

  async create(token: string, userId: string) {

    const date = new Date();
    date.setHours(date.getHours() + 3);

    return pool.query('INSERT INTO refresh_tokens (expires_at, token, user_id) VALUES ($1, $2, $3)',
      [date, token, userId]);
  }
  async update(token: string, userId: string) {
    const date = new Date();
    date.setHours(date.getHours() + 3);

    return pool.query('UPDATE refresh_tokens SET expires_at=$1, token=$2 WHERE user_id=$3', [date, token, userId ]);
  }

  async delete(userId: string) {
    return pool.query('DELETE FROM refresh_tokens WHERE user_id=$1', [userId]);
  };

}

export default new RefreshTokensRepo();
