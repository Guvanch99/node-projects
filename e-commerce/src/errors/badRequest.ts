import { StatusCodes } from 'http-status-codes';
import { CustomError } from './customError';

export class BadRequestError extends CustomError {

  constructor(message: string, public statusCode?: StatusCodes) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
