"use strict";
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/features/request/request.ts
var RequestBoard = class {
  constructor(idboard, token, apiKey) {
    this.idBoard = idboard;
    this.BASE_URL = `https://api.trello.com/1/boards/${this.idBoard}/cards?key=${apiKey}&token=${token}`;
  }
  getBoard() {
    return __async(this, null, function* () {
      try {
        const response = yield fetch(this.BASE_URL).then((res) => res.json());
        return response.map((card) => ({ name: card.name, desc: card.desc, idShort: card.idShort })).sort((a, b) => a.idShort - b.idShort);
      } catch (error) {
        return "Quadro n\xE3o existe";
      }
    });
  }
};

// src/features/hasNewCard/hasNewCard.ts
function hasNewCard(preValue, currentValue) {
  return currentValue - preValue;
}

// src/features/main.ts
var MainFeature = class {
  constructor(idBoard, token, apiKey) {
    this.idBoard = idBoard;
    this.token = token;
    this.api_key = apiKey;
  }
  start(stop = false) {
    return __async(this, null, function* () {
      if (!stop) {
        const req = new RequestBoard(this.idBoard, this.token, this.api_key);
        const response = yield req.getBoard();
        if (Array.isArray(response)) {
          let prevValue = response.length;
          setInterval(() => __async(this, null, function* () {
            const currentBoard = yield req.getBoard();
            if (Array.isArray(currentBoard)) {
              const currentValue = currentBoard.length;
              const hasCard = hasNewCard(prevValue, currentValue);
              if (hasCard > 0) {
                const newCards = currentBoard.slice(-hasCard);
                newCards.forEach((card) => console.log(card));
                prevValue = currentValue;
              }
            }
          }), 5e3);
        } else {
          return response;
        }
      } else {
        return;
      }
    });
  }
};

// src/index.ts
var inputIdBoard = document.querySelector("#idBoard");
var tokenBoard = document.querySelector("#tokenBoard");
var keyBoard = document.querySelector("#keyBoard");
var startbutton = document.querySelector("#startBtn");
startbutton.addEventListener("click", () => {
  const initialize = new MainFeature(inputIdBoard.value, tokenBoard.value, keyBoard.value);
  initialize.start();
});
