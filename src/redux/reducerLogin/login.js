import axios from '../../axios/axios';

const defaultStatus = {
    status: null,
    message: null,
    username: null,
    token: null
}

const loginData = localStorage.getItem('login');
const stateInitial = loginData ? JSON.parse(loginData) : defaultStatus
const LOGIN_USER = "LOGIN_USER";
const USER_INCORRECTO = "USER_INCORRECTO";
const LOGOUT_USER = 'LOGOUT_USER';


export default function camionesReducer(state = stateInitial,action){
    switch (action.type) {
        case LOGIN_USER:
            return {...state, token: action.token, username: action.username, status: action.status, message: action.message}
        case USER_INCORRECTO:
            return {...state, status: action.status, message: action.message }
        case LOGOUT_USER:
            return {...state, status: null, message: action.message, username: action.username, token: action.token}
        default:
            return state
    }

}


export const login = (user) => async (dispatch,getState) => {
    try {
        const request = await axios.post('api/login',user);
        const response = await request.data;
        if(response.status === true){
            dispatch({
                type: 'LOGIN_USER',
                status: response.status,
                message: response.message,
                username: response.username,
                token: response.token
            })
            localStorage.setItem('login',JSON.stringify(response));
        }else{
            dispatch({
                type: 'USER_INCORRECTO',
                status: response.status,
                message: response.message,
            })
        }
    }catch(err){
        console.error(err);
    }
}

export const logout = () => async (dispatch,getState) => {
    try {
        const request = await axios.get('api/logout');
        const response = await request.data;
        if(response.status === true){
            dispatch({
                type: 'LOGOUT_USER',
                status: response.status,
                message: response.message,
                token: null,
                username: null
            })
            localStorage.removeItem('login');
        }

    }catch(err){
        console.error(err);
    }
}