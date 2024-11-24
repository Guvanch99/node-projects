import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../errors';
import { Role } from '../enum/user.enum';
import { UserResponseDto } from '../dto/user.dto';

export const guard = (roles: Role[]) => (req:Request, res:Response, next:NextFunction) => {
  const user = (req as any).user as UserResponseDto;

  if (roles.includes(user.role)) {
    next();
  } else {
    throw new ForbiddenError('You dont have permission');
  }
};
