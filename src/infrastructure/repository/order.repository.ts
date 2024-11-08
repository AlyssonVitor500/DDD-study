import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order-item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            "customer_id": entity.customerId,
            items:  entity.items.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity
                } as OrderItemModel
            })
        }, 
        {
            include: [{ model: OrderItemModel }]
        });
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update({
                customer_id: entity.customerId,
            },
            {
                where: {
                    id: entity.id
                }
            }
        );

        const persistedOrderItems = await OrderItemModel.findAll({
            where: {
                order_id: entity.id
            }
        });

        persistedOrderItems.forEach(async persistedOrderItem => {
            const orderItemToUpdate = entity.items.find(orderItem => orderItem.id === persistedOrderItem.id);

            if (orderItemToUpdate) {
                await persistedOrderItem.update({
                    name: orderItemToUpdate.name,
                    price: orderItemToUpdate.price,
                    product_id: orderItemToUpdate.productId,
                    quantity: orderItemToUpdate.quantity,
                });
            }   
        });

        entity.items.filter(item => !persistedOrderItems.find(persistedOrderItem => persistedOrderItem.id === item.id))
            .forEach(async item => {
                await OrderItemModel.create({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                    order_id: entity.id
                });
            });
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({
            where: { id },
            include: ["items"]
        }).catch(_ => {
            throw new Error("Order not found");
        });
        
        return this.transformOrderModelToEntity(orderModel);
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({
            include: ["items"]
        });

        return orderModels.map(orderModel => this.transformOrderModelToEntity(orderModel));
    }

    private transformOrderModelToEntity(model: OrderModel): Order {
        const orderItems = model.items.map(item => {
            return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
        });

        return new Order(model.id, model.customer_id, orderItems);
    }

}