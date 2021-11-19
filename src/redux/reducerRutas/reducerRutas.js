import axios from '../../axios/axios';

const stateInitial = {
    peticiones: 0,
    status: null,
    message: '',
    data:[],
    data_fecha: [],
    alineacion: [],
}

const GET_RUTAS = 'GET_RUTAS';
const ERROR_GET_RUTA = 'ERROR_GET_RUTA';
const GET_RUTAS_FECHA = 'GET_RUTAS_FECHA';
const GET_ALINEACION_FECHA = 'GET_ALINEACION_FECHA';

export default function rutasReducer(state = stateInitial,action){
    switch (action.type) {
        case GET_RUTAS:
            return {...state, status: action.status, message: action.message, data: action.data, peticiones: action.peticiones};
        case ERROR_GET_RUTA:
            return {...state, status: action.status, message: action.message}
        case GET_RUTAS_FECHA:
            return {...state, status: action.status, message: action.message, data_fecha: action.data, peticiones: action.peticiones};
        case GET_ALINEACION_FECHA:
            return {...state, status: action.status, message: action.message, alineacion: action.data, peticiones: action.peticiones};
        default:
            return state
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
                type: 'ERROR_GET_RUTA',
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
    const peticion = state.rutas.peticiones + 1;
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

export const getRutasFecha = (fecha) => async (dispatch,getState) => {
    const state = getState();
    const peticion = state.rutas.peticiones + 1;
    try {
        const request = await axios.get('api/rutas',{
            params: {id: fecha}
        });
        const response = await request.data;
        if(response.status === true){
            dispatch({
                type: 'GET_RUTAS_FECHA',
                status: response.status,
                message: response.message,
                data: response.data,
                peticiones: peticion
            })
        }else{
            dispatch({
                type: 'ERROR_GET_RUTA_FECHA',
                status: response.status,
                message: response.message,
            })
        }
    }catch(err){
        console.error(err);
    }
}

