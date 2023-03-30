import RequestBoard from "./request/request";
import hasNewCard from "./hasNewCard/hasNewCard";

export default class MainFeature {
    idBoard: string;
    token: string;
    api_key: string;
    constructor(idBoard: string, token: string, apiKey: string) {
        this.idBoard = idBoard;
        this.token = token;
        this.api_key = apiKey;
    }

    async start(stop: boolean = false) {
        if (!stop) {
            const req = new RequestBoard(this.idBoard, this.token, this.api_key);
            const response = await req.getBoard();
            if (Array.isArray(response)) {
                let prevValue = response.length;
                setInterval(async () => {
                    const currentBoard = await req.getBoard();
                    if (Array.isArray(currentBoard)) {
                        const currentValue = currentBoard.length;
                        const hasCard = hasNewCard(prevValue, currentValue);
                        if (hasCard > 0) {
                            const newCards = currentBoard.slice(-hasCard);
                            newCards.forEach(card => console.log(card));
                            prevValue = currentValue;
                        }
                    }
                }, 5000);
            } else {
                return response;
            }
        } else {
            return;
        }
    }
}