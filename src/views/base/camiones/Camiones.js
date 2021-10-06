import React, {lazy , Suspense, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCamiones,deleteCamion,getCamion } from '../../../redux/reducerCamiones/camiones';
import Swal from 'sweetalert2';

const Modal = lazy(() => import(/* webpackChunkName: "Modal" */'../../components/Modal'));
const RegisterCamion = lazy(() => import(/* webpackChunkName: "Register_camiones" */'./RegisterCamion'));
const Table = lazy(() => import(/* webpackChunkName: "tabla_camiones" */'../../components/DataTable'));

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

    const dataColumns = [
        { name: 'PLACA', selector: row => row.placa, sortable: true, width: '20%',},
        { name: 'TIPO CAMION', selector:  row => row.tipo_camion, sortable: true, width: '20%',},
        { name: 'CAPACIDAD',selector:  row => row.capacidad, sortable: true, width: '20%', center: true,},
        { name: 'FECHA_REGISTO', selector:  row => row.fecha_registro, sortable: true, width: '25%',},
        { cell: (row) => <> <div className="container">
                                <button className="btn btn-info" data-toggle="modal" data-target="#modal-default" onClick={()=> {
                                        setSaveOrUpdate(2);
                                        dispatch(getCamion(row.placa))}
                                    }><i className="far fa-edit"></i></button>  
                            </div>
                            <div className="container">
                                <button className="btn btn-danger" onClick={()=>btnEliminar(row.placa)}><i className="far fa-trash-alt"></i></button>
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
            title: '¿Quieres eliminar este camión?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(deleteCamion(id));
            }
        });
	};

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
        <div className="card border-0">
            <div className="card-header">
                <div className="input-group row mt-2">
                    <h5 className="col-sm-5">Total de Camiones Registrados</h5>
                    <div className="input-group-append">
                        <button className="btn nav-link disabled" ><i className="fa fa-search"/></button>
                    </div>
                    <input type="search"  className="form-control form-control-border col-sm-6" value={search} onChange={setSearchInput} placeholder="Buscar..." />
                    <Suspense fallback={loading}>
                        <button type="button" className="btn col-sm-2" data-toggle="modal" data-target="#modal-default" onClick={() => setSaveOrUpdate(1) }>
                            <i className="fas fa-plus"></i> Crear camión
                        </button>
                    </Suspense>
                </div>
            </div>
            <div className="card-body table-responsive">
            <Suspense fallback={loading}>
                <Table  data={search.length > 0 ? camiones : dataCamiones} columns={dataColumns} eliminar={btnEliminar}></Table >
            </Suspense>
            </div>
        </div>
        <Modal id="modal-default" close="modal_camiones_close" titulo={saveOrUpdate === 1? 'Registrar Camión': 'Actualizar Camión'} body={<RegisterCamion saveOrUpdate={saveOrUpdate} operation={saveOrUpdate === 1? buttonSave : buttonUpdate}/>} />
        </>
    )
}

export default Camiones;