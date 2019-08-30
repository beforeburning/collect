export default interface Interface {
    dao: object;

    insert(tableName: string, parameters: object, callback: any): void;

    select(tableName: string, parameters: string[], callback: any): void;

    distinct(tableName: string, parameters: string, callback: any): void;
}
