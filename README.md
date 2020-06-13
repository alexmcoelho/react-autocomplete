# react-autocomplete

## Resumo
Autocomplete que permite pesquisar o registro pelo código ou pelo nome. Para chegar a esse resultado foi utilizado a dependência *react-autosuggest* com algumas personalizações.

![Alt text](/screenshots/screenshot_01.png?raw=true "Ilustração do autocomplete em execução")

Na implementação foi utilizado o *template* *ADMIN-LTE*, então para usá-lo será necessário apenas chamar as classes *CSS* do *template*.

## Como usar 

Primeiro é preciso instalar de forma global o *json-server*, este por sua vez permite simular uma *API Rest* através de um arquivo *.json*. Para instalar o *json-server* de forma global basta usar o comando:

    npm i json-server -g

Agora parar simular uma *API Rest*, dentro da pasta do projeto basta usar o comando: 

    json-server --watch database.json --port 8084

O arquivo *database.json* tem os registros no formato .JSON que irão formar a base de dados da API. Para mais informações acesse o link -> https://www.fabricadecodigo.com/json-server/.

Para executar o projeto basta instalar as dependências e em seguida executar o projeto.

    npm i
    npm start
