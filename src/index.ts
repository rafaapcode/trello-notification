import MainFeature from "./features/main";
import Notify from './features/createNotification/notification';

const inputIdBoard = document.querySelector('#idBoard') as HTMLInputElement;
const tokenBoard = document.querySelector('#tokenBoard') as HTMLInputElement;
const keyBoard = document.querySelector('#keyBoard') as HTMLInputElement;
const startbutton = document.querySelector('#startBtn') as HTMLButtonElement;
const mensagem = document.querySelector('.mensagem') as HTMLParagraphElement;

Notify.verifyNotification();

startbutton.addEventListener('click', () => {
    if(!inputIdBoard.value || !tokenBoard.value || !keyBoard.value) {
        mensagem.classList.remove('hidden');
        mensagem.classList.remove('ok');
        mensagem.classList.add('error');
        mensagem.innerHTML = 'Preencha todos os campos !';
    } else {
        mensagem.classList.add('hidden');
        mensagem.classList.remove('error');
        mensagem.classList.remove('ok');
    }
    const initialize = new MainFeature(inputIdBoard.value, tokenBoard.value, keyBoard.value);
    initialize.start();
})

