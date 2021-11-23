import React, { useEffect, useState } from 'react';
import { getViajesFecha,getAlineacion } from '../../../redux/reducerViajes/reducerViajes';
import { getCamiones } from '../../../redux/reducerCamiones/camiones';
import { useSelector, useDispatch } from 'react-redux';
import getFecha from '../../../helpers/fecha'

const Control = () => {
    const dispatch = useDispatch();
    const dataViajesFecha = useSelector(store => store.viajes.data_fecha);
    const alineacion = useSelector(store => store.viajes.alineacion);
    const dataCamiones = useSelector(store => store.camiones.data);
    const [fecha, setFecha] = useState(null);
    const [filterd,setFilterd] = useState([]);

    const changeFecha = (data) => {
        setFecha(data);
        dispatch(getViajesFecha(data));
        dispatch(getAlineacion(data));
        dispatch(getCamiones());
    }

    const filterData = (id) => {
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
    },[dataViajesFecha]);

    useEffect(() => {
        const fecha = document.getElementById('fecha_id_control').value;
        dispatch(getViajesFecha(fecha));
    },[dispatch]);

    return (
        <>
         <div className="jumbotron px-0  py-1 mb-0 d-block"  style={{color: '#000'}}>
                <h5 className="text-center mb-0">Control de viajes <p className="mb-1" style={{fontSize: '15px', color: '#000'}}> { getFecha(fecha) }</p> </h5>
        </div>
        <div className="my-2 d-flex">
            <div className="form-group d-flex my-0">
                <label style={{padding: '4px'}}>Fecha: </label>
                <input type="date" name="fecha_pomas" id="fecha_id_control" className="form-control"  onChange={(event) => {changeFecha(event.target.value)}}></input>
            </div>
            <div className="form-group d-flex my-0">
            <label style={{padding: '4px'}}>Ruta: </label>
                <select name="placas" id='placa_id_control' className="form-control mx-3" style={{width: '200px'}}  onChange={(event) => filterData(event.target.value)}>
                    {
                        dataViajesFecha.length > 0 && <option value='' >Todos los viajes</option>
                    }  
                    {
                        dataViajesFecha.length > 0 ? dataViajesFecha.map(viaje => {
                            return <option key={viaje.id} value={viaje.id}>{viaje.id}</option>
                        }) : <option value='null' >No existe información</option>
                    }
                </select>
            </div>
        </div>
        <table className="table table-bordered table-sm">
            <thead>
                <tr style={{background: '#2E86C1'}}>
                    <th className="text-center" style={{color: '#FFF'}} >Id</th>
                    <th className="text-center" style={{color: '#FFF'}} >Fecha</th>
                    <th className="text-center" style={{color: '#FFF'}} >Placa</th>
                    <th className="text-center" style={{color: '#FFF'}} >Conductor</th>
                    <th className="text-center" style={{color: '#FFF'}}> Nombre</th>
                    <th className="text-center" style={{width: '200px',color: '#FFF'}}>Fincas</th>
                    <th className="text-center" style={{color: '#FFF'}}>Alineación</th>
                    <th className="text-center" style={{color: '#FFF'}}>Total</th>
                    <th className="text-center" style={{color: '#FFF'}}>Estado</th>

                </tr>
            </thead>
            <tbody>
            {
                        filterd.length > 0 ? filterd.map((viaje) => {
                            let total_alineacion = 0;
                            let capacidad = 0;
                            let pallets = dataCamiones.find(({placa}) => placa === viaje.camion);
                            if(pallets){
                                capacidad = pallets.capacidad;
                            }                             return (
                                <tr key={viaje.id}>
                                    <td className="text-center">{viaje.id}</td>
                                    <td >{viaje.fecha}</td>
                                    <td >{viaje.camion}</td>
                                    <td>{viaje.conductor}</td>
                                    <td>{viaje.nombre}</td>
                                    <td className="td_alineacion" colSpan="2">
                                        <table className="table table-sm">
                                            <tbody style={{background: '#F4F6F9'}}>
                                                {
                                                    viaje.viajes_det.length > 0 && viaje.viajes_det.map(element => {
                                                        const data = alineacion.find(({codigo_finca}) => codigo_finca === element.finca_id);
                                                        if(data){
                                                            total_alineacion += parseFloat(data.restantes);
                                                        }
                                                        return (
                                                            <tr key={element.id}>
                                                                <td style={{width: '200px'}}>{element.descripcion}</td>
                                                                <td className="text-center">{data? data.restantes : 'No existe esta alineación'}</td>
                                                            </tr>
                                                            )
                                                        }
                                                    )
                                                }
                                                
                                            </tbody>
                                        </table>
                                    </td>
                                    <th className="text-center" style={{fontSize: '17px'}}> { total_alineacion }</th>
                                    <th className="text-center" style={{fontSize: '17px'}}> 
                                    <div className="progress-group">
                                        Pallets <span className="description-percentage text-danger">{Math.round((total_alineacion/capacidad * 100),2)}%</span>
                                        <span className="float-right"><b>{total_alineacion}</b>/{capacidad}</span>
                                        <div className="progress progress-sm">
                                            <div className={`progress-bar ${((total_alineacion/capacidad * 100) < 20)?'bg-danger': ((total_alineacion/capacidad * 100) < 80)? 'bg-warning' : 'bg-success'}`} style={{width: `${total_alineacion/capacidad * 100}%`}} />
                                        </div>
                                    </div>
                                    </th>
                                </tr>
                        )}): <tr>
                                <td colSpan="9" className="text-center"><h3>No hay viajes registradas</h3></td>
                            </tr>
                    }
            </tbody>
        </table>
        </>
    );
}

export default Control;