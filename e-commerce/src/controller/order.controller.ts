import { Response } from 'express';
import { TypedRequestBody } from '../types/global';
import { StatusCodes } from 'http-status-codes';
import { IOrder } from '../types/order';
import OrderService from '../service/order.service';

class OrderController {

  async order(req: TypedRequestBody<IOrder>, res: Response) {
    const userId = req!.user!.id.toString();
    await OrderService.create(req.body, userId);
    return res.status(StatusCodes.OK).json({ message: 'SUCCESS' });
  }

  async orderHistory(req: TypedRequestBody<any>, res: Response) {
    const userId = req!.user!.id.toString();
    const orders =   await OrderService.getAllOrders(userId);
    return res.status(StatusCodes.OK).json(orders.rows);
  }
}


export default new OrderController();
