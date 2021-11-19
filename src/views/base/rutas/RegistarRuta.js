import React, {useEffect,useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getCamiones } from '../../../redux/reducerCamiones/camiones';
import { getConductores } from '../../../redux/reducerConductores/conductores';
import Select from 'react-select'
import axios from '../../../axios/axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { getRutas } from '../../../redux/reducerRutas/reducerRutas';

const RegistarRuta = ({form,dataUpdate,setSearch}) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch();
    const [finca,setFinca] = useState([]);
    const camiones = useSelector(state => state.camiones.data);
    const dataConductores = useSelector(store => store.conductores.data);
    const [fincasRutas, setFincasRutas] = useState([]);
    
    const onSubmit = async(data) => {
        if(fincasRutas.length > 0) {
            if(!form){
                const request = await axios.post('api/rutas',{
                    data: {camion: data.camion, conductor: data.conductor, fecha: data.fecha, finca: fincasRutas}
                });
                const response = await request.data;
                if(response.status === true){
                    Swal.fire({
                        title: response.message,
                        icon: 'success',
                        confirmButtonText: 'ok'
                    })
                    reset({camion: "", conductor: "", fecha: "",});
                    setFincasRutas([]);
                    dispatch(getRutas());
                    setSearch('');
                    document.getElementById('modal_rutas_close').click();
                }else{
                    Swal.fire({
                        title: response.message,
                        icon: 'warning',
                        confirmButtonText: 'ok'
                    })
                }
            }else{
                const request = await axios.put('api/rutas',{
                    data: {id: data.id, camion: data.camion, conductor: data.conductor, fecha: data.fecha, finca: fincasRutas}
                });
                const response = await request.data;
                if(response.status === true){
                    Swal.fire({
                        title: response.message,
                        icon: 'success',
                        confirmButtonText: 'ok'
                    })
                    reset({camion: "", conductor: "", fecha: "",});
                    setFincasRutas([]);
                    dispatch(getRutas());
                    setSearch('');
                    document.getElementById('modal_rutas_close').click();
                }else{
                    Swal.fire({
                        title: response.message,
                        icon: 'warning',
                        confirmButtonText: 'ok'
                    })
                }
            }
        }
    }

    const getFinca = (fincas) => {
        setFincasRutas(fincas);
    }

    useEffect(()=>{
        dispatch(getCamiones());
        dispatch(getConductores());
        async function getFincas(){
            const request = await axios.get('api/finca');
            const response = await request.data;
            if(response.status === true){
                if(response.data.length > 0){
                    const data = response.data.map(finca => ({
                        value : finca.id,
                        label : finca.descripcion
                    }));
                    setFinca(data);
                }
            }
        }
        getFincas();
    },[dispatch]);

    useEffect(()=>{
        if(dataUpdate){
            const ruta = {
                camion: dataUpdate.camion,
                conductor: dataUpdate.conductor,
                fecha: dataUpdate.fecha,
                id: dataUpdate.id
            }
            const det_ruta = dataUpdate.rutas_det.map((element) => (
                {
                    label: element.descripcion,
                    value: element.finca_id
                }
            ))
            reset(ruta);
            setFincasRutas(det_ruta);
        }else{
            reset({
                camion: '',
                conductor: '',
                fecha: '',
            });
            setFincasRutas([]);
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
                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Fincas</label>
                    <div className="col-sm-9">
                        <Select value={fincasRutas} options={finca} isMulti name="fincas" onChange={(ValueType) => { getFinca(ValueType) }}/>
                    <span className="container text-danger">{fincasRutas.length > 0 ? '':'No hay fincas selecionadas'}</span>
                    </div>
                </div>
                <div className="form-group">
                <button className="btn btn-success">{form? 'Actualizar':'Guardar'}</button>
                </div>
            </form> 
        </>
    )
}

export default RegistarRuta;