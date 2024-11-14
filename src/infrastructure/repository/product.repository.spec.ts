import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequelize/model/product.model";
import Product from "../../domain/product/entity/product";
import ProductRepository from "./product.repository";

describe("Product repository unit tests", () => {

    let sequilize: Sequelize;
    
    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequilize.addModels([ProductModel]);
        await sequilize.sync();

    });
    
    afterEach(async () => {
        await sequilize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);
        const productModel = await ProductModel.findOne({ where: { id: "1" } });

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100
        })
    })

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);
        const productModel = await ProductModel.findOne({ where: { id: "1" } });

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100
        })

        product.changeName("Product 2");
        product.changePrice(200);

        await productRepository.update(product);
        const productUpdatedModel = await ProductModel.findOne({ where: { id: "1" } });

        expect(productUpdatedModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 2",
            price: 200
        })
    })

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);
        const productModel = await ProductModel.findOne({ where: { id: "1" } });
        const productFound = await productRepository.find(productModel.id);

        expect(productModel.toJSON()).toStrictEqual({
            id: productFound.id,
            name: productFound.name,
            price: productFound.price
        });
    })

    it("should find all products", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        const product2 = new Product("2", "Product 2", 200);

        await productRepository.create(product);
        await productRepository.create(product2);

        const foundProducts = await productRepository.findAll();
        const products = [product, product2];
        
        expect(foundProducts).toEqual(products);
    })

})