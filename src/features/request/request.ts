import { IBoard } from '../../dtos/request.dto';

export default class RequestBoard {
    idBoard: string;
    BASE_URL: string;
    constructor(idboard: string, token: string, apiKey: string) {
        this.idBoard = idboard;
        this.BASE_URL = `https://api.trello.com/1/boards/${this.idBoard}/cards?key=${apiKey}&token=${token}`;
    }

    async getBoard(): Promise<IBoard[] | string> {
        try {
            const response = await fetch(this.BASE_URL).then(res => res.json());
            return response.map((card: any) => ({ name: card.name, desc: card.desc, idShort: card.idShort })).sort((a: IBoard, b: IBoard) => a.idShort - b.idShort);
        } catch (error) {
            return 'Quadro não existe';
        }
    }

}