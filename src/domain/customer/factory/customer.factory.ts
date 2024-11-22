import Customer from "../entity/customer";
import { randomUUID as uuid } from 'crypto';
import Address from "../value-object/address";

export default class CustomerFactory {
    static create(name: string): Customer {
        return new Customer(uuid(), name);
    }

    static createWithAddress(name: string, address: Address) {
        const customer = new Customer(uuid(), name);
        customer.changeAddress(address);
        return customer;
    }
}