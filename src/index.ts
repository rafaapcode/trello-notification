import MainFeature from "./features/main";
import Notify from './features/createNotification/notification';
import RepositoryDb from "./features/repository/repository";
import LocalStorageCache from "./features/db/localStorage";

const inputIdBoard = document.querySelector('#idBoard') as HTMLInputElement;
const tokenBoard = document.querySelector('#tokenBoard') as HTMLInputElement;
const keyBoard = document.querySelector('#keyBoard') as HTMLInputElement;
const startbutton = document.querySelector('#startBtn') as HTMLButtonElement;
const stopbutton = document.querySelector('#stopBtn') as HTMLButtonElement;
const mensagem = document.querySelector('.mensagem') as HTMLParagraphElement;

Notify.verifyNotification();
const cacheRepository = new RepositoryDb(LocalStorageCache);
const isCached = cacheRepository.getValue(0);
if (isCached) {
    const { idBoard, key, token } = isCached;
    inputIdBoard.value = idBoard;
    keyBoard.value = key;
    tokenBoard.value = token;
} else {
    inputIdBoard.innerText = '';
    keyBoard.innerText = '';
    tokenBoard.innerText = '';
}

startbutton.addEventListener('click', () => {
    if (!inputIdBoard.value || !tokenBoard.value || !keyBoard.value) {
        mensagem.classList.remove('hidden');
        mensagem.classList.remove('ok');
        mensagem.classList.add('error');
        mensagem.innerHTML = 'Preencha todos os campos !';
        return;
    } else {
        mensagem.classList.add('hidden');
        mensagem.classList.remove('error');
        mensagem.classList.remove('ok');
    }
    const initialize = new MainFeature(inputIdBoard.value, tokenBoard.value, keyBoard.value);
    initialize.verifyRequest().then((response) => {
        if (response) {
            mensagem.classList.remove('hidden');
            mensagem.classList.remove('ok');
            mensagem.classList.add('error');
            mensagem.innerHTML = `${response}`;
        } else {
            cacheRepository.create({ id: 0, idBoard: inputIdBoard.value, key: keyBoard.value, token: tokenBoard.value });
            mensagem.classList.remove('hidden');
            mensagem.classList.remove('error');
            mensagem.classList.add('ok');
            mensagem.innerHTML = 'Executando ...';
            startbutton.classList.add('hidden');
        }
    });
});

stopbutton.addEventListener('click', () => {
    window.location.reload();
})

