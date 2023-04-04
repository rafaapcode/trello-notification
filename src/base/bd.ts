import { IChacheData, IDb } from "../dtos/db.dto";

export default class BaseCacheDatabase implements IDb {
    create(data: IChacheData): void {
        throw new Error("Method not implemented.");
    }
    delete(data: string): void {
        throw new Error("Method not implemented.");
    }
    getValue(data: string): IChacheData | null {
        throw new Error("Method not implemented.");
    }
}