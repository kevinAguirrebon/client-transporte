import axios from 'axios';

const dataLogin = localStorage.getItem('login')? JSON.parse(localStorage.getItem('login')): null
const token = dataLogin ? dataLogin.token : null;

const config = {
    baseURL: 'http://localhost/transporte/backend/',
    headers: { 
        'Content-Type': 'application/json',
        'token-access': 'Bearer ' + token
     } 
}

const instance = axios.create(config);

export default instance;