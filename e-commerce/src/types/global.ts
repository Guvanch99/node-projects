import Express from 'express';
import { UserResponseDto } from '../dto/user.dto';

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
  user?: UserResponseDto
}
