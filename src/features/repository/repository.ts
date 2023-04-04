import BaseCacheDatabase from "../../base/bd";
import { IChacheData, IDb } from "../../dtos/db.dto";

export default class RepositoryDb extends BaseCacheDatabase {
    databaseCache: IDb
    constructor(databaseCache: IDb) {
        super();
        this.databaseCache = databaseCache;
    }

    create(data: IChacheData): void {
        this.databaseCache.create(data);
    }
    delete(id: string): void {
        this.databaseCache.delete(id);
    }
    getValue(id: string): IChacheData | null {
        return this.databaseCache.getValue(id);
    }
}