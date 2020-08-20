import axios from 'axios';
//configuração da instancia principal do axios, unificando a url base
const http = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    timeout: 10000,
});


export {http}

