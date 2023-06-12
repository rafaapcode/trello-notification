import RequestBoard from "./request/request";
import hasNewCard from "./hasNewCard/hasNewCard";
import Notify from "./createNotification/notification";
import RepositoryDb from "./repository/repository";
import LocalStorageCache from "../features/db/localStorage";
import { IFields } from "../dtos/db.dto";

export default class MainFeature {
  idBoard: string;
  token: string;
  api_key: string;
  constructor(idBoard: string, token: string, apiKey: string) {
    this.idBoard = idBoard;
    this.token = token;
    this.api_key = apiKey;
  }

  async start() {
    const req = new RequestBoard(this.idBoard, this.token, this.api_key);
    try {
      const response = await req.getBoard();
      if (Array.isArray(response)) {
        let prevValue = response.length;
        const currentValue = response.length;
        const hasCard = hasNewCard(prevValue, currentValue);
        if (hasCard > 0) {
          const newCards = response.slice(-hasCard);
          newCards.forEach((card) => {
            const notify = new Notify(card.name);
            notify.notification();
          });
          prevValue = currentValue;
        } else if (hasCard < 0) {
          prevValue = currentValue;
        }
      } else {
        return response;
      }
    } catch (err) {
      return err;
    } finally {
      setTimeout(this.start, 100);
    }
  }

  async verifyRequest() {
    const response = this.start();
    if (!Array.isArray(response)) {
      return response;
    }
    return false;
  }

  static getCredentials({ inputIdBoard, keyBoard, tokenBoard }: IFields) {
    const cacheRepository = new RepositoryDb(LocalStorageCache);
    const isCached = cacheRepository.getValue(0);
    if (isCached) {
      const { idBoard, key, token } = isCached;
      inputIdBoard.value = idBoard;
      keyBoard.value = key;
      tokenBoard.value = token;
    } else {
      inputIdBoard.innerText = "";
      keyBoard.innerText = "";
      tokenBoard.innerText = "";
    }
  }
}
