import BaseCacheDatabase from "../../base/bd";
import { IChacheData } from "../../dtos/db.dto";

class LocalStorageCache extends BaseCacheDatabase {
    constructor() {
        super();
    }

    lenthDb() {
        return localStorage.length;
    }

    create(data: IChacheData): void {
        const { id, ...cacheData } = data;
        localStorage.setItem(id.toString(), JSON.stringify(cacheData));
    }

    delete(id: number): void {
        localStorage.removeItem(id.toString());
    }

    getValue(id: number): IChacheData | null {
        const data = localStorage.getItem(id.toString());
        if (data) {
            return JSON.parse(data);
        }

        return null;
    }
}

export default new LocalStorageCache();