import EventHandlerInterface from "../../@shared/event-handler.interface";
import ChangeCustomerAddressEvent from "../change-customer-address.event";

export default class ChangeCustomerAddressHandler implements EventHandlerInterface<ChangeCustomerAddressEvent> {
    handle(event: ChangeCustomerAddressEvent): void {
        const { eventData: { name, id, address } } = event;
        const formattedAddress = address.street + ", " + address.number + " - " + address.city + " - " + address.zip;
        console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${formattedAddress}`);
    }
}