import { Pool as PgPool, PoolConfig, QueryResultRow } from 'pg';

class Pool {
  public pool: PgPool | undefined;

  async connect(poolConfig: PoolConfig) {
    this.pool = new PgPool(poolConfig);
    try {
      await this.pool.connect();
      console.log('Database connected successfully.');
    } catch (error) {
      console.error('Error connecting to database:', error);
      throw error;
    }
  }

  async query<T extends QueryResultRow>(query: string, p0: (string| Date)[]) {
    return this.pool!.query<T>(query, p0);
  }

  async close() {
    return this.pool?.end();
  }
}

const poolInstance = new Pool();
export { poolInstance as pool };
