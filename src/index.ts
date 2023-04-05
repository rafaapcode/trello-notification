import MainFeature from "./features/main";
import Notify from './features/createNotification/notification';
import RepositoryDb from "./features/repository/repository";
import LocalStorageCache from "./features/db/localStorage";
import { startBtnFn } from './features/startBtnFn/startBtnFn';

const inputIdBoard = document.querySelector('#idBoard') as HTMLInputElement;
const tokenBoard = document.querySelector('#tokenBoard') as HTMLInputElement;
const keyBoard = document.querySelector('#keyBoard') as HTMLInputElement;
const startbutton = document.querySelector('#startBtn') as HTMLButtonElement;
const stopbutton = document.querySelector('#stopBtn') as HTMLButtonElement;
const mensagem = document.querySelector('.mensagem') as HTMLParagraphElement;

Notify.verifyNotification();
MainFeature.getCredentials({ inputIdBoard, tokenBoard, keyBoard });

startbutton.addEventListener('click', startBtnFn({ inputIdBoard, tokenBoard, keyBoard, mensagem, startbutton, repo: new RepositoryDb(LocalStorageCache) }));

stopbutton.addEventListener('click', () => {
    window.location.reload();
})
