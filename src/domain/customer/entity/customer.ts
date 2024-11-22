import sharedEventDispatcher from "../../@shared/event/shared-event-dispatcher";
import ChangeCustomerAddressEvent from "../event/change-customer-address.event";
import Address from "../value-object/address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }
    
    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get isActive(): boolean {
        return this._active;
    }

    get address(): Address {
        return this._address;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }
    
    changeAddress(address: Address) {
        this._address = address;
        sharedEventDispatcher.notify(new ChangeCustomerAddressEvent(this));
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    validate() {
        if (this._name == null || this._name.length === 0) {
            throw new Error("Name cannot be empty");
        }

        if (this._id == null || this._id.length === 0) {
            throw new Error("Identifier cannot be empty");
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() { 
        if (!this._address) throw Error("Address is mandatory to activate a customer");

        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

}
