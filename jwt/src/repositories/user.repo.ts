import { pool } from '../db/pool';
import { IUserRepo, IUserSignUpData, IUserUpdateData } from '../types/user';
import { QueryResult } from 'pg';

class UserRepo {
  async getUserByEmail(email: string): Promise<QueryResult<IUserRepo>> {
    return pool.query<IUserRepo>(
      'SELECT * FROM users WHERE email=$1', [email]
    );
  }

  async create(userData: IUserSignUpData): Promise<QueryResult<IUserRepo>> {
    await pool.query<IUserRepo>(
      'INSERT INTO users(username, password, email) VALUES($1, $2, $3)',
      [userData.username, userData.password, userData.email]
    );

    return this.getUserByEmail(userData.email);
  }

  async update(userData: IUserUpdateData): Promise<QueryResult<IUserRepo>> {
    await pool.query<IUserRepo>(
      'UPDATE users SET username=$1, password=$2 WHERE id=$3',
      [userData.username, userData.password, userData.id]
    );

    return pool.query<IUserRepo>('SELECT * FROM users WHERE id=$1', [userData.id]);
  }

}

export default new UserRepo();
