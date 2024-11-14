import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/customer/entity/customer";
import Address from "../../domain/customer/value-object/address";

describe("Customer repository unit tests", () => {
    
    let sequilize: Sequelize;

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequilize.addModels([CustomerModel]);
        await sequilize.sync();
    });

    afterEach(async () => {
        await sequilize.close();
    });

    it ("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", "City 1", 1, "Zip 1");

        customer.changeAddress(address);
        customer.activate();

        await customerRepository.create(customer);
        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Customer 1",
            active: true,
            rewardPoints: 0,
            street: "Street 1",
            number: 1,
            zip: "Zip 1",
            city: "City 1"
        })
    })

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", "City 1", 1, "Zip 1");

        customer.changeAddress(address);
        customer.activate();

        await customerRepository.create(customer);
        customer.changeName("Customer 2");
        customer.addRewardPoints(15);
        customer.deactivate();
        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });
        
        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Customer 2",
            active: false,
            rewardPoints: 15,
            street: "Street 1",
            number: 1,
            zip: "Zip 1",
            city: "City 1"
        })
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", "City 1", 1, "Zip 1");

        customer.changeAddress(address);
        customer.activate();

        await customerRepository.create(customer);

        const customerResult = await customerRepository.find("1");
        expect(customerResult).toStrictEqual(customer);
    });

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", "City 1", 1, "Zip 1");

        customer.changeAddress(address);
        customer.activate();

        const customer2 = new Customer("2", "Customer 2");
        const address2 = new Address("Street 2", "City 2", 2, "Zip 2");

        customer2.changeAddress(address2);
        customer2.activate();

        await customerRepository.create(customer);
        await customerRepository.create(customer2);

        const findCustomers = await customerRepository.findAll();
        const customers = [customer, customer2];
        expect(findCustomers).toEqual(customers);
    })

    it("should thrown an error when customer not found", async () => {
        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find("1");
        }).rejects.toThrow("Customer not found");
    })

})