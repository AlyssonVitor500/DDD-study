import { InferAttributes } from "sequelize";
import { BelongsTo, Column, Model, ForeignKey, PrimaryKey, Table, HasMany } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import OrderItemModel from "./order-item.model";

@Table({
    tableName: "orders",
    timestamps: false,
})
export default class OrderModel extends Model<InferAttributes<OrderModel>> {

    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => CustomerModel)
    @Column({ allowNull: false })
    declare customer_id: string;

    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel
    
    @HasMany(() => OrderItemModel)
    declare items: Array<OrderItemModel>;
}