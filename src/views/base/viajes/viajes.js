import React, { useState, useEffect, lazy, Suspense} from 'react';
import RegistarViajes from './RegistarViajes';
import Modal from "../../components/Modal"
import Swal from 'sweetalert2';
import axios from '../../../axios/axios';
import { getViajes } from '../../../redux/reducerViajes/reducerViajes';
import { useSelector, useDispatch } from 'react-redux';
import loading from '../../components/Load';

const TableViajes = lazy(() => import(/* webpackChunkName: "tabla_viajes" */'./TableViajes'));

const Rutas = () => {
    const dispatch = useDispatch();
    const dataViajes = useSelector(store => store.viajes.data);
    const [form,setForm] = useState(false);
    const [dataUpdate,setDataUpdate] = useState(null);
    const [search, setSearch] = useState('');
    const [viajes, setViajes] = useState([]);


    const setSearchInput = ({target}) => {
        setSearch(target.value);
        dataFiltered(target.value);
    }

    const dataFiltered = (value) => {
        const filtered = dataViajes.filter(item => {
            if(item.id.toString().toLowerCase().includes(value.toLowerCase()) ||
                item.camion.toString().toLowerCase().includes(value.toLowerCase()) ||
                item.conductor.toString().toLowerCase().includes(value.toLowerCase()) ||
                item.nombre.toString().toLowerCase().includes(value.toLowerCase()) ||
                item.fecha.toString().toLowerCase().includes(value.toLowerCase())
            ){
                return item;
            }else return false;
        });
        setViajes(filtered);
    }

    useEffect(()=>{
        dispatch(getViajes());
    },[dispatch]);

    const deleteViaje = async(id) => {
        Swal.fire({
            title: '¿Quieres eliminar la viaje?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                const request = await axios.delete('api/viajes',{
                    params: {id: id}
                });
                const response = await request.data;
                if(response.status === true){
                    Swal.fire({
                        title: response.message,
                        icon: 'success',
                        confirmButtonText: 'ok'
                    })
                    dispatch(getViajes());
                    setSearch('');
                }else{
                    Swal.fire({
                        title: response.message,
                        icon: 'warning',
                        confirmButtonText: 'ok'
                    })
                }
            }
        });
    }

    const editViaje = (id) => {
        setForm(true);
        if(dataViajes.length > 0){
            const viaje = dataViajes.find(viaje => viaje.id === id);
            if(viaje){
                setDataUpdate(viaje);
            }
        }
    }

    const createViaje = () => {
        setForm(false);
        setDataUpdate(null);
    }

    return (
        <div>
            <Modal id="modal-default" close="modal_viajes_close" titulo={form ? 'Actualizar viaje':'Registrar viaje'} body={<RegistarViajes form={form} dataUpdate={dataUpdate} setSearch={setSearch}/>}/>
            <div className="jumbotron px-0  py-1 mb-0 d-block"  style={{color: '#000'}}>
                <h5 className="text-center mb-0">Todos los viajes</h5>
            </div>
            <div className="table-responsive">
            <Suspense fallback={loading}>
                <TableViajes data={search.length > 0 ? viajes : dataViajes} deleteViaje={deleteViaje} editViaje={editViaje} createViaje={createViaje} setSearchInput={setSearchInput} search={search}></TableViajes>
            </Suspense>
            </div>
        </div>
    );

}

export default Rutas;