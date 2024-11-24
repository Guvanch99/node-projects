import { IRefreshTokenRepo } from '../types/refreshToken';

export class RefreshTokenDto {
  public id: number;
  public token: string;
  public expiresAt: Date;
  public userId: number;


  constructor(model: IRefreshTokenRepo) {
    this.id = model.id;
    this.token = model.token;
    this.expiresAt = model.expires_at;
    this.userId = model.user_id;
  }
}
