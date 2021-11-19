import React, {lazy , Suspense, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getConductores,deleteConductor,getConductor } from '../../../redux/reducerConductores/conductores';
import Swal from 'sweetalert2';
import loading from '../../components/Load';

const Modal = lazy(() => import(/* webpackChunkName: "Modal" */'../../components/Modal'));
const RegisterConductores = lazy(() => import(/* webpackChunkName: "Register_Conductores" */'./RegisterConductor.js'));
const Table = lazy(() => import(/* webpackChunkName: "tabla_Conductores" */'./TableConductor'));

const Conductores = () => {
    const [saveOrUpdate, setSaveOrUpdate] = useState(1);
    const [search, setSearch] = useState('');
    const [conductores, setConductores] = useState([]);
    const dispatch = useDispatch();
    const dataConductores = useSelector(store => store.conductores.data);
    const dataStatus = useSelector(store => store.conductores.status);
    const message = useSelector(store => store.conductores.message);
    const peticiones = useSelector(store => store.conductores.peticiones);
    const buttonSave = {id: 1, button: 'Guardar Conductor'};
    const buttonUpdate = {id: 2, button: 'Actualizar Conductor'};

    const setSearchInput = ({target}) => {
        setSearch(target.value);
        dataFiltered(target.value);
    }
    const btnEliminar = (id) => {
        Swal.fire({
            title: '¿Quieres eliminar este conductor?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(deleteConductor(id));
            }
        });
	};

    const btnActualizar = (id) => {
        setSaveOrUpdate(2);
        dispatch(getConductor(id))
    }

    const dataFiltered = (value) => {
        const filtered = dataConductores.filter(item => {
            if(item.id.toString().toLowerCase().includes(value.toLowerCase())||
                item.nombre.toString().toLowerCase().includes(value.toLowerCase())
            ){
                return item;
            }else return false;
        })
        setConductores(filtered);
    }

    useEffect(()=>{
        dispatch(getConductores());
    },[dispatch]);

    useEffect(()=>{
        setConductores(dataConductores);
    },[dataConductores]);

    useEffect(()=>{
        if(dataStatus !== null){
            if(dataStatus === false ){
                Swal.fire({
                    title: message,
                    icon: 'warning',
                    confirmButtonText: 'ok'
                })
            }else{
                document.getElementById('modal_conductores_close').click();
                dispatch(getConductores());
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
        <h4 className="mb-3">Total de Conductores Registrados</h4>
        <div className="input-group jumbotron px-0  py-0 mb-0 pt-2">
            <div className="col-sm-6">
                <Suspense fallback={loading}>
                    <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#modal-default" onClick={() => setSaveOrUpdate(1) }>
                        <i className="fas fa-plus"></i> Crear conductor
                    </button>
                </Suspense>
                </div>
            <input type="search"  className="form-control col-sm-6" onPaste={setSearchInput} value={search} onChange={setSearchInput} placeholder="Buscar..." />
            <div className="input-group-append">
                <button className="btn nav-link disabled" ><i className="fa fa-search"/></button>
            </div>
        </div>
            <Suspense fallback={loading}>
                <Table  data={search.length > 0 ? conductores : dataConductores} ftn_eliminar={btnEliminar} ftn_actualizar={btnActualizar}/>
            </Suspense>
            <Modal id="modal-default" close="modal_conductores_close" titulo={saveOrUpdate === 1? 'Registrar Camión': 'Actualizar Camión'} body={<RegisterConductores saveOrUpdate={saveOrUpdate} operation={saveOrUpdate === 1? buttonSave : buttonUpdate}/>} />
        </>
    )
}

export default Conductores;