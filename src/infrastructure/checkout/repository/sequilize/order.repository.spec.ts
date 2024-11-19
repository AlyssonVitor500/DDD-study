import { Sequelize } from "sequelize-typescript";
import OrderRepository from "./order.repository";
import CustomerModel from "../../../customer/repository/sequilize/customer.model";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequilize/product.model";
import CustomerRepository from "../../../customer/repository/sequilize/customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import ProductRepository from "../../../product/repository/sequilize/product.repository";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/order-item";
import Order from "../../../../domain/checkout/entity/order";

describe("Order repository unit tests", () => {
    
    let sequilize: Sequelize;

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequilize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequilize.sync();
    });

    afterEach(async () => {
        await sequilize.close();
    });

    it("should create a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", "City 1", 1, "Zip 1");

        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("p1", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("OI1", product.name, product.price, product.id, 2);
        const order = new Order("O1", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ 
            where: { id: order.id },
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            items: [{
                id: orderItem.id,
                name: orderItem.name,
                price: orderItem.price,
                quantity: orderItem.quantity,
                order_id: order.id,
                product_id: orderItem.productId
            }]
        })

    })

    it("should find an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", "City 1", 1, "Zip 1");

        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("p1", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("OI1", product.name, product.price, product.id, 2);
        const order = new Order("O1", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const foundOrder = await orderRepository.find(order.id);
        expect(foundOrder).toStrictEqual(order);
        
    })

    it("should throw an error when order is not found", async () => {
        const orderRepository = new OrderRepository();
        expect(async () => {
            await orderRepository.find("O1");
        }).rejects.toThrow("Order not found");
    })

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const productRepository = new ProductRepository();
        const orderRepository = new OrderRepository();

        // Creating first order
        const customer1 = new Customer("c1", "Customer 1");
        const address1 = new Address("Street 1", "City 1", 1, "Zip 1");

        customer1.changeAddress(address1);
        customer1.activate();
        await customerRepository.create(customer1);

        const product1 = new Product("p1", "Product 1", 100);
        await productRepository.create(product1);

        const orderItem1= new OrderItem("OI1", product1.name, product1.price, product1.id, 2);
        const order1 = new Order("O1", customer1.id, [orderItem1]);

        await orderRepository.create(order1);

        // Creating second order
        const customer2 = new Customer("c2", "Customer 2");
        const address2 = new Address("Street 2", "City 2", 2, "Zip 2");

        customer2.changeAddress(address2);
        customer2.activate();
        await customerRepository.create(customer2);

        const product2 = new Product("p2", "Product 2", 200);
        await productRepository.create(product2);

        const orderItem2= new OrderItem("OI2", product2.name, product2.price, product2.id, 2);
        const order2 = new Order("O2", customer2.id, [orderItem2]);

        await orderRepository.create(order2);

        const foundOrders = await orderRepository.findAll();

        const orders = [order1, order2];
        expect(foundOrders).toEqual(orders);
    })

    it("should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const productRepository = new ProductRepository();
        const orderRepository = new OrderRepository();

        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", "City 1", 1, "Zip 1");

        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);

        const product = new Product("p1", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("OI1", product.name, product.price, product.id, 2);
        const order = new Order("O1", customer.id, [orderItem]);

        await orderRepository.create(order);

        // Creating a second customer to update
        const customer2 = new Customer("c2", "Customer 2");
        const address2 = new Address("Street 2", "City 2", 2, "Zip 2");

        customer2.changeAddress(address2);
        customer2.activate();
        await customerRepository.create(customer2);

        order.changeCustomerId(customer2.id);
        await orderRepository.update(order);

        const foundOrder = await orderRepository.find(order.id);
        expect(foundOrder).toStrictEqual(order);
    })

    it("should update order item quantity", async () => {
        const customerRepository = new CustomerRepository();
        const productRepository = new ProductRepository();
        const orderRepository = new OrderRepository();
    
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", "City 1", 1, "Zip 1");
    
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);
    
        const product = new Product("p1", "Product 1", 100);
        await productRepository.create(product);
    
        const orderItem = new OrderItem("OI1", product.name, product.price, product.id, 2);
        const order = new Order("O1", customer.id, [orderItem]);
    
        await orderRepository.create(order);
    
        order.changeItemQuantity(orderItem.id, 5);
        await orderRepository.update(order);
    
        const foundOrder = await orderRepository.find(order.id);
        expect(foundOrder).toStrictEqual(order);
    })

    it("should add a new order item", async () => {
        const customerRepository = new CustomerRepository();
        const productRepository = new ProductRepository();
        const orderRepository = new OrderRepository();
    
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", "City 1", 1, "Zip 1");
    
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);
    
        const product = new Product("p1", "Product 1", 100);
        await productRepository.create(product);
    
        const orderItem = new OrderItem("OI1", product.name, product.price, product.id, 2);
        const order = new Order("O1", customer.id, [orderItem]);
    
        await orderRepository.create(order);
    
        const product2 = new Product("p2", "Product 2", 200);
        await productRepository.create(product2);
    
        const orderItem2 = new OrderItem("OI2", product2.name, product2.price, product2.id, 5);
        order.addOrderItem(orderItem2);
        await orderRepository.update(order);
    
        const foundOrder = await orderRepository.find(order.id);
        expect(foundOrder.items).toEqual(order.items);
    })
})