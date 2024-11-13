import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

interface EventHandlerManagementInterface {
    [eventName: string]: EventHandlerInterface[]
}

export default class EventDispatcher implements EventDispatcherInterface {

    private eventHandlers: EventHandlerManagementInterface = {};

    get getEventHandlers(): EventHandlerManagementInterface {
        return this.eventHandlers;
    }

    register(eventName: string, eventHandler: EventHandlerInterface): void {
        if (!this.eventHandlers[eventName]){
            this.eventHandlers[eventName] = [];
        }

        this.eventHandlers[eventName].push(eventHandler);
    }
    
    unregister(eventName: string, eventHandler: EventHandlerInterface): void {
        const eventHandlerValue = this.eventHandlers[eventName];

        if (!eventHandlerValue) return;

        const index = eventHandlerValue.findIndex(eventHandlerToFind => {
            return eventHandlerToFind === eventHandler;
        });

        if (index == -1) return;
        
        eventHandlerValue.splice(index, 1);
    }

    unregisterAll(): void {
        this.eventHandlers = {};
    }

    notify(event: EventInterface): void {
        const eventName = event.constructor.name;

        if (this.eventHandlers[eventName]) {
            this.eventHandlers[eventName].forEach((eventHandler: EventHandlerInterface) => {
                eventHandler.handle(event);
            })
        }
    }
}