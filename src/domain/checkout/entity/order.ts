import OrderItem from "./order-item";

export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: Array<OrderItem> = [];

    constructor(id: string, customerId: string, items: Array<OrderItem>) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;    
    }

    get items(): Array<OrderItem> {
        return this._items;
    }

    addOrderItem(item: OrderItem): void {
        item.validate();
        this._items.push(item);
    }

    changeCustomerId(customerId: string): void {
        this._customerId = customerId;
    }

    changeItemQuantity(orderItemId: string, quantity: number): void {
        const item = this._items.find(item => item.id === orderItemId);
        if (!item) {
            throw new Error("Item not found");
        }
        item.changeQuantity(quantity);
    }

    validate() {
        if (this._id == null || this._id.length === 0) {
            throw new Error("Identifier cannot be empty");
        }

        if (this._customerId == null || this._customerId.length === 0) {
            throw new Error("Customer identifier cannot be empty");
        }

        if (this._items == null || this._items.length === 0) {
            throw new Error("Item quantity my be greater than zero");
        }

        if (this._items.some(item => item.quantity < 0)) {
            throw new Error("Item quantity must be greater or equal zero");
        }
    }

    total(): number {
        return this._items.reduce((sum, item) => sum + item.orderItemTotal, 0);
    }
}