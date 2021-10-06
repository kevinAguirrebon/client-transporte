import axios from '../../axios/axios';

const stateInitial = {
    peticiones: 0,
    status: null,
    message: '',
    data:[],
    data_update: null,
    resetForm: null,
}

const SAVE_CONDUCTOR = "SAVE_CONDUCTOR";
const GET_CONDUCTORES_TRUE = 'GET_CONDUCTORES_TRUE';
const ERROR_SAVE_CONDUCTOR = 'ERROR_SAVE_CONDUCTOR';
const ERROR_GET_CONDUCTORES = 'ERROR_GET_CONDUCTORES';
const DELETE_TRUE_CONDUCTOR = 'DELETE_TRUE_CONDUCTOR';
const ERROR_DELETE_CONDUCTOR = 'ERROR_DELETE_CONDUCTOR';
const GET_CONDUCTOR_ONE_TRUE = 'GET_CONDUCTOR_ONE_TRUE';
const ERROR_GET_CONDUCTOR_ONE = 'ERROR_GET_CONDUCTOR_ONE';
const UPDATE_CONDUCTOR = 'UPDATE_CONDUCTOR';
const ERROR_UPDATE_CONDUCTOR = 'ERROR_UPDATE_CAMION';


export default function conductoresReducer(state = stateInitial,action){
    switch (action.type) {
        case SAVE_CONDUCTOR:
            return {...state, status: action.status, message: action.message,resetForm: action.resetForm, peticiones: action.peticiones}
        case ERROR_SAVE_CONDUCTOR:
            return {...state, status: action.status, message: action.message, resetForm: action.resetForm, peticiones: action.peticiones}
        case GET_CONDUCTORES_TRUE:
            return {...state, status: action.status, data: action.data, message: action.message, peticiones: action.peticiones}
        case ERROR_GET_CONDUCTORES:
            return {...state, status: action.status, data: action.data, message: action.message, peticiones: action.peticiones}
        case DELETE_TRUE_CONDUCTOR:
            return {...state, status: action.status, message: action.message, peticiones: action.peticiones}
        case ERROR_DELETE_CONDUCTOR:
            return {...state, status: action.status, message: action.message, peticiones: action.peticiones}
        case GET_CONDUCTOR_ONE_TRUE:
            return {...state, status: action.status, data_update: action.data_update, message: action.message, peticiones: action.peticiones,}
        case ERROR_GET_CONDUCTOR_ONE:
            return {...state, status: action.status, message: action.message, peticiones: action.peticiones}
        case UPDATE_CONDUCTOR:
            return {...state, status: action.status, data_update: action.data_update, message: action.message, peticiones: action.peticiones, resetForm: action.resetForm}
        case ERROR_UPDATE_CONDUCTOR:
            return {...state, status: action.status, message: action.message, peticiones: action.peticiones}
        default:
            return state
    }

}

export const saveConductor = (conductor) => async (dispatch,getState) => {
    const state = getState();
    const peticion = state.conductores.peticiones + 1;
    try {
        const request = await axios.post('api/conductores',{
            data:{
                id: conductor.id,
                nombre: conductor.nombre.toUpperCase(),
            }
        });
        const response = await request.data;
        if(response.status === true){
            dispatch({
                type: 'SAVE_CONDUCTOR',
                status: response.status,
                resetForm: true,
                message: response.message,
                peticiones: peticion
            })
        }else{
            dispatch({
                type: 'ERROR_SAVE_CONDUCTOR',
                status: response.status,
                resetForm: false,
                message: response.message,
                peticiones: peticion
            })
        }
    }catch(err){

    }

}

export const getConductores = () => async (dispatch,getState) => {
    const state = getState();
    const peticion = state.conductores.peticiones + 1;
    try {
        const request = await axios.get('api/conductores',{
        });
        const response = await request.data;
        if(response.status === true){
            dispatch({
                type: 'GET_CONDUCTORES_TRUE',
                status: null,
                message: response.message,
                data: response.data,
                peticiones: peticion
            })
        }else{
            dispatch({
                type: 'ERROR_GET_CONDUCTORES',
                status: null,
                message: response.message,
                peticiones: peticion
            })
        }

    }catch(err){

    }
}

export const deleteConductor = (id) => async (dispatch,getState) => {
    const state = getState();
    const peticion = state.conductores.peticiones + 1;
    try {
        const request = await axios.delete('api/conductores',{
            params: {id: id},
        });
        const response = await request.data;
        if(response.status === true){
            dispatch({
                type: 'DELETE_TRUE_CONDUCTOR',
                status: response.status,
                message: response.message,
                peticiones: peticion
            })
        }else{
            dispatch({
                type: 'ERROR_DELETE_CONDUCTOR',
                status: response.status,
                message: response.message,
                peticiones: peticion
            })
        }
    }catch(err){
        console.log(err);
    }
}

export const getConductor = (id) => async (dispatch,getState) => {
    const state = getState();
    const peticion = state.conductores.peticiones + 1;
    try {
        const request = await axios.get('api/conductores',{
            params: {id}
        });
        const response = await request.data;
        if(response.status === true){
            dispatch({
                type: 'GET_CONDUCTOR_ONE_TRUE',
                status: null,
                data_update: response.data,
                message: response.message,
                peticiones: peticion,
            })
        }else{
            dispatch({
                type: 'ERROR_GET_CONDUCTOR_ONE',
                status: null,
                message: response.message,
                peticiones: peticion
            })
        }
    }catch(err){
        console.log(err);
    }
}

export const updateConductor  = (conductor) => async (dispatch,getState) => {
    const state = getState();
    const peticion = state.conductores.peticiones + 1;
    try {
        const request = await axios.put('api/conductores',{
            data:{
                id: conductor.id,
                nombre: conductor.nombre,
            }
        });
        const response = await request.data;
        if(response.status === true){
            dispatch({
                type: 'UPDATE_CONDUCTOR',
                status: response.status,
                data_update: null,
                resetForm: true,
                message: response.message,
                peticiones: peticion,

            })
        }else{
            dispatch({
                type: 'ERROR_UPDATE_CONDUCTOR',
                status: response.status,
                resetForm: false,
                message: response.message,
                peticiones: peticion
            })
        }
    }catch(err){

    }

}




