import Address from "../../domain/customer/value-object/address";
import Customer from "../../domain/customer/entity/customer";
import sharedEventDispatcher from "../../domain/@shared/event/shared-event-dispatcher";
import CustomerCreatedEvent from "../../domain/customer/event/customer-created.event";
import CustomerRepositoryInterface from "../../domain/customer/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {

    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            active: entity.isActive,
            rewardPoints: entity.rewardPoints,
            street: entity.address?.street,
            number: entity.address?.number,
            zip: entity.address?.zip,
            city: entity.address?.city
        })

        sharedEventDispatcher.notify(new CustomerCreatedEvent(entity));
    }
    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                name: entity.name,
                active: entity.isActive,
                rewardPoints: entity.rewardPoints,
                street: entity.address?.street,
                number: entity.address?.number,
                zip: entity.address?.zip,
                city: entity.address?.city
            },
            {
                where: {
                    id: entity.id
                }
            }
        )
    }
    async find(id: string): Promise<Customer> {
        const customerModel = await CustomerModel.findOne({
            where: {
                id
            }
        }).catch(_ => {
            throw new Error("Customer not found");
        })

        return this.transformCustomerModelToEntity(customerModel);
    }
    
    async findAll(): Promise<Array<Customer>> {
        const customerModels = await CustomerModel.findAll();

        return customerModels.map(customerModel => {
            return this.transformCustomerModelToEntity(customerModel);
        })
    }

    private transformCustomerModelToEntity(model: CustomerModel): Customer {
        const customer = new Customer(model.id, model.name);
        const address = new Address(model.street, model.city, model.number, model.zip);
        customer.changeAddress(address);
        customer.addRewardPoints(model.rewardPoints);

        if (model.active) {
            customer.activate();
        }

        return customer;
    }
}