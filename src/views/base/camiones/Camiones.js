import React, {lazy , Suspense, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCamiones,deleteCamion,getCamion } from '../../../redux/reducerCamiones/camiones';
import Swal from 'sweetalert2';

const Modal = lazy(() => import(/* webpackChunkName: "Modal" */'../../components/Modal'));
const RegisterCamion = lazy(() => import(/* webpackChunkName: "Register_camiones" */'./RegisterCamion'));
const Table = lazy(() => import(/* webpackChunkName: "tabla_camiones" */'./TableCamiones'));

const loading = (
    <div className="text-center">
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
    )

const Camiones = () => {
    const [saveOrUpdate, setSaveOrUpdate] = useState(1);
    const [search, setSearch] = useState('');
    const [camiones, setCamiones] = useState([]);
    const dispatch = useDispatch();
    const dataCamiones = useSelector(store => store.camiones.data);
    const dataStatus = useSelector(store => store.camiones.status);
    const message = useSelector(store => store.camiones.message);
    const peticiones = useSelector(store => store.camiones.peticiones);
    const buttonSave = {id: 1, button: 'Guardar Camión'};
    const buttonUpdate = {id: 2, button: 'Actualizar Camión'};

    const setSearchInput = ({target}) => {
        setSearch(target.value);
        dataFiltered();
    }

    const dataFiltered = () => {
        const filtered = dataCamiones.filter(item => {
            if(item.placa.toString().toLowerCase().includes(search.toLowerCase())||
                item.tipo_camion.toString().toLowerCase().includes(search.toLowerCase())||
                item.capacidad.includes(search)||
                item.fecha_registro.toString().includes(search)
            ){
                return item;
            }else return false;
        })
        setCamiones(filtered);
    }

    useEffect(()=>{
        dispatch(getCamiones());
    },[dispatch]);

    useEffect(()=>{
        setCamiones(dataCamiones);
    },[dataCamiones]);

    useEffect(()=>{
        if(dataStatus !== null){
            if(dataStatus === false ){
                Swal.fire({
                    title: message,
                    icon: 'warning',
                    confirmButtonText: 'ok'
                })
            }else{
                document.getElementById('modal_camiones_close').click();
                dispatch(getCamiones());
                Swal.fire({
                    title:  message,
                    icon: 'success',
                    confirmButtonText: 'ok'
                })
            }
        }
    },[peticiones,dataStatus,dispatch,message]);

    return (
        <>
        <div className="input-group row mt-2">
            <div className="col-sm-5">
                <h5>Total de Camiones Registrados</h5>
            </div>
            <input type="search"  className="form-control form-control-border col-sm-6 mx-2" value={search} onChange={setSearchInput} placeholder="Buscar..." />
            <div className="input-group-append">
                <button className="btn nav-link disabled" ><i className="fa fa-search"/></button>
            </div>
            <div>
            <Suspense fallback={loading}>

                <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#modal-default" onClick={() => setSaveOrUpdate(1) }>
                    <i className="fas fa-plus"></i> Crear camión
                </button>
         
            </Suspense>
            </div>
        </div>
        <Suspense fallback={loading}>
            <Table  data={search.length > 0 ? camiones : dataCamiones}></Table >
        </Suspense>
        <Modal id="modal-default" close="modal_camiones_close" titulo={saveOrUpdate === 1? 'Registrar Camión': 'Actualizar Camión'} body={<RegisterCamion saveOrUpdate={saveOrUpdate} operation={saveOrUpdate === 1? buttonSave : buttonUpdate}/>} />
        </>
    )
}

export default Camiones;