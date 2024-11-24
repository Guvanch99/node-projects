import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors';
import jwtService from '../service/jwt.service';

export const verifyToken = (req:Request, res:Response, next:NextFunction) => {
  const token = req.signedCookies?.accessToken;

  if (!token) {
    throw new UnauthorizedError('No token provided');
  }
  const isValid = jwtService.verifyToken(token);

  if (!isValid) {
    throw new UnauthorizedError('Token not verified');
  }

  (req as any).user = jwtService.decode(token);
  next();
};
