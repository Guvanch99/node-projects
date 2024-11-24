import { BadRequestError } from '../errors';
import JwtService from './jwt.service';
import RefreshTokensRepo from '../repositories/refreshTokens.repo';

class AuthService {

  private validate(refreshToken?: string) {
    if (!refreshToken) {
      throw new BadRequestError('THERE IS NO REFRESH TOKEN');
    }

    const userData = JwtService.decode(refreshToken);


    if (!userData) {
      throw new BadRequestError('INVALID TOKEN');
    }

    const isValid = JwtService.verifyToken(refreshToken);

    if (isValid) {
      throw new BadRequestError('TOKEN NOT EXPIRED');
    }


    return userData;
  }

  async updateRefreshToken(oldRefreshToken?: string) {
    const userData =  this.validate(oldRefreshToken);
    const { accessToken, refreshToken } = JwtService.generateTokens(userData);
    await RefreshTokensRepo.update(refreshToken, userData.id.toString());
    return {
      accessToken,
      refreshToken
    };
  }


}

export default new AuthService();
