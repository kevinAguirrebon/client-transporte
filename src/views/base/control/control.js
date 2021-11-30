import React, { useEffect, useState } from 'react';
import { getViajesFecha,getAlineacion } from '../../../redux/reducerViajes/reducerViajes';
import { getCamiones } from '../../../redux/reducerCamiones/camiones';
import { useSelector, useDispatch } from 'react-redux';
import getFecha from '../../../helpers/fecha'
import fecha_format from '../../../helpers/format_fecha';
import TableControl from './tableControl';

const Control = () => {
    const dispatch = useDispatch();
    const dataViajesFecha = useSelector(store => store.viajes.data_fecha);
    const alineacion = useSelector(store => store.viajes.alineacion);
    const dataCamiones = useSelector(store => store.camiones.data);
    const [fecha, setFecha] = useState('');
    const [filterd,setFilterd] = useState([]);
    const [data_final , setData_final] = useState([]);
    const [placas, setPlaca] = useState([]);

    const changeFecha = (data) => {
        setFecha(data);
        dispatch(getViajesFecha(data));
        dispatch(getAlineacion(data));
        dispatch(getCamiones());
    }

    useEffect(() => {
        const placa = dataViajesFecha.map(({placa_id}) => {
            return placa_id.toUpperCase();
        })
        setPlaca(Array.from(new Set(placa)));
    },[dataViajesFecha])

    const filterData = (placa_id) => {
        if(!placa_id){
            setFilterd(dataViajesFecha);
        }else{
            const data = dataViajesFecha.filter(viaje => {
                if(viaje.placa_id === placa_id){
                    return true;
                }else{
                    return false;
                }
            });
            setFilterd(data);
        } 
        
    }
    
    useEffect(() => {
        if(dataViajesFecha.length > 0){
            const id = document.getElementById('placa_id_control').value;
            if(!id){
                setFilterd(dataViajesFecha);
            }else{
                const data = dataViajesFecha.filter(viaje => {
                    if(viaje.id === id){
                        return true;
                    }else{
                        return false;
                    }
                });
                setFilterd(data);
            }
        }else{
            setFilterd([]);
        }
    },[placas,dataViajesFecha]);

    useEffect(() => {
        setFecha(fecha_format());
        dispatch(getViajesFecha(fecha_format()));
        dispatch(getAlineacion(fecha_format()));
        dispatch(getCamiones());
    },[dispatch]);

    return (
        <>
         <div className="jumbotron px-0  py-1 mb-0 d-block"  style={{color: '#000'}}>
                <h5 className="text-center mb-0">Control de viajes <p className="mb-1" style={{fontSize: '15px', color: '#000'}}> { getFecha(fecha) }</p> </h5>
        </div>
        <div className="my-2 d-flex">
            <div className="form-group d-flex my-0">
                <label style={{padding: '4px'}}>Fecha: </label>
                <input type="date" disabled={false} name="fecha_pomas" id="fecha_id_control" className="form-control" value={fecha}  onChange={(event) => {changeFecha(event.target.value)}}></input>
            </div>
            <div className="form-group d-flex my-0">
            <label style={{padding: '4px'}}>Camiones: </label>
                <select name="placas" id='placa_id_control' className="form-control mx-3" style={{width: '200px'}}  onChange={(event) => filterData(event.target.value)}>
                    {
                        placas.length > 0 && <option value='' >Todos los camiones</option>
                    }  
                    {
                        placas.length > 0 ? placas.map((viaje,index) => {
                            return <option key={index} value={viaje}>{viaje}</option>
                        }) : <option value='null' >No existe información</option>
                    }
                </select>
            </div>
        </div>
        <TableControl filterd={filterd} dataCamiones={dataCamiones} alineacion={alineacion} data_final={data_final} setData_final={setData_final}></TableControl>
        </>
    );
}

export default Control;