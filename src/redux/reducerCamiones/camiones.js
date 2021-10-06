import axios from '../../axios/axios';

const stateInitial = {
    peticiones: 0,
    status: null,
    message: '',
    data:[],
    tipo_data:[],
    data_update: null,
    resetForm: null,
}

const SAVE_CAMION = "SAVE_CAMIO";
const GET_CAMIONES_TRUE = 'GET_CAMIONES_TRUE';
const ERROR_SAVE_CAMION = 'ERROR_SAVE_CAMION';
const ERROR_GET_CAMIONES = 'ERROR_GET_CAMIONES';
const ERROR_GET_CAMIONES_TIPO = 'ERROR_GET_CAMIONES_TIPO';
const GET_CAMIONES_TIPO_TRUE = 'GET_CAMIONES_TIPO_TRUE';
const DELETE_TRUE_CAMION = 'DELETE_TRUE_CAMION';
const ERROR_DELETE_CAMION = 'ERROR_DELETE_CAMION';
const GET_CAMION_ONE_TRUE = 'GET_CAMION_ONE_TRUE';
const ERROR_GET_CAMION_ONE = 'ERROR_GET_CAMION_ONE';
const UPDATE_CAMIO = 'UPDATE_CAMIO';
const ERROR_UPDATE_CAMION = 'ERROR_UPDATE_CAMION';


export default function camionesReducer(state = stateInitial,action){
    switch (action.type) {
        case SAVE_CAMION:
            return {...state, status: action.status, message: action.message,resetForm: action.resetForm, peticiones: action.peticiones}
        case GET_CAMIONES_TRUE:
            return {...state, status: action.status, data: action.data, message: action.message, peticiones: action.peticiones}
        case ERROR_SAVE_CAMION:
            return {...state, status: action.status, message: action.message, resetForm: action.resetForm, peticiones: action.peticiones}
        case ERROR_GET_CAMIONES:
            return {...state, status: action.status, data: action.data, message: action.message, peticiones: action.peticiones}
        case ERROR_GET_CAMIONES_TIPO:
            return {...state, status: action.status, data: action.data, message: action.message, peticiones: action.peticiones}
        case GET_CAMIONES_TIPO_TRUE:
            return {...state, status: action.status, tipo_data: action.tipo_data, message: action.message, peticiones: action.peticiones}
        case DELETE_TRUE_CAMION:
            return {...state, status: action.status, message: action.message, peticiones: action.peticiones}
        case ERROR_DELETE_CAMION:
            return {...state, status: action.status, message: action.message, peticiones: action.peticiones}
        case GET_CAMION_ONE_TRUE:
            return {...state, status: action.status, data_update: action.data_update, message: action.message, peticiones: action.peticiones,}
        case ERROR_GET_CAMION_ONE:
            return {...state, status: action.status, message: action.message, peticiones: action.peticiones}
        case UPDATE_CAMIO:
            return {...state, status: action.status, data_update: action.data_update, message: action.message, peticiones: action.peticiones, resetForm: action.resetForm}
        case ERROR_UPDATE_CAMION:
            return {...state, status: action.status, message: action.message, peticiones: action.peticiones}
        default:
            return state
    }

}

export const saveCamion = (camion) => async (dispatch,getState) => {
    const state = getState();
    const peticion = state.camiones.peticiones + 1;
    try {
        const request = await axios.post('api/camiones',{
            data:{
                id: camion.id,
                tipo: camion.tipo,
                capacidad: camion.capacidad
            }
        });
        const response = await request.data;
        if(response.status === true){
            dispatch({
                type: 'SAVE_CAMIO',
                status: response.status,
                resetForm: true,
                message: response.message,
                peticiones: peticion
            })
        }else{
            dispatch({
                type: 'ERROR_SAVE_CAMION',
                status: response.status,
                resetForm: false,
                message: response.message,
                peticiones: peticion
            })
        }
    }catch(err){

    }

}

export const getCamiones = () => async (dispatch,getState) => {
    const state = getState();
    const peticion = state.camiones.peticiones + 1;
    try {
        const request = await axios.get('api/camiones',{
        });
        const response = await request.data;
        if(response.status === true){
            dispatch({
                type: 'GET_CAMIONES_TRUE',
                status: null,
                message: response.message,
                data: response.data,
                peticiones: peticion
            })
        }else{
            dispatch({
                type: 'ERROR_GET_CAMIONES',
                status: null,
                message: response.message,
                peticiones: peticion
            })
        }

    }catch(err){

    }
}

export const getTipo = () => async (dispatch,getState) => {
    const state = getState();
    const peticion = state.camiones.peticiones + 1;
    try {
        const request = await axios.get('api/tipoCamion');
        const response = await request.data;
        if(response.status === true){
            dispatch({
                type: 'GET_CAMIONES_TIPO_TRUE',
                status: null,
                message: response.message,
                tipo_data: response.data,
                peticiones: peticion
            })
        }else{
            dispatch({
                type: 'ERROR_GET_CAMIONES_TIPO',
                status: null,
                message: response.message,
                peticiones: peticion
            })
        }
    }catch(err){
        console.log(err);
    }
}

export const deleteCamion = (id) => async (dispatch,getState) => {
    const state = getState();
    const peticion = state.camiones.peticiones + 1;
    try {
        const request = await axios.delete('api/camiones',{
            params: {id: id},
        });
        const response = await request.data;
        if(response.status === true){
            dispatch({
                type: 'DELETE_TRUE_CAMION',
                status: response.status,
                message: response.message,
                peticiones: peticion
            })
        }else{
            dispatch({
                type: 'ERROR_DELETE_CAMION',
                status: response.status,
                message: response.message,
                peticiones: peticion
            })
        }
    }catch(err){
        console.log(err);
    }
}

export const getCamion = (id) => async (dispatch,getState) => {
    const state = getState();
    const peticion = state.camiones.peticiones + 1;
    try {
        const request = await axios.get('api/camiones',{
            params: {id}
        });
        const response = await request.data;
        if(response.status === true){
            dispatch({
                type: 'GET_CAMION_ONE_TRUE',
                status: null,
                data_update: response.data,
                message: response.message,
                peticiones: peticion,
            })
        }else{
            dispatch({
                type: 'ERROR_GET_CAMION_ONE',
                status: null,
                message: response.message,
                peticiones: peticion
            })
        }
    }catch(err){
        console.log(err);
    }
}

export const updateCamion = (camion) => async (dispatch,getState) => {
    const state = getState();
    const peticion = state.camiones.peticiones + 1;
    try {
        const request = await axios.put('api/camiones',{
            data:{
                id: camion.id,
                tipo: camion.tipo,
                capacidad: camion.capacidad
            }
        });
        const response = await request.data;
        if(response.status === true){
            dispatch({
                type: 'UPDATE_CAMIO',
                status: response.status,
                data_update: null,
                resetForm: true,
                message: response.message,
                peticiones: peticion,

            })
        }else{
            dispatch({
                type: 'ERROR_UPDATE_CAMION',
                status: response.status,
                resetForm: false,
                message: response.message,
                peticiones: peticion
            })
        }
    }catch(err){

    }

}




