import React, { useState, useEffect } from 'react';
import axios from '../../../axios/axios';
import Swal from 'sweetalert2';
import getFecha from '../../../helpers/fecha'

const Viajes = () => {
    const [data, setData] = useState([]);
    const [horas, setHoras] = useState([]);
    const [placa, setPlaca] = useState([]);
    const [newData, setNewData] = useState([]);
    const [fecha,setFecha] = useState();
    const [loading,setLoading] = useState()

    const getData = async (fecha) => {
        get_poma(fecha);
    }

    const reload_Viajes = async () => {
        get_poma(fecha);
    }

    const get_poma = async (fecha) => {
        try {
            setLoading(true);
            if(fecha){
                const request = await axios.get('api/pomas',{
                    params: {id: fecha}
                });
                const response = await request.data;
                if(response.status === true){
                    if(response.data.length > 0){
                        setData([]);
                        setData(response.data);
                        setFecha(fecha)
                    }else{
                        setFecha('');
                        setPlaca([]);
                        setHoras([]);
                    }
                }else{
                    Swal.fire({
                        title: response.message,
                        icon: 'warning',
                        confirmButtonText: 'ok'
                    })
                }
            }else{
                Swal.fire({
                    title: 'Seleccione una fecha',
                    icon: 'warning',
                    confirmButtonText: 'ok'
                })
            }
            setLoading(false);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        if(data.length > 0){
            const placa = data.map(({placa}) => {
                return placa.toUpperCase();
            })
            setPlaca(Array.from(new Set(placa)));
            const horas = data.map(({hora}) => {
                return hora;
            })
            setHoras((Array.from(new Set(horas))).sort());
        }
    },[data])

    useEffect(()=>{
        changePlaca(placa[0])
    },[horas]) // eslint-disable-line react-hooks/exhaustive-deps

    const changePlaca = (placa) => {
        const filterForHora =  removeItemRepeatHora(horas,placa);
        const filterForOrden =  removeItemRepeatOrden(filterForHora);
        const finalOperation =  removeItemRepeatHoraReducer(horas,filterForOrden,placa);
        setNewData(finalOperation)
    }

    const removeItemRepeatHora = (dataHoras,placaActual) => {
        const filterForHora = [];
        dataHoras.forEach(element => {
            const ItemsTabla = data.filter(({hora,placa})=>{
                if(placaActual === placa && element === hora) {
                    return true;
                }
                return false;
            })
            if(ItemsTabla.length > 0){
                const buque = [];
                for (let i = 0; i < ItemsTabla.length; i++) {
                    buque.push(ItemsTabla[i].buque)
                }
                filterForHora.push({...ItemsTabla[0],buque});
            }
        })
        return filterForHora;
    }

    const removeItemRepeatHoraReducer = (dataHoras,dataReducer,placaActual) => {
        const filterForHora = [];
        dataHoras.forEach(element => {
            const ItemsTabla = dataReducer.filter(({hora,placa})=>{
                if(placaActual === placa && element === hora) {
                    return true;
                }
                return false;
            })
            if(ItemsTabla.length > 0){
                const buque = [];
                for (let i = 0; i < ItemsTabla.length; i++) {
                    buque.push(ItemsTabla[i].buque)
                }
                filterForHora.push({...ItemsTabla[0],buque: buque[0]});
            }
        })
        return filterForHora;
    }

    const removeItemRepeatOrden  = (datosOrden) => {
        const filterForOrden = [];
        datosOrden.forEach(element => {
            const ItemsTabla = datosOrden.filter(({finca,orden})=>{
                if(finca === element.finca && orden === element.orden) {
                    return true;
                }
                return false;
            })
            if(ItemsTabla.length > 0){
                const buque = [];
                for (let i = 0; i < ItemsTabla.length; i++) {
                    buque.push(...ItemsTabla[i].buque)
                }
                filterForOrden.push({...ItemsTabla[ItemsTabla.length - 1],buque});
            }
        })
        return filterForOrden;
    }

    return (
        <>
        <div className="jumbotron px-0  py-1 mb-0 d-block" >
            <div className="d-flex justify-content-center">
                <h5 className="text-center mb-0">Viajes de Camiones <p className="mb-1" style={{fontSize: '15px', color: '#000'}}> { getFecha(fecha) }</p></h5>
            </div>
        </div>
        <div className="my-2 d-flex">
            <div className="form-group d-flex my-0">
                <label style={{padding: '4px'}}>Fecha: </label>
                <input type="date" name="fecha_pomas" id="fecha_id_viaje" className="form-control" onChange={({target}) => { getData(target.value);
                    }}></input>
            </div>
            <div className="form-group d-flex my-0">
            <label style={{padding: '4px'}}>Placa: </label>
                <select name="placas" id='placa_id_viaje' className="form-control mx-3" style={{width: '200px'}} onChange={({target}) =>changePlaca(target.value)}>  
                {
                    (data.length > 0 && fecha) ? placa.map((item,index) => <option key={index} value={item} >{item}</option>) : <option value='null' >No existe información</option>
                }   
                </select>
            </div>
            <button className="btn btn-secondary" onClick={() => reload_Viajes()}><i className="fas fa-redo"></i></button>
            {
                loading && <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
        </div>
        <div className="table-responsive">
            <table className="table table-sm table-bordered">
                <thead>
                    <tr style={{background: '#229954'}}>
                        <th className="text-center" style={{color: '#FFF'}}>#</th>
                        <th className="text-center" style={{color: '#FFF'}}>Hora</th>
                        <th className="text-center" style={{color: '#FFF'}}>Finca</th>
                        <th className="text-center" style={{color: '#FFF'}}>Conductor</th>
                        <th className="text-center" style={{color: '#FFF'}}>Ultimo</th>
                        <th className="text-center" style={{color: '#FFF'}}>Orden</th>
                        <th className="text-center" style={{color: '#FFF'}}>Embarcadero</th>
                        <th className="text-center" style={{color: '#FFF'}}>Buques</th>
                    </tr>
                </thead>
                <tbody>
                    { (newData.length > 0) ? newData.map((item,index) => (
                        <tr>
                            <td>{index + 1}</td>
                         <td><h6><p style={{color: '#EE6D6D' }}>{ item.hora }</p> </h6></td>
                        <td className="text-center">{ item.finca }</td>
                        <td>{ item.conductor }</td>
                        <td className="text-center">{ item.ultimo }</td>
                        <td className="text-center">{ item.orden }</td>
                        <td className="text-center">{ item.embarcadero }</td>
                        <td>
                             { 
                                            item.buque.map((item,index) => (
                                                <li key={index}>{item}</li>
                                            )) 
                                        }
                        </td>
                            
                        </tr>
                        ))
                        :   <tr>
                            <td colSpan="8" className="text-center">
                                <h3 >No se encontro información en esta fecha</h3> 
                            </td>
                        </tr> 
                                        
                        }
                        
                    
                   
                </tbody>
            </table>
        </div>
        </>
    )
}

export default Viajes;