import BaseCacheDatabase from "../../base/bd";
import { IChacheData } from "../../dtos/db.dto";

class DbInMemory extends BaseCacheDatabase {
    private database: IChacheData[] = [];
    constructor() {
        super();
    }

    lenthDb(): number {
        return this.database.length;
    }

    clear(): void {
        this.database = [];
    }


    create(data: IChacheData): void {
        this.database.push(data);
    }

    delete(id: number): void {
        const index = this.database.findIndex(data => Number(data.id) === id);
        this.database.splice(index, 1);
    }

    getValue(id: number): IChacheData | null {
        const index =  this.database.findIndex(data => Number(data.id) === id);
        if(index === -1) {
            return null;
        }
        return this.database[index];
    }
}

export default new DbInMemory();