import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import { randomUUID as uuid } from 'crypto';

export interface OrderFactoryProps {
    id?: string,
    customerId: string,
    items: Array<{
        id?: string,
        name: string,
        productId: string,
        quantity: number,
        price: number,
    }>
}

export default class OrderFactory {
    
    static create(props: OrderFactoryProps): Order {
        const orderItems = props.items.map(item => {
            return new OrderItem(
                item.id ?? uuid(), 
                item.name, 
                item.price, 
                item.productId, 
                item.quantity);
        })
        return new Order(props.id ?? uuid(), props.customerId, orderItems);
    }
}