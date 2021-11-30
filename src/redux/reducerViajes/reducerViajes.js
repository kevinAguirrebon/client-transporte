import axios from '../../axios/axios';

const stateInitial = {
    peticiones: 0,
    status: null,
    message: '',
    data:[],
    data_fecha: [],
    alineacion: [],
    pomas: []
}

const GET_VIAJES = 'GET_VIAJES';
const ERROR_GET_VIAJE = 'ERROR_GET_VIAJE';
const GET_VIAJES_FECHA = 'GET_VIAJES_FECHA';
const GET_ALINEACION_FECHA = 'GET_ALINEACION_FECHA';
const GET_POMAS = 'GET_POMAS';


export default function viajesReducer(state = stateInitial,action){
    switch (action.type) {
        case GET_VIAJES:
            return {...state, status: action.status, message: action.message, data: action.data, peticiones: action.peticiones};
        case ERROR_GET_VIAJE:
            return {...state, status: action.status, message: action.message}
        case GET_VIAJES_FECHA:
            return {...state, status: action.status, message: action.message, data_fecha: action.data, peticiones: action.peticiones};
        case GET_ALINEACION_FECHA:
            return {...state, status: action.status, message: action.message, alineacion: action.data, peticiones: action.peticiones};
        case GET_POMAS:
            return {...state, status: action.status, message: action.message, pomas: action.data, peticiones: action.peticiones}
        default:
            return state
    }

}


export const getViajes = () => async (dispatch,getState) => {
    const state = getState();
    const peticion = state.viajes.peticiones + 1;
    try {
        const request = await axios.get('api/viajes');
        const response = await request.data;
        if(response.status === true){
            dispatch({
                type: 'GET_VIAJES',
                status: response.status,
                message: response.message,
                data: response.data,
                peticiones: peticion
            })
        }else{
            dispatch({
                type: 'ERROR_GET_VIAJE',
                status: response.status,
                message: response.message,
            })
        }
    }catch(err){
        console.error(err);
    }
}

export const getPomas = (fecha) => async (dispatch,getState) => {
    const state = getState();
    const peticion = state.viajes.peticiones + 1;
    try {
        const request = await axios.get('api/pomas',{
            params: {id: fecha}
        });
        const response = await request.data;
        if(response.status === true){
            dispatch({
                type: 'GET_POMAS',
                status: response.status,
                message: response.message,
                data: response.data,
                peticiones: peticion
            })
        }else{
            dispatch({
                type: 'ERROR_GET_POMAS',
                status: response.status,
                message: response.message,
            })
        }
        
    }catch(err){
        console.error(err);
    }
}

export const getAlineacion = (fecha) => async (dispatch,getState) => {
    const state = getState();
    const peticion = state.viajes.peticiones + 1;
    try {
        const request = await axios.get('api/alineacion',{
            params: {id: fecha}
        });
        const response = await request.data;
        if(response.status === true){
            dispatch({
                type: 'GET_ALINEACION_FECHA',
                status: response.status,
                message: response.message,
                data: response.data,
                peticiones: peticion
            })
        }else{
            dispatch({
                type: 'ERROR_GET_ALINEACION',
                status: response.status,
                message: response.message,
            })
        }
    }catch(err){
        console.error(err);
    }
}

export const getViajesFecha = (fecha) => async (dispatch,getState) => {
    const state = getState();
    const peticion = state.viajes.peticiones + 1;
    try {
        const request = await axios.get('api/viajes',{
            params: {id: fecha}
        });
        const response = await request.data;
        if(response.status === true){
            dispatch({
                type: 'GET_VIAJES_FECHA',
                status: response.status,
                message: response.message,
                data: response.data,
                peticiones: peticion
            })
        }else{
            dispatch({
                type: 'ERROR_GET_VIAJE_FECHA',
                status: response.status,
                message: response.message,
            })
        }
    }catch(err){
        console.error(err);
    }
}

