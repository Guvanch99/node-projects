import { IOrder } from '../types/order';
import OrderRepo from '../repositories/order.repo';

class OrderService {

  async create(data: IOrder, userId: string) {
    return OrderRepo.create(data, userId);
  }
  async getAllOrders(userId: string) {
    return OrderRepo.getAllOrderByUserId(userId);
  }

}

export default new OrderService;
