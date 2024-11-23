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

    return pool.query('UPDATE refreshTokens SET expires_at=$1, token=$2 WHERE user_id=$3', [date, token, userId ]);
  }

  async delete(id: string) {
    return pool.query('DELETE FROM refreshTokens WHERE id=$1', [id]);
  };

}

export default new RefreshTokensRepo();
