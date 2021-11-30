import React, { lazy, Suspense, useEffect, useState } from "react";
import { getRutas, deleteRutas } from '../../../redux/reducerRutas/rutas';
import { useSelector, useDispatch } from 'react-redux';
import RegisterRutas from "./RegisterRutas";
import Swal from 'sweetalert2';

const Table = lazy(() => import(/* webpackChunkName: "tabla_camiones" */'./TableRutas'));
const Modal = lazy(() => import(/* webpackChunkName: "Modal" */'../../components/Modal'));

const Rutas = () => {
    const dispatch = useDispatch();
    const data = useSelector(store => store.rutas.data_rutas);
    const peticiones = useSelector(store => store.rutas.peticiones);
    const status = useSelector(store => store.rutas.status);
    const message = useSelector(store => store.rutas.message);
    const [stateForm,setStateForm] = useState(false);
    const [fincasRutas, setFincasRutas] = useState([]);
    const [id,setId] = useState(null);
    const [search, setSearch] = useState('');
    const [rutas, setRutas] = useState([]);


    const setSearchInput = ({target}) => {
        setSearch(target.value);
        dataFiltered(target.value);
    }

    const dataFiltered = (value) => {
        const filtered = data.filter(item => {
            if(item.id.toString().toLowerCase().includes(value.toLowerCase()) 
            ){
                return item;
            }else return false;
        });
        setRutas(filtered);
    }


    const updateRutas = (id) => {
        const data_id = data.filter(element => element.id === id);
        const data_final = data_id[0].rutas_det.map(element => {
            return {
                label: element.descripcion,
                value: element.finca_id
            }
        })
        setId(id);
        setFincasRutas(data_final);
        setStateForm(true);
    }

    const saveOrUpdate = () => {
        setFincasRutas([]);
        setStateForm(false);
    }

    useEffect(() => {
        dispatch(getRutas());
    },[dispatch]);

    useEffect(() => {
        if(status){
            if(message){
                dispatch(getRutas());
                Swal.fire({
                    icon: 'success',
                    title: '',
                    text: message
                });
                document.getElementById('modal_rutas_close').click();
                setFincasRutas([]);
            }
        }else{
            if(message){
                dispatch(getRutas());
                Swal.fire({
                    icon: 'warning',
                    title: '',
                    text: message
                });
            }
        }
    },[dispatch,peticiones,message,status])

    const clickDelete = (id) =>{
        Swal.fire({
            title: '¿Quieres eliminar la ruta?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(deleteRutas(id));
            }
        });
    }

    return (
        <>
            <div className="py-1 mb-2"  style={{color: '#000'}}>
                <h4 className="text-center mb-0">Todas las rutas</h4>
            </div>
            <div className="input-group jumbotron px-0  py-0 mb-0 pt-2">
            <div className="col-sm-6">
                    <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#modal-default" onClick={()=> saveOrUpdate()}><i className="fas fa-plus"></i> Crear ruta</button>
                </div>
                <input type="text" className="form-control col-sm-6" value={search} onPaste={setSearchInput} onChange={setSearchInput} placeholder="Buscar..."></input>
                <div className="input-group-append">
                    <button className="btn nav-link disabled" ><i className="fa fa-search"/></button>
                </div>
            </div>
            <div className="table-responsive">
                <Suspense fallback={<div>Cargando...</div>}>
                    <Table data={search.length > 0 ? rutas : data} clickDelete={clickDelete} updateRutas={updateRutas}/>
                </Suspense>
            </div>
            <Modal id="modal-default" close="modal_rutas_close" titulo={stateForm === false? 'Registar ruta': 'Actualizar ruta'} body={<RegisterRutas stateForm={stateForm} fincasRutas={fincasRutas} setFincasRutas={setFincasRutas} id={id}></RegisterRutas>} />
        </>
    )
}

export default Rutas;