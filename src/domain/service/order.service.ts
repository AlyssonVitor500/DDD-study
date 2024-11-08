import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import { randomUUID as uuid } from 'crypto'

export default class OrderService {

    static total(orders: Array<Order>) {
        return orders.reduce((sum, order) => sum + order.total(), 0);
    }

    static placeOrder(customer: Customer, items: Array<OrderItem>): Order {
        if (items.length === 0) {
            throw new Error("Order must have at least one item");
        }

        const order = new Order(uuid(), customer.id, items);
        customer.addRewardPoints(order.total() / 2);
        return order;
    }

}