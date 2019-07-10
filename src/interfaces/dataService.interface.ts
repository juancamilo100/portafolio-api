export default interface IDataService<T> {
    getAll(): Promise<T[]>;
    get(id: string): Promise<T | null>;
    create(entity: T): Promise<T>;
    update(entity: T): Promise<T | null>;
    delete(id: string): Promise<T | null>;
}
