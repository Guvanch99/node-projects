import { IBanner } from '../types/banners';

export class BannerDto {
  id: number;
  imageUrl: string;
  redirectUrl: string;

  constructor(model: IBanner) {
    this.id = model.id;
    this.imageUrl = model.image_url;
    this.redirectUrl = model.redirect_url;
  }

}
