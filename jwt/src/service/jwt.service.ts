import { UserResponseDto } from '../dto/user.dto';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET as string;
const accessTokenTime = process.env['ACCESS_TOKEN_TIME'] as string;
const refreshTokenTime = process.env['REFRESH_TOKEN_TIME'] as string;

class JwtService {

  generateTokens(payload: Omit<UserResponseDto, 'accessToken'|'refreshToken'>) {
    const accessToken = jwt.sign(payload, secretKey, { expiresIn: accessTokenTime  });
    const refreshToken = jwt.sign(payload, secretKey, { expiresIn: refreshTokenTime  });

    return {
      accessToken,
      refreshToken,
    };
  }

  verifyToken(token: string) {
    return jwt.verify(token, secretKey);
  }

  decode(token: string): UserResponseDto | null {
    return jwt.decode(token) as UserResponseDto;
  }


}

export default new JwtService();
