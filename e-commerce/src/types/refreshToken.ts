export interface IRefreshTokenRepo {
  id: number,
  token: string,
  expires_at: Date,
  user_id: number
}

export interface IRefreshTokenResponse{
  id: number,
  token: string,
  expiresAt: Date,
  userId: number
}
