import { pool } from '../db/pool';
import { IBanner } from '../types/banners';

class BannerRepo {

  async getBanners() {
    return await pool.query<IBanner>('SELECT * FROM banners WHERE expire_at > NOW()');
  }

  async deleteBanners() {
    return await pool.query('DELETE FROM banners WHERE expire_at < NOW() ');
  }
}

export default new BannerRepo();
