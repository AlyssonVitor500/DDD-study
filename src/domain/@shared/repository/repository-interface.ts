export default interface RepositoryIterface<T> {

    create(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
    find(id: string): Promise<T>;
    findAll(): Promise<Array<T>>;

}