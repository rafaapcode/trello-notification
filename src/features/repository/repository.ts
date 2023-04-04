import BaseCacheDatabase from "../../base/bd";
import { IChacheData, IDb } from "../../dtos/db.dto";

export default class RepositoryDb extends BaseCacheDatabase {
    databaseCache: IDb
    constructor(databaseCache: IDb) {
        super();
        this.databaseCache = databaseCache;
    }

    lenthDb(): number {
        return this.databaseCache.lenthDb();
    }

    create(data: IChacheData): void {
        this.databaseCache.create(data);
    }
    delete(id: number): void {
        this.databaseCache.delete(id);
    }
    getValue(id: number): IChacheData | null {
        return this.databaseCache.getValue(id);
    }
}