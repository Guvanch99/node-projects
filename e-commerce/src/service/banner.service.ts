import BannersRepo from '../repositories/banners.repo';

class BannerService {
  async banners() {
    const { rows } = await BannersRepo.getBanners();

    return rows;
  }

}

export default new BannerService();
