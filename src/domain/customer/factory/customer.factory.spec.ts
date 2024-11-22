import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
    
    it("should create a customer", () => {
        const customer = CustomerFactory.create("John Doe");
        expect(customer.id).toBeDefined();
        expect(customer.name).toEqual("John Doe");
        expect(customer.address).toBeUndefined();
        expect(customer.constructor.name).toEqual("Customer");
    });

    it("should create a customer with address", () => {
        const address = new Address("Street 1", "City 1", 123, "123456789");   
        const customer = CustomerFactory.createWithAddress("John Doe", address);
        expect(customer.id).toBeDefined();
        expect(customer.name).toEqual("John Doe");
        expect(customer.address).toBe(address);
        expect(customer.constructor.name).toEqual("Customer");
    });

})