export interface IDb {
    create(data: IChacheData): void;

    delete(data: string): void;

    getValue(data: string): IChacheData | null;

}

export interface IChacheData {
    idBoard: string;
    token: string;
    key: string;
}