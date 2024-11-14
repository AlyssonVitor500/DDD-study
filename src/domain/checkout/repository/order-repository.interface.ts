import Order from "../entity/order";
import RepositoryIterface from "../../@shared/repository/repository-interface";

export default interface OrderRepositoryInterface 
    extends RepositoryIterface<Order> {  }