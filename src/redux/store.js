import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk  from 'redux-thunk';

//reducers 
import camionesReducer from './reducerCamiones/camiones';
import loginReducer from './reducerLogin/login'
import conductoresReducer from './reducerConductores/conductores'

const rootReducer = combineReducers({
    conductores: conductoresReducer,
    camiones: camionesReducer,
    login: loginReducer
})

const devTool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export default function generateStore(){
    const store = createStore(rootReducer, compose(applyMiddleware(thunk),devTool));
    return store;

}