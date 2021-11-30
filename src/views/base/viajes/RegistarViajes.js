import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getCamiones } from '../../../redux/reducerCamiones/camiones';
import { getConductores } from '../../../redux/reducerConductores/conductores';
import axios from '../../../axios/axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { getViajes } from '../../../redux/reducerViajes/reducerViajes';
import { getRutas } from '../../../redux/reducerRutas/rutas';

const RegistarRuta = ({form,dataUpdate,setSearch}) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch();
    const camiones = useSelector(state => state.camiones.data);
    const dataConductores = useSelector(store => store.conductores.data);
    const rutas = useSelector(state => state.rutas.data_rutas);
    
    const onSubmit = async(data) => {
        console.log(data);
            if(!form){
                const request = await axios.post('api/viajes',{
                    data: {camion: data.camion, conductor: data.conductor, fecha: data.fecha, ruta: data.ruta}
                });
                const response = await request.data;
                if(response.status === true){
                    Swal.fire({
                        title: response.message,
                        icon: 'success',
                        confirmButtonText: 'ok'
                    })
                    reset({camion: "", conductor: "", fecha: "",});
                    dispatch(getViajes());
                    setSearch('');
                    document.getElementById('modal_viajes_close').click();
                }else{
                    Swal.fire({
                        title: response.message,
                        icon: 'warning',
                        confirmButtonText: 'ok'
                    })
                }
            }else{
                const request = await axios.put('api/viajes',{
                    data: {id: data.id, camion: data.camion, conductor: data.conductor, fecha: data.fecha, ruta: data.ruta}
                });
                const response = await request.data;
                if(response.status === true){
                    Swal.fire({
                        title: response.message,
                        icon: 'success',
                        confirmButtonText: 'ok'
                    })
                    reset({camion: "", conductor: "", fecha: "",});
                    dispatch(getViajes());
                    setSearch('');
                    document.getElementById('modal_viajes_close').click();
                }else{
                    Swal.fire({
                        title: response.message,
                        icon: 'warning',
                        confirmButtonText: 'ok'
                    })
                }
            }
    }


    useEffect(()=>{
        dispatch(getCamiones());
        dispatch(getConductores());
        dispatch(getRutas());
    },[dispatch]);

    useEffect(()=>{
        if(dataUpdate){
            const ruta = {
                camion: dataUpdate.placa_id,
                conductor: dataUpdate.conductor_id,
                fecha: dataUpdate.fecha,
                id: dataUpdate.id,
                ruta: dataUpdate.ruta_id
            }
            reset(ruta);
        }else{
            reset({
                camion: '',
                conductor: '',
                fecha: '',
                ruta: ''
            });
        }
    },[dataUpdate,reset]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group row">
                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Fecha</label>
                    <div className="col-sm-9">
                        <input type="date" className="form-control" name="fecha" {...register('fecha', {required: { value: true, message: "El valor es requerido*"}})}/>
                    </div>
                    <span className="container text-danger">{errors?.fecha?.message}</span>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Camión</label>
                    <div className="col-sm-9">
                        <select type="text" className="form-control" name="camion" {...register('camion', {required: { value: true, message: "El valor es requerido*"},})}>
                            <option value="">Seleccione un placa*</option>
                            {camiones.length > 0 && camiones.map(camion => ( <option key={camion.placa} value={camion.placa}>{camion.placa}</option> ))}
                        </select>
                    </div>
                    <span className="container text-danger">{errors?.camion?.message}</span>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Conductor</label>
                    <div className="col-sm-9">
                        <select type="text" className="form-control" name="conductor" {...register('conductor', {required: { value: true, message: "El valor es requerido*"},})}>
                            <option value="">Seleccione un documento*</option>
                            {dataConductores.length > 0 && dataConductores.map(conductor => ( <option key={conductor.id} value={conductor.id}>{conductor.id}</option> ))}
                        </select>
                    </div>
                    <span className="container text-danger">{errors?.conductor?.message}</span>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Rutas</label>
                    <div className="col-sm-9">
                        <select type="text" className="form-control" name="ruta" {...register('ruta', {required: { value: true, message: "El valor es requerido*"},})}>
                            <option value="">Seleccione una ruta*</option>
                            {rutas.length > 0 && rutas.map(ruta => ( <option key={ruta.id} value={ruta.id}>{ruta.id}</option> ))}
                        </select>
                    </div>
                    <span className="container text-danger">{errors?.ruta?.message}</span>
                </div>
                <div className="form-group">
                    <button className="btn btn-success">{form? 'Actualizar':'Guardar'}</button>
                </div>
            </form> 
        </>
    )
}

export default RegistarRuta;