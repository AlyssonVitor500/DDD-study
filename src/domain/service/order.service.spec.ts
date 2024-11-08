import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order-item"
import OrderService from "./order.service";

describe("Order service unit tests", () => {
    it("should be able to get total of all orders items", () => {
        
        const item1 = new OrderItem("I1", "item1", 100, "product1", 5);
        const item2 = new OrderItem("I2", "item2", 25, "product2", 4);

        const order1 = new Order("O1", "C1", [item1]);
        const order2 = new Order("O2", "C2", [item2]);
        const total = OrderService.total([order1, order2]);

        expect(total).toBe(600);
    });

    it("should place an order", () => {
        const customer = new Customer("C1", "Customer 1");
        const item1 = new OrderItem("I1", "Item 1", 10, "C1", 1);

        const order = OrderService.placeOrder(customer, [item1]);
        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });

})