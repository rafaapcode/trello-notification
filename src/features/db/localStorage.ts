import BaseCacheDatabase from "../../base/bd";
import { IChacheData } from "../../dtos/db.dto";

class LocalStorage extends BaseCacheDatabase {
    constructor() {
        super();
    }

    create(data: IChacheData): void {
        const { idBoard, ...cacheData } = data;
        localStorage.setItem(idBoard, JSON.stringify(cacheData));
    }

    delete(id: string): void {
        localStorage.removeItem(id);
    }

    getValue(id: string): IChacheData | null{
        const data = localStorage.getItem(id);
        if(data) {
            return JSON.parse(data);
        }

        return null;
    }
}

export default new LocalStorage();