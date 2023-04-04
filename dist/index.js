"use strict";
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
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

// src/features/createNotification/notification.ts
var Notify = class {
  constructor(name) {
    this.name = name;
  }
  notification() {
    new Notification(this.name);
  }
  static verifyNotification() {
    if ("Notification" in window) {
      if (Notification.permission === "denied") {
        alert("Voc\xEA precisa habilitar as notifica\xE7\xF5es");
      } else if (Notification.permission === "default") {
        Notification.requestPermission().then((res) => {
          if (res === "denied") {
            alert("Voc\xEA precisa habilitar as notifica\xE7\xF5es");
          }
        });
      }
    } else {
      alert("Seu nabegador n\xE3o suporta notifica\xE7\xF5es.");
    }
  }
};

// src/features/main.ts
var MainFeature = class {
  constructor(idBoard, token, apiKey) {
    this.idBoard = idBoard;
    this.token = token;
    this.api_key = apiKey;
  }
  start() {
    return __async(this, null, function* () {
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
              newCards.forEach((card) => {
                const notify = new Notify(card.name);
                notify.notification();
              });
              prevValue = currentValue;
            } else if (hasCard < 0) {
              prevValue = currentValue;
            }
          }
        }), 5e3);
      } else {
        return response;
      }
    });
  }
  verifyRequest() {
    return __async(this, null, function* () {
      const response = this.start();
      if (!Array.isArray(response)) {
        return response;
      }
      return false;
    });
  }
};

// src/base/bd.ts
var BaseCacheDatabase = class {
  lenthDb() {
    throw new Error("Method not implemented.");
  }
  create(data) {
    throw new Error("Method not implemented.");
  }
  delete(data) {
    throw new Error("Method not implemented.");
  }
  getValue(data) {
    throw new Error("Method not implemented.");
  }
};

// src/features/repository/repository.ts
var RepositoryDb = class extends BaseCacheDatabase {
  constructor(databaseCache) {
    super();
    this.databaseCache = databaseCache;
  }
  lenthDb() {
    return this.databaseCache.lenthDb();
  }
  create(data) {
    this.databaseCache.create(data);
  }
  delete(id) {
    this.databaseCache.delete(id);
  }
  getValue(id) {
    return this.databaseCache.getValue(id);
  }
};

// src/features/db/localStorage.ts
var LocalStorageCache = class extends BaseCacheDatabase {
  constructor() {
    super();
  }
  lenthDb() {
    return localStorage.length;
  }
  create(data) {
    const _a = data, { id } = _a, cacheData = __objRest(_a, ["id"]);
    localStorage.setItem(id.toString(), JSON.stringify(cacheData));
  }
  delete(id) {
    localStorage.removeItem(id.toString());
  }
  getValue(id) {
    const data = localStorage.getItem(id.toString());
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }
};
var localStorage_default = new LocalStorageCache();

// src/index.ts
var inputIdBoard = document.querySelector("#idBoard");
var tokenBoard = document.querySelector("#tokenBoard");
var keyBoard = document.querySelector("#keyBoard");
var startbutton = document.querySelector("#startBtn");
var stopbutton = document.querySelector("#stopBtn");
var mensagem = document.querySelector(".mensagem");
Notify.verifyNotification();
var cacheRepository = new RepositoryDb(localStorage_default);
var isCached = cacheRepository.getValue(0);
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
startbutton.addEventListener("click", () => {
  if (!inputIdBoard.value || !tokenBoard.value || !keyBoard.value) {
    mensagem.classList.remove("hidden");
    mensagem.classList.remove("ok");
    mensagem.classList.add("error");
    mensagem.innerHTML = "Preencha todos os campos !";
    return;
  } else {
    mensagem.classList.add("hidden");
    mensagem.classList.remove("error");
    mensagem.classList.remove("ok");
  }
  const initialize = new MainFeature(inputIdBoard.value, tokenBoard.value, keyBoard.value);
  initialize.verifyRequest().then((response) => {
    if (response) {
      mensagem.classList.remove("hidden");
      mensagem.classList.remove("ok");
      mensagem.classList.add("error");
      mensagem.innerHTML = `${response}`;
    } else {
      cacheRepository.create({ id: 0, idBoard: inputIdBoard.value, key: keyBoard.value, token: tokenBoard.value });
      mensagem.classList.remove("hidden");
      mensagem.classList.remove("error");
      mensagem.classList.add("ok");
      mensagem.innerHTML = "Executando ...";
      startbutton.classList.add("hidden");
    }
  });
});
stopbutton.addEventListener("click", () => {
  window.location.reload();
});
