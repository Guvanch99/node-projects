import AuthService from '../service/auth.service';
import { Request, Response } from 'express';
import { TypedRequestBody } from '../types/global';
import { IUserLoginData, IUserSignUpData, IUserUpdateData } from '../types/user';
import { UserResponseDto } from '../dto/user.dto';
import { StatusCodes } from 'http-status-codes';
import CookieService from '../service/cookie.service';
import RefreshTokenService from '../service/refreshToken.service';

class AuthController {

  async logout(req: Request, res: Response) {
    await AuthService.logout(req, res);
    res.status(StatusCodes.OK).json({ msg: 'Successfully logged out' });
  }

  async refreshToken(req: Request, res: Response) {
    const { accessToken, refreshToken } = await RefreshTokenService.updateRefreshToken(req.signedCookies.refreshToken);
    CookieService.attachCookiesToResponse({ res, token: accessToken, key: 'accessToken', expireInHour: 0.25 });
    CookieService.attachCookiesToResponse({ res, token: refreshToken, key: 'refreshToken', expireInHour: 3 });
  }

  async updateUser(req: TypedRequestBody<IUserUpdateData>, res: Response) {
    const user = await AuthService.update(req.body, res);
    return res.status(StatusCodes.OK).json(new UserResponseDto(user));
  }

  async signUp(req: TypedRequestBody<IUserSignUpData>, res: Response) {
    const user = await AuthService.signUp(req.body, res);

    return res.status(StatusCodes.CREATED).json(new UserResponseDto({ ...user }));
  }

  async login(req: TypedRequestBody<IUserLoginData>, res: Response) {
    const user = await AuthService.login(req.body, res);

    return res.status(StatusCodes.OK).json(new UserResponseDto(user));
  }

}


export default new AuthController();
