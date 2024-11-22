import { randomUUID as uuid } from 'crypto'
import OrderFactory, { OrderFactoryProps } from './order.factory';

describe("Order factory unit test", () => {

    it("should create an order", () => {
        const orderProps: OrderFactoryProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    name: "Item 1",
                    productId: uuid(),
                    quantity: 1,
                    price: 100
                },
            ],
        };

        const order = OrderFactory.create(orderProps);

        expect(order.id).toBe(orderProps.id);
        expect(order.customerId).toBe(orderProps.customerId);
        expect(order.items).toHaveLength(1);
    });

    it("should create an order with random ids", () => {
        const orderProps: OrderFactoryProps = {
            customerId: uuid(),
            items: [
                {
                    name: "Item 1",
                    productId: uuid(),
                    quantity: 1,
                    price: 100
                },
            ],
        };

        const order = OrderFactory.create(orderProps);

        expect(order.id).toBeDefined();
        expect(order.customerId).toBe(orderProps.customerId);
        expect(order.items).toHaveLength(1);
        expect(order.items[0].id).toBeDefined();
    })

})