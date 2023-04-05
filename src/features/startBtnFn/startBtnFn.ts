import MainFeature from '../main';

export function startBtnFn({ inputIdBoard, tokenBoard, keyBoard, mensagem, repo, startbutton }: any) {
    return () => {
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
        initialize.verifyRequest().then((response: any) => {
            if (response) {
                mensagem.classList.remove('hidden');
                mensagem.classList.remove('ok');
                mensagem.classList.add('error');
                mensagem.innerHTML = `${response}`;
            } else {
                repo.create({ id: 0, idBoard: inputIdBoard.value, key: keyBoard.value, token: tokenBoard.value });
                mensagem.classList.remove('hidden');
                mensagem.classList.remove('error');
                mensagem.classList.add('ok');
                mensagem.innerHTML = 'Executando ...';
                startbutton.classList.add('hidden');
            }
        });
    }
}
