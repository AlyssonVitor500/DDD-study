import Product from "../entity/product";
import ProductB from "../entity/product-b";
import ProductInterface from "../entity/product.interface";
import { randomUUID as uuid } from 'crypto'

export default class ProductFactory {
    public static create(type: string, name: string, price: number): ProductInterface {
        switch (type) {
            case "a":
                return new Product(uuid(), name, price);
            case "b":
                return new ProductB(uuid(), name, price);
        }

        throw new Error("Product type not supported");
    }
}