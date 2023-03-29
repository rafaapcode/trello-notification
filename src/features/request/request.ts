import dotenv from 'dotenv';
import { IBoard } from '../../dtos/request.dto';
dotenv.config();

export default class RequestBoard {
    idBoard: string;
    BASE_URL: string;
    constructor(idboard: string) {
        this.idBoard = idboard;
        this.BASE_URL = `https://api.trello.com/1/boards/${this.idBoard}/cards?key=${process.env.API_KEY}&token=${process.env.TOKEN}`;
    }

    async getBoard(): Promise<IBoard[]> {
        const response = await fetch(this.BASE_URL).then(res => res.json());
        return response.map((card: any) => ({ name: card.name, desc: card.desc, idShort: card.idShort })).sort((a: IBoard, b: IBoard) => a.idShort - b.idShort);
    }

}