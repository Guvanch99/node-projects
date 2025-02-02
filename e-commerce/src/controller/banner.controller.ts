import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import bannerService from '../service/banner.service';
import { BannerDto } from '../dto/banner.dto';


class BannerController {

  async banners(req: Request, res: Response) {

    const banners =  await bannerService.banners();
    const result = banners.map((banner) => new BannerDto(banner));
    return res.status(StatusCodes.OK).json(result);
  }

}


export default new BannerController();
