import Customer from "../entity/customer";
import EventInterface from "../../@shared/event/event.interface";

export default class ChangeCustomerAddressEvent implements EventInterface<Customer> {
    dateTimeOccurred: Date;
    eventData: Customer;

    constructor(eventData: Customer) {
        this.dateTimeOccurred = new Date();
        this.eventData = eventData;
    }
}