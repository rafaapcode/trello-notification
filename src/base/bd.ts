import { IChacheData, IDb } from "../dtos/db.dto";

export default class BaseCacheDatabase implements IDb {
    lenthDb(): number {
        throw new Error("Method not implemented.");
    }

    create(data: IChacheData): void {
        throw new Error("Method not implemented.");
    }
    delete(data: number): void {
        throw new Error("Method not implemented.");
    }
    getValue(data: number): IChacheData | null {
        throw new Error("Method not implemented.");
    }
}