import Order from "./order";
import OrderItem from "./order-item";

describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            new Order("", "123", []);
        }).toThrow("Identifier cannot be empty");
    })

    it("should throw error when customer identifier is empty", () => {
        expect(() => {
            new Order("123", "", []);
        }).toThrow("Customer identifier cannot be empty");
    })
    
    it("should throw error when item quantity is less than one", () => {
        expect(() => {
            new Order("123", "123", []);
        }).toThrow("Item quantity my be greater than zero");
    })

    it("should calculate total", () => {
        const valueItem1 = 10;
        const valueItem2 = 25;
        const valueItem3 = 98;

        const realTotal = (valueItem1) + (valueItem2 * 3) + (valueItem3 * 4);

        const item1 = new OrderItem("1", "Item 1", valueItem1, "123", 1);
        const item2 = new OrderItem("2", "Item 2", valueItem2, "123", 3);
        const item3 = new OrderItem("3", "Item 3", valueItem3, "123", 4);

        const order = new Order("123", "123", [item1, item2, item3]);
        expect(order.total()).toBe(realTotal);
    })

    it("should throw error if the item quantity is greater than zero", () => {
        expect(() => {
            const item1 = new OrderItem("1", "Item 1", 200, "123", -15);
            new Order("123", "123", [item1]);
        }).toThrow("Quantity must be greater or equal zero");
    })

    it("should change order item quantity", () => {
        const item1 = new OrderItem("OI1", "Item 1", 200, "123", 15);
        const order = new Order("123", "123", [item1]);
        order.changeItemQuantity("OI1", 5);
        expect(order.items[0].quantity).toBe(5);
    })
    
})