import MainFeature from "./features/main";
import Notify from './features/createNotification/notification';

const inputIdBoard = document.querySelector('#idBoard') as HTMLInputElement;
const tokenBoard = document.querySelector('#tokenBoard') as HTMLInputElement;
const keyBoard = document.querySelector('#keyBoard') as HTMLInputElement;
const startbutton = document.querySelector('#startBtn') as HTMLButtonElement;
const erro = document.querySelector('.error') as HTMLParagraphElement;

Notify.verifyNotification();

startbutton.addEventListener('click', () => {
    if(!inputIdBoard.value || !tokenBoard.value || !keyBoard.value) {
        erro.classList.remove('hidden');
        erro.innerHTML = 'Preencha todos os campos !';
    } else {
        erro.classList.add('hidden');
    }
    const initialize = new MainFeature(inputIdBoard.value, tokenBoard.value, keyBoard.value);
    initialize.start();
})

