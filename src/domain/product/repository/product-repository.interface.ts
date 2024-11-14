import Product from "../entity/product";
import RepositoryIterface from "../../@shared/repository/repository-interface";

export default interface ProductRepositoryInterface 
    extends RepositoryIterface<Product> {  }