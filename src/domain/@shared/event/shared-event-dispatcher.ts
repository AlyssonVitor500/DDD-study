import ChangeCustomerAddressHandler from "../../customer/event/handler/change-customer-address.handler";
import SendConsoleLog2Handler from "../../customer/event/handler/send-console-log1.handler";
import SendConsoleLog1Handler from "../../customer/event/handler/send-console-log2.handler";
import EventDispatcher from "./event-dispatcher";

const sharedEventDispatcher = new EventDispatcher();

const eventHandlerConsole1 = new SendConsoleLog1Handler();
const eventHandlerConsole2 = new SendConsoleLog2Handler();

sharedEventDispatcher.register("CustomerCreatedEvent", eventHandlerConsole1);
sharedEventDispatcher.register("CustomerCreatedEvent", eventHandlerConsole2);

const eventChangeCustomerAddress = new ChangeCustomerAddressHandler();

sharedEventDispatcher.register("ChangeCustomerAddressEvent", eventChangeCustomerAddress);

export default sharedEventDispatcher;