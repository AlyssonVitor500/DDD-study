import Product from "./product";

describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            new Product("", "Product 1", 100);
        }).toThrow("Identifier cannot be empty");
    })

    it("should throw error when name is empty", () => {
        expect(() => {
            new Product("123", "", 100);
        }).toThrow("Name cannot be empty");
    })

    it("should throw error when price isn't greater or equal zero", () => {
        expect(() => {
            new Product("123", "Product 1", -1);
        }).toThrow("Price must be greater or equal zero");
    })

    it("should change name", () => {
        const product = new Product("123", "Product 1", 100);
        product.changeName("Product 2");

        expect(product.name).toEqual("Product 2");
    })

    it("should change price", () => {
        const product = new Product("123", "Product 1", 100);
        product.changePrice(200);

        expect(product.price).toEqual(200);
    })

})