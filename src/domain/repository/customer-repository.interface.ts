import Customer from "../entity/customer";
import RepositoryIterface from "./repository-interface";

export default interface CustomerRepositoryInterface 
    extends RepositoryIterface<Customer> {  }