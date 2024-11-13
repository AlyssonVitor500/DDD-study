import Address from "../../entity/address";
import Customer from "../../entity/customer";
import EventDispatcher from "../@shared/event-dispatcher";
import ChangeCustomerAddressEvent from "./change-customer-address.event";
import CustomerCreatedEvent from "./customer-created.event";
import ChangeCustomerAddressHandler from "./handler/change-customer-address.handler";
import SendConsoleLog2Handler from "./handler/send-console-log1.handler";
import SendConsoleLog1Handler from "./handler/send-console-log2.handler";

describe("Customer created event tests", () => {
    it("should call all customers created event", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandlerConsole1 = new SendConsoleLog1Handler();
        const eventHandlerConsole2 = new SendConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandlerConsole1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandlerConsole2);

        const spyEventHandler1 = jest.spyOn(eventHandlerConsole1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandlerConsole2, "handle");

        const customer = new Customer("123", "John Doe");
        const event = new CustomerCreatedEvent(customer);
        expect(event.eventData).toBe(customer);

        eventDispatcher.notify(event);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    })

    it("should call change customer address event", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new ChangeCustomerAddressHandler();

        eventDispatcher.register("ChangeCustomerAddressEvent", eventHandler);

        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        const customer = new Customer("123", "John Doe");
        const address = new Address("Street 1", "City 1", 123, "123456789");
        customer.changeAddress(address);

        const event = new ChangeCustomerAddressEvent(customer);
        expect(event.eventData).toBe(customer);

        eventDispatcher.notify(event);

        expect(spyEventHandler).toHaveBeenCalled();
    })
})