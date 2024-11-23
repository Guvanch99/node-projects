import { Response } from 'express';

class CookieService {
  attachCookiesToResponse(
    { res, token, key, expireInHour }: {
      res: Response
      key: string
      token: string,
      expireInHour: number
    }
  ) {
    const expires = 1000 * 60 * 60 * expireInHour;

    res.cookie(key, token, {
      httpOnly: true,
      expires: new Date(Date.now() + expires),
      signed: true
    });
  }
  removeCookies({ res, key }:{
    res: Response
    key: string
  }) {
    res.clearCookie(key);
  }
}

export default new CookieService();
