import { Request, Response } from 'express';
import { IUserLoginData, IUserResetPassword, IUserSignUpData, IUserUpdateData } from '../types/user';
import { BadRequestError } from '../errors';
import UserRepo from '../repositories/user.repo';
import bcrypt from 'bcryptjs';
import CookieService from './cookie.service';
import RefreshTokensRepo from '../repositories/refreshTokens.repo';
import JwtService from './jwt.service';
import { UserResponseDto } from '../dto/user.dto';
import { TypedRequestBody } from '../types/global';
import jwtService from './jwt.service';

class AuthService {

  private async validateLogin(userData: IUserLoginData) {

    if (!userData.email || !userData.password) {
      throw new BadRequestError('Provide please all credentials');
    }
    const result = await UserRepo.getUserByEmail(userData.email);
    const foundUser = result.rows?.[0];
    if (!foundUser) {
      throw new BadRequestError('User not found');
    }

    const isPasswordSame =  await bcrypt.compare(userData.password, foundUser.password);

    if (!isPasswordSame) {
      throw new BadRequestError('Credentials is not correct');
    }


    return foundUser;
  }

  private async validateSignUp(userData: IUserSignUpData) {
    if (!userData.email || !userData.password || !userData.username) {
      throw new BadRequestError('Provide please all credentials');
    }
    const foundUser = await UserRepo.getUserByEmail(userData.email);

    if (foundUser?.rows?.length) {
      throw  new  BadRequestError('Email already in use');
    }
  }

  async update(userData: IUserUpdateData, res: Response) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user =  await UserRepo.update({
      ...userData,
      password: hashedPassword
    });
    const preparedUser = user.rows[0];
    const { refreshToken } =  this.setTokens(preparedUser, res);
    await RefreshTokensRepo.update(refreshToken, preparedUser.id.toString());
    return preparedUser;
  }

  async login(userData: IUserLoginData, res: Response) {
    const user = await this.validateLogin(userData);
    const { refreshToken } =  this.setTokens(user, res);
    await RefreshTokensRepo.update(refreshToken, user.id.toString());
    return user;
  }

  async signUp(userData: IUserSignUpData, res: Response) {
    await this.validateSignUp(userData);

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await UserRepo.create({
      ...userData,
      password: hashedPassword,
    });
    const preparedUser = user.rows[0];
    const { refreshToken } = this.setTokens(preparedUser, res);

    await RefreshTokensRepo.create(refreshToken, preparedUser.id.toString());

    return preparedUser;

  }

  async resetPassword(req: TypedRequestBody<IUserResetPassword>, res: Response) {
    const user = req.user;
    if (!user) {
      throw  new  BadRequestError('User not found');
    }

    const { rows } = await UserRepo.getUserByEmail(user.email);

    const { password, id, username } = rows[0];

    const isOldPasswordIsEqualToCurrent = bcrypt.compare(req.body.oldPassword, password);

    if (!isOldPasswordIsEqualToCurrent) {
      throw new BadRequestError('Credentials is not correct');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const updatedUser = await UserRepo.update({
      id: id.toString(),
      username,
      password: hashedPassword
    });

    await RefreshTokensRepo.delete((req as any).signedCookies.refreshToken.id);

    this.setTokens(updatedUser.rows[0], res);
  }

  async logout(req:Request, res: Response) {
    const userData =  jwtService.decode(req.signedCookies.refreshToken);
    if (userData) {
      CookieService.removeCookies({ res,  key: 'accessToken'  });
      CookieService.removeCookies({ res,  key: 'refreshToken' });
      await RefreshTokensRepo.delete(userData.id.toString());
    }
  }

  setTokens(user: UserResponseDto, res:Response) {
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

    return {
      accessToken, refreshToken
    };
  }
}

export default new AuthService();
