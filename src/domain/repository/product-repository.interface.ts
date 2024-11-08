import Product from "../entity/product";
import RepositoryIterface from "./repository-interface";

export default interface ProductRepositoryInterface 
    extends RepositoryIterface<Product> {  }