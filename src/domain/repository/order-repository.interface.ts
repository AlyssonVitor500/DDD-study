import Order from "../entity/order";
import RepositoryIterface from "./repository-interface";

export default interface OrderRepositoryInterface 
    extends RepositoryIterface<Order> {  }