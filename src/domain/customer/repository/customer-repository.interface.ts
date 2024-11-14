import Customer from "../entity/customer";
import RepositoryIterface from "../../@shared/repository/repository-interface";

export default interface CustomerRepositoryInterface 
    extends RepositoryIterface<Customer> {  }