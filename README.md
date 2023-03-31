# Trello Notification

## Sobre 
- A ideia desse projeto surgiu quando eu estava estagiando. Recebíamos os chamados pelo Trello, porém muitas vezes não percebia que tinha chamado pois estava fazendo outras atividades, foi então que percebi que se tivessemos como fazer uma forma do trello nos notificar, não precisariamos ficar observando ele a todo momento.

## Tecnología 
- Typescript
- HTML
- CSS

## Como Usar
- Primeiro instale as dependências, usando o ````npm install```
- Após isso faça a compilação do typescript, usando o```npm run build```
- Pronto, agora só abra o arquivo HTML e preencha os campos com o ID do Quadro, Token e KEY do seu trello.

## Como pegar o TOKEN e KEY
- Acesse a tela de ADM de Power-Up através desse link : https://trello.com/power-ups/admin/
- Crie um novo Power-Up ( não precisa adicionar nada no campo : URL de conector iframe )
- Após isso acesse a tela de ADM de Power-Up novamente e selecione o seu Power-Up criado.
- No menu, selecione CHAVE DE API e você terá acesso tanto a sua API_KEY e o seu TOKEN.
    

## Pegando ID do Quadro (Board)