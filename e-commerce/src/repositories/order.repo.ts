import { pool } from '../db/pool';
import { IOrder, OrderHistory } from '../types/order';
import ProductRepo from './product.repo';

class OrderRepo {

  async create(orderData: IOrder, userId: string) {
    try {
      await pool.query('BEGIN');
      const orderQueryResult = await pool.query('INSERT INTO orders(user_id) VALUES($1) RETURNING id', [userId]);
      const orderId = orderQueryResult.rows[0].id.toString();

      await pool.query('INSERT INTO addresses(order_id, city, street) VALUES($1, $2, $3)', [orderId, orderData.address.city, orderData.address.street]);

      for (const orderProduct of orderData.products) {
        await pool.query('INSERT INTO order_items(order_id, product_id, quantity, price) VALUES($1, $2, $3, $4)',
          [orderId, orderProduct.productId, orderProduct.quantity, orderProduct.price]);

        const { rows } = await ProductRepo.getProductById(Number(orderProduct.productId));

        const remainProduct = rows[0].count - orderProduct.quantity;

        if (remainProduct <= 0) {
          throw new Error('Order quantity is more than count of product');
        }

        await pool.query('UPDATE products SET count =$1  WHERE id=$2', [remainProduct,orderProduct.productId]);
      }

      await pool.query('COMMIT');
    } catch (error: any) {
      await pool.query('ROLLBACK');
      throw new Error(error);
    }
  }

  async getAllOrderByUserId(userId: string) {
    return pool.query<OrderHistory>(`SELECT
                             order_items.price as price, 
                             order_items.quantity as quantity , 
                             (order_items.price * order_items.quantity ) as total,
                             products.name as name
                             FROM orders 
                             INNER JOIN order_items ON order_items.order_id = orders.id 
                             INNER JOIN addresses ON addresses.order_id = orders.id 
                             INNER JOIN products ON products.id = order_items.product_id
                             WHERE user_id = $1`,
    [userId]);
  }

}

export default new OrderRepo();
