import React, {lazy , Suspense, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getConductores,deleteConductor,getConductor } from '../../../redux/reducerConductores/conductores';
import Swal from 'sweetalert2';

const Modal = lazy(() => import(/* webpackChunkName: "Modal" */'../../components/Modal'));
const RegisterConductores = lazy(() => import(/* webpackChunkName: "Register_Conductores" */'./RegisterConductor.js'));
const Table = lazy(() => import(/* webpackChunkName: "tabla_Conductores" */'../../components/DataTable'));

const loading = (
    <div className="text-center">
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
    )

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

    const dataColumns = [
        { name: 'DOCUMENTO', selector: row => row.id, sortable: true, width: '20%',},
        { name: 'NOMBRE', selector:  row => row.nombre, sortable: true, width: '30%',},
        { name: 'FECHA_REGISTRO', selector:  row => row.fecha, sortable: true, width: '15%',},
        { name: 'ESTADO',selector:  row => row.estado_id, sortable: true, width: '20%', center: true,},
        { cell: (row) => <> <div className="container">
                                <button className="btn btn-info" data-toggle="modal" data-target="#modal-default" onClick={()=> {
                                        setSaveOrUpdate(2);
                                        dispatch(getConductor(row.id))}
                                    }><i className="far fa-edit"></i></button>  
                            </div>
                            <div className="container">
                                <button className="btn btn-danger" onClick={()=>btnEliminar(row.id)}><i className="far fa-trash-alt"></i></button>
                            </div>
                        </>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        center: true,
        width: '10',
        name: 'OPCIONES'},
    ];
    
    const setSearchInput = ({target}) => {
        setSearch(target.value);
        dataFiltered();
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

    const dataFiltered = () => {
        const filtered = dataConductores.filter(item => {
            if(item.id.toString().toLowerCase().includes(search.toLowerCase())||
                item.nombre.toString().toLowerCase().includes(search.toLowerCase())
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
        <Suspense fallback={loading}>
            <button type="button" className="btn btn-secondary my-3" data-toggle="modal" data-target="#modal-default" onClick={() => setSaveOrUpdate(1) }>
                <i className="fas fa-plus"></i> Crear conductor
            </button>
            <Modal id="modal-default" close="modal_conductores_close" titulo={saveOrUpdate === 1? 'Registrar Conductor': 'Actualizar Conductor'} body={<RegisterConductores saveOrUpdate={saveOrUpdate} operation={saveOrUpdate === 1? buttonSave : buttonUpdate}/>} />
        </Suspense>
        <div className="card border-0">
            <div className="card-header" style={{background: '#fff'}}>
                <div className="input-group row mt-2">
                    <h5 className="col-sm-7">Total de Conductores Registrados</h5>
                    <input type="search"  className="form-control form-control-border" value={search} onChange={setSearchInput} placeholder="Buscar..." />
                    <div className="input-group-append">
                        <button className="btn nav-link disabled" ><i className="fa fa-search"/></button>
                    </div>
                </div>
            </div>
            <div className="card-body table-responsive">
            <Suspense fallback={loading}>
                <Table  data={search.length > 0 ? conductores : dataConductores} columns={dataColumns} eliminar={btnEliminar}></Table >
            </Suspense>
            </div>
        </div>
        </>
    )
}

export default Conductores;