import React, { useState, useEffect, lazy, Suspense} from 'react';
import RegistarRuta from './RegistarRuta';
import Modal from "../../components/Modal"
import Swal from 'sweetalert2';
import axios from '../../../axios/axios';
import { getRutas } from '../../../redux/reducerRutas/reducerRutas';
import { useSelector, useDispatch } from 'react-redux';
import loading from '../../components/Load';

const TableRutas = lazy(() => import(/* webpackChunkName: "tabla_rutas" */'./TableRutas'));

const Rutas = () => {
    const dispatch = useDispatch();
    const dataRutas = useSelector(store => store.rutas.data);
    const [form,setForm] = useState(false);
    const [dataUpdate,setDataUpdate] = useState(null);
    const [search, setSearch] = useState('');
    const [rutas, setRutas] = useState([]);


    const setSearchInput = ({target}) => {
        setSearch(target.value);
        dataFiltered(target.value);
    }

    const dataFiltered = (value) => {
        const filtered = dataRutas.filter(item => {
            if(item.id.toString().toLowerCase().includes(value.toLowerCase()) ||
                item.camion.toString().toLowerCase().includes(value.toLowerCase()) ||
                item.conductor.toString().toLowerCase().includes(value.toLowerCase()) ||
                item.nombre.toString().toLowerCase().includes(value.toLowerCase()) ||
                item.fecha.toString().toLowerCase().includes(value.toLowerCase())
            ){
                return item;
            }else return false;
        });
        setRutas(filtered);
    }

    useEffect(()=>{
        dispatch(getRutas());
    },[dispatch]);

    const deleteRuta = async(id) => {
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
                const request = await axios.delete('api/rutas',{
                    params: {id: id}
                });
                const response = await request.data;
                if(response.status === true){
                    Swal.fire({
                        title: response.message,
                        icon: 'success',
                        confirmButtonText: 'ok'
                    })
                    dispatch(getRutas());
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

    const editRuta = (id) => {
        setForm(true);
        if(dataRutas.length > 0){
            const ruta = dataRutas.find(ruta => ruta.id === id);
            if(ruta){
                setDataUpdate(ruta);
            }
        }
    }

    const createRuta = () => {
        setForm(false);
        setDataUpdate(null);
    }

    return (
        <div>
            <Modal id="modal-default" close="modal_rutas_close" titulo={form ? 'Actualizar viaje':'Registrar viaje'} body={<RegistarRuta form={form} dataUpdate={dataUpdate} setSearch={setSearch}/>}/>
            <div className="jumbotron px-0  py-1 mb-0 d-block"  style={{color: '#000'}}>
                <h5 className="text-center mb-0">Todos los viajes</h5>
            </div>
            <div className="table-responsive">
            <Suspense fallback={loading}>
                <TableRutas data={search.length > 0 ? rutas : dataRutas} deleteRuta={deleteRuta} editRuta={editRuta} createRuta={createRuta} setSearchInput={setSearchInput} search={search}></TableRutas>
            </Suspense>
            </div>
        </div>
    );

}

export default Rutas;