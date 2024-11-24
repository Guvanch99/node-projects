import AuthService from '../service/auth.service';
import { Request, Response } from 'express';
import { TypedRequestBody } from '../types/global';
import { IUserLoginData, IUserSignUpData, IUserUpdateData } from '../types/user';
import { UserResponseDto } from '../dto/user.dto';
import { StatusCodes } from 'http-status-codes';
import JwtService from '../service/jwt.service';
import CookieService from '../service/cookie.service';
import RefreshTokensRepo from '../repositories/refreshTokens.repo';
import RefreshTokenService from '../service/refreshToken.service';

class AuthController {

  async logout(req: Request, res: Response) {
    await AuthService.logout(req, res);
    res.status(StatusCodes.OK).json({ msg: 'Successfully logged out' });
  }

  async refreshToken(req: TypedRequestBody<{refreshToken: string}>, res: Response) {
    const { accessToken, refreshToken } = await RefreshTokenService.updateRefreshToken(req.body.refreshToken);
    CookieService.attachCookiesToResponse({ res, token: accessToken, key: 'accessToken', expireInHour: 0.25 });
    CookieService.attachCookiesToResponse({ res, token: refreshToken, key: 'refreshToken', expireInHour: 3 });
  }

  async updateUser(req: TypedRequestBody<IUserUpdateData>, res: Response) {
    const user = await AuthService.update(req.body);
    const accessToken = (req as any).signedCookies.accessToken;
    const refreshToken = (req as any).signedCookies.refreshToken;
    return res.status(StatusCodes.OK).json(new UserResponseDto(
      { ...user, accessToken, refreshToken }
    ));
  }

  async signUp(req: TypedRequestBody<IUserSignUpData>, res: Response) {
    const user = await AuthService.signUp(req.body);
    const payload = {
      username: user.username,
      id: user.id,
      role:
      user.role,
      email:
      user.email
    };
    const { accessToken, refreshToken } = JwtService.generateTokens(payload);
    CookieService.attachCookiesToResponse({ res, token: accessToken, key: 'accessToken', expireInHour: 0.25 });
    CookieService.attachCookiesToResponse({ res, token: refreshToken, key: 'refreshToken', expireInHour: 3 });

    await RefreshTokensRepo.create(refreshToken, user.id.toString());

    return res.status(StatusCodes.CREATED).json(new UserResponseDto({ ...user, accessToken, refreshToken }));
  }

  async login(req: TypedRequestBody<IUserLoginData>, res: Response) {
    const user = await AuthService.login(req.body);
    const payload = {
      username: user.username,
      id: user.id,
      role:
      user.role,
      email:
      user.email
    };
    const { accessToken, refreshToken } = JwtService.generateTokens(payload);
    CookieService.attachCookiesToResponse({ res, token: accessToken, key: 'accessToken', expireInHour: 0.25 });
    CookieService.attachCookiesToResponse({ res, token: refreshToken, key: 'refreshToken', expireInHour: 3 });
    return res.status(StatusCodes.OK).json(new UserResponseDto({ ...user, accessToken, refreshToken }));
  }

}


export default new AuthController();
