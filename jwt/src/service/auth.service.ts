import { Response } from 'express';
import { IUserLoginData, IUserSignUpData, IUserUpdateData } from '../types/user';
import { BadRequestError } from '../errors';
import UserRepo from '../repositories/user.repo';
import bcrypt from 'bcryptjs';
import CookieService from './cookie.service';

class AuthService {

  private async validateLogin(userData: IUserLoginData) {
    if (!userData.email || !userData.password) {
      throw new BadRequestError('Provide please all credentials');
    }
    const foundUser = await UserRepo.getUserByEmail(userData.email);

    if (!foundUser) {
      throw new BadRequestError('User not found');
    }
    const isPasswordSame =  await bcrypt.compare(userData.password, foundUser.rows?.[0].password);

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

  async update(userData: IUserUpdateData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user =  await UserRepo.update({
      ...userData,
      password: hashedPassword
    });
    return user.rows[0];
  }

  async login(userData: IUserLoginData) {
    const user = await this.validateLogin(userData);

    return user.rows[0];
  }

  async signUp(userData: IUserSignUpData) {
    await this.validateSignUp(userData);

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await UserRepo.create({
      ...userData,
      password: hashedPassword,
    });
    return user.rows[0];

  }
  async logout(res: Response) {
    CookieService.removeCookies({ res,  key: 'accessToken'  });
    CookieService.removeCookies({ res,  key: 'refreshToken' });
  }
}

export default new AuthService();
