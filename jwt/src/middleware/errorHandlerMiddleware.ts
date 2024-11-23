import { Request, Response } from 'express';
import { CustomError } from '../errors/customError';
import { StatusCodes } from 'http-status-codes';

interface IError{
  message?: string,
  statusCode?: StatusCodes
}
export const errorHandlerMiddleware = (error:IError, req: Request, res:Response):any => {
  const customError = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: error.message || 'Something went wrong try again later',
  };

  return res.status(customError.statusCode).json({ msg: customError.msg });
};
