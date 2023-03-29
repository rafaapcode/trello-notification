import RequestBoard from "./request/request";

export default class MainFeature {
    idBoard: string;
    constructor(idBoard: string) {
        this.idBoard = idBoard;
    }

    async start() {
        const req = new RequestBoard(this.idBoard);
        const response = await req.getBoard();
        console.log(response);
    }
} 