import RequestBoard from "./request/request";
import hasNewCard from "./hasNewCard/hasNewCard";

export default class MainFeature {
    idBoard: string;
    constructor(idBoard: string) {
        this.idBoard = idBoard;
    }

    async start() {
        const req = new RequestBoard(this.idBoard);
        const response = await req.getBoard();
        let prevValue = response.length;
        setInterval(async () => {
            const currentBoard = await req.getBoard();
            const currentValue = currentBoard.length;
            const hasCard = hasNewCard(prevValue, currentValue);
            if (hasCard > 0) {
                const newCards = currentBoard.slice(-hasCard);
                newCards.forEach(card => console.log(card));
                prevValue = currentValue;
            }
        }, 5000);
    }
} 