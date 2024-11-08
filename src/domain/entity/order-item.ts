export default class OrderItem {
    private _id: string;
    private _productId: string;
    private _name: string;
    private _price: number;
    private _quantity: number;

    constructor(id: string, name: string, price: number, productId: string, quantity: number ) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = productId;
        this._quantity = quantity;
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get productId(): string {
        return this._productId;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    get orderItemTotal(): number {
        return this._price * this._quantity;
    }

    get quantity(): number {
        return this._quantity;
    }

    changeQuantity(quantity: number) {
        this._quantity = quantity;
        this.validate();
    }

    validate() {
        if (this._id == null || this._id.length === 0) {
            throw new Error("Identifier cannot be empty");
        }

        if (this._name == null || this._name.length === 0) {
            throw new Error("Name cannot be empty");
        }

        if (this._price == null || this._price <= 0) {
            throw new Error("Price must be greater or equal zero");
        }

        if (this._quantity == null || this._quantity < 0) {
            throw new Error("Quantity must be greater or equal zero");
        }
    }


}