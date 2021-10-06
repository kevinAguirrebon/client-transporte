import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveCamion, getTipo, updateCamion} from '../../../redux/reducerCamiones/camiones';
import { useForm } from 'react-hook-form';
const RegisterCamion = ({operation}) => {
    const dispatch = useDispatch();
    const [camion,setCamion] = useState({});
    const tiposCamion = useSelector(store => store.camiones.tipo_data);
    const resetForm = useSelector(store => store.camiones.resetForm);
    const data_update = useSelector(store => store.camiones.data_update);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
   
    const onSubmit = data => {
        if(operation.id === 1){
            setCamion({...camion,...data})
            dispatch(saveCamion(data));
        }else{
            setCamion({})
            dispatch(updateCamion(data));
        }
    }

    useEffect(()=>{
        dispatch(getTipo());
    },[dispatch])

    useEffect(()=>{
        if(operation.id === 1){
            if(resetForm){
                reset({capacidad: "", id: "", tipo: ""});
            }else{
                reset(camion);
            }
        }else{
            reset(data_update);
        }
    },[operation,camion,data_update,reset,resetForm])

    
    return (
        <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group row">
                <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Placa</label>
                <div className="col-sm-9">
                    <input type="text" disabled={operation.id === 2 && true} className={`form-control form-control-border ${errors?.placa?.message && 'is-invalid'}`} name="id" {...register('id', {required: { value: true, message: "El valor es requerido*"}})} placeholder="ingresa la placa" />
                </div>
                <span className="container text-danger">{errors?.placa?.message}</span>
            </div>
            <div className="form-group row">
                <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Tipo camion</label>
                <div className="col-sm-9">
                <select className={`form-control form-control-border ${errors?.tipo?.message && 'is-invalid'}`} name="tipo" {...register('tipo', {required: { value: true, message: "El valor es requerido*"},})}>
                    <option value="">Seleccione un tipo*</option>
                    {  
                       tiposCamion.length > 0 && tiposCamion.map(({id,descripcion})=><option key={id} value={id}>{descripcion}</option>)
                    }
                </select>
                </div>
                <span className="container text-danger">{errors?.tipo?.message}</span>
            </div>
            <div className="form-group row">
                <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Capacidad</label>
                <div className="col-sm-9">
                    <input type="text" className={`form-control form-control-border ${errors?.capacidad?.message && 'is-invalid'}`}  placeholder="capacidad de pallets"  name="capacidad" {...register('capacidad', { required: { value: true, message: "El valor es requerido*"},pattern: {value: /^[0-9]*$/, message: 'solo se aceptan numeros'}, min: { value: 0, message: "No se permiten valores negativos"}})} />
                </div>
                <span className="container text-danger">{errors?.capacidad?.message}</span>
            </div>
            <div className="form-group col-sm-5 mt-4">
                <button type="submit" className="btn btn-block btn-success">{operation.button}</button>
            </div>
        </form>
    )
}

export default RegisterCamion;