import MainFeature from "./features/main";
import Notify from './features/createNotification/notification';

const inputIdBoard = document.querySelector('#idBoard') as HTMLInputElement;
const tokenBoard = document.querySelector('#tokenBoard') as HTMLInputElement;
const keyBoard = document.querySelector('#keyBoard') as HTMLInputElement;
const startbutton = document.querySelector('#startBtn') as HTMLButtonElement;

Notify.verifyNotification();

startbutton.addEventListener('click', () => {
    const initialize = new MainFeature(inputIdBoard.value, tokenBoard.value, keyBoard.value);
    initialize.start();
})

