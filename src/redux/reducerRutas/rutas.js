import axios from '../../axios/axios';

const stateInitial = {
    peticiones: 0,
    status: null,
    message: '',
    data:[],
    data_rutas: []
}

const SAVE_RUTA = 'SAVE_RUTA';
const GET_RUTAS = 'GET_RUTAS';
const DELETE_RUTA = 'DELETE_RUTA';
const UPDATE_RUTA = 'UPDATE_RUTA';
const ERROR_SAVE_RUTA = 'ERROR_SAVE_RUTA';
const ERROR_GET_RUTAS = 'ERROR_GET_RUTAS';
const ERROR_DELETE_RUTA = 'ERROR_DELETE_RUTA';
const ERROR_UPDATE_RUTA = 'ERROR_UPDATE_RUTA';

export default function rutasReducer(state = stateInitial,action){
    switch (action.type) {
        case SAVE_RUTA :
            return {...state, status: action.status, message: action.message, data: action.data, peticiones: action.peticiones};
        case GET_RUTAS :
            return {...state, status: action.status, message: action.message, data_rutas: action.data, peticiones: action.peticiones};
        case DELETE_RUTA :
            return {...state, status: action.status, message: action.message, data: action.data, peticiones: action.peticiones};
        case UPDATE_RUTA :
            return {...state, status: action.status, message: action.message, data: action.data, peticiones: action.peticiones};
        case ERROR_SAVE_RUTA :
            return {...state, status: action.status, message: action.message, peticiones: action.peticiones};
        case ERROR_GET_RUTAS:
            return {...state, status: action.status, message: action.message, peticiones: action.peticiones};
        case ERROR_DELETE_RUTA:
            return {...state, status: action.status, message: action.message, peticiones: action.peticiones};
        case ERROR_UPDATE_RUTA:
            return {...state, status: action.status, message: action.message, peticiones: action.peticiones};
        default:
            return state
    }

}

export const setRutas = (data) => async (dispatch,getState) => {
    const state = getState();
    const peticion = state.rutas.peticiones + 1;
    try {
        const request = await axios.post('api/rutas',{
            data: data
        });
        const response = await request.data;
        if(response.status === true){
            dispatch({
                type: 'SAVE_RUTA',
                status: response.status,
                message: response.message,
                data: response.data,
                peticiones: peticion
            })
        }else{
            dispatch({
                type: 'ERROR_SAVE_RUTA',
                status: response.status,
                message: response.message,
            })
        }
    }catch(err){
        console.error(err);
    }
}

export const getRutas = () => async (dispatch,getState) => {
    const state = getState();
    const peticion = state.rutas.peticiones + 1;
    try {
        const request = await axios.get('api/rutas');
        const response = await request.data;
        if(response.status === true){
            dispatch({
                type: 'GET_RUTAS',
                status: response.status,
                message: response.message,
                data: response.data,
                peticiones: peticion
            })
        }else{
            dispatch({
                type: 'ERROR_GET_RUTAS',
                status: response.status,
                message: response.message,
            })
        }
    }catch(err){
        console.error(err);
    }
}

export const deleteRutas = (id) => async (dispatch,getState) => {
    const state = getState();
    const peticion = state.rutas.peticiones + 1;
    try {
        const request = await axios.delete('api/rutas',{
            params: {id: id}
        });
        const response = await request.data;
        if(response.status === true){
            dispatch({
                type: 'DELETE_RUTA',
                status: response.status,
                message: response.message,
                data: response.data,
                peticiones: peticion
            })
        }else{
            dispatch({
                type: 'ERROR_DELETE_RUTA',
                status: response.status,
                message: response.message,
            })
        }
    }catch(err){
        console.error(err);
    }
}

export const updateRutas = (id,data) => async (dispatch,getState) => {
    const state = getState();
    const peticion = state.rutas.peticiones + 1;
    try {
        const request = await axios.put('api/rutas',{
            data: {
                id: id,
                data: data
            }
        });
        const response = await request.data;
        if(response.status === true){
            dispatch({
                type: 'UPDATE_RUTA',
                status: response.status,
                message: response.message,
                data: response.data,
                peticiones: peticion
            })
        }else{
            dispatch({
                type: 'ERROR_UPDATE_RUTA',
                status: response.status,
                message: response.message,
            })
        }
    }catch(err){
        console.error(err);
    }
}


