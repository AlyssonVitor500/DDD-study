import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {

    it("should create a product type A", () => {
        const product = ProductFactory.create("a", "Product A", 1);
        expect(product.id).toBeDefined();
        expect(product.name).toEqual("Product A");
        expect(product.price).toEqual(1);
        expect(product.constructor.name).toEqual("Product");
    })

    it("should create a product type B", () => {
        const product = ProductFactory.create("b", "Product B", 1);
        expect(product.id).toBeDefined();
        expect(product.name).toEqual("Product B");
        expect(product.price).toEqual(2);
        expect(product.constructor.name).toEqual("ProductB");
    })

    it("should throw error when type is invalid", () => {
        expect(() => {
            ProductFactory.create("c", "Product C", 1);
        }).toThrow("Product type not supported");
    })

})