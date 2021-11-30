import React, { useState, useEffect } from 'react';
import { setRutas,updateRutas } from '../../../redux/reducerRutas/rutas';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import axios from '../../../axios/axios';

const RegisterRutas = ({stateForm,fincasRutas,setFincasRutas,id}) => {
    const dispatch = useDispatch();
    const [finca,setFinca] = useState([]);

    const onSubmit = async(event) => {
        event.preventDefault();
        if(fincasRutas.length > 0) {
            const orden =  fincasRutas.map((element,index) => { 
                return {
                    id: element.value,
                    orden: index + 1,
                }
            });
            if(!stateForm){
                dispatch(setRutas(orden));
            }else{
                dispatch(updateRutas(id,orden));
            }

        }            
    }

    useEffect(()=>{ 
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
    },[]);

    const getFinca = (fincas) => {
        setFincasRutas(fincas);
    }

    return (
        <form className="mt-2" onSubmit={onSubmit}>
            <div className="form-group row my-0">
                    <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Lugares</label>
                    <div className="col-sm-9">
                        <Select options={finca} isMulti name="fincas" value={fincasRutas} onChange={(ValueType) => { getFinca(ValueType) }}/>
                    <span className="container text-danger">{fincasRutas.length > 0 ? '':'No hay fincas selecionadas'}</span>
                    </div>
                </div>
                <div className="form-group my-0">
                    <button className="btn btn-success">{(stateForm === false)? 'Guardar':'Actualizar'}</button>
                </div>
        </form>
    )

}

export default RegisterRutas;