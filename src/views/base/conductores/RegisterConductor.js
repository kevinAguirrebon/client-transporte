import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveConductor, updateConductor} from '../../../redux/reducerConductores/conductores';
import { useForm } from 'react-hook-form';

const RegisterConductores = ({operation}) => {
    const dispatch = useDispatch();
    const [conductor,setConductor] = useState({});
    const resetForm = useSelector(store => store.conductores.resetForm);
    const data_update = useSelector(store => store.conductores.data_update);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
   
    const onSubmit = data => {
        if(operation.id === 1){
            setConductor({...conductor,...data})
            dispatch(saveConductor(data));
        }else{
            setConductor({})
            dispatch(updateConductor(data));
        }
    }

    useEffect(()=>{
        if(operation.id === 1){
            if(resetForm){
                reset({nombre: "", id: ""});
            }else{
                reset(conductor);
            }
        }else{
            console.log(data_update)
            reset(data_update);
        }
        
    },[operation,conductor,data_update,reset,resetForm])

    
    return (
        <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group row">
                <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Documento</label>
                <div className="col-sm-9">
                    <input type="text" disabled={operation.id === 2 && true} className={`form-control form-control-border ${errors?.id?.message && 'is-invalid'}`} name="id" {...register('id', {required: { value: true, message: "El valor es requerido*"},pattern: {value: /^[0-9]*$/, message: 'solo se aceptan numeros'}})} placeholder="ingresa tu documento" />
                </div>
                <span className="container text-danger">{errors?.id?.message}</span>
            </div>
            <div className="form-group row">
                <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Nombre</label>
                <div className="col-sm-9">
                    <input type="text" className={`form-control form-control-border ${errors?.nombre?.message && 'is-invalid'}`}  placeholder="ingresa el nombre"  name="nombre" {...register('nombre', { required: { value: true, message: "El valor es requerido*"},pattern: {value: /^[a-zA-Z ]*$/, message: 'solo se aceptan letras'}})} />
                </div>
                <span className="container text-danger">{errors?.nombre?.message}</span>
            </div>
            <div className="form-group col-sm-5 mt-4">
                <button type="submit" className="btn btn-block btn-success">{operation.button}</button>
            </div>
        </form>
    )
}

export default RegisterConductores;