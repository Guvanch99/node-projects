import { Request, Response } from 'express';

export const notFound = (req: Request, res: Response):any => res.status(404).send('Route does not exist');

