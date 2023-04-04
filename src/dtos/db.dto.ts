export interface IDb {
    create(data: IChacheData): void;

    delete(data: number): void;

    getValue(data: number): IChacheData | null;

    lenthDb(): number;

}

export interface IChacheData {
    id: number;
    idBoard: string;
    token: string;
    key: string;
}