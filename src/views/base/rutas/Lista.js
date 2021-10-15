import React, { useState, useEffect } from 'react';
import getFecha from '../../../helpers/fecha'
const Lista = ({data,getData,fecha}) => {
    
    const [horas, setHoras] = useState([]);
    const [placa, setPlaca] = useState([]);
    const [newData, setNewData] = useState([]);
 
    const changePlaca = (target) => {
        let placa = target.value;
        const filterForHora =  removeItemRepeatHora(horas,placa);
        const filterForOrden =  removeItemRepeatOrden(filterForHora);
        const finalOperation =  removeItemRepeatHoraReducer(horas,filterForOrden,placa);
        setNewData(finalOperation)
    }

    const removeItemRepeatHora = (dataHoras,placaActual) => {
        const filterForHora = [];
        dataHoras.map(element => {
            const ItemsTabla = data.filter(({hora,placa})=>{
                if(placaActual === placa && element == hora) {
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
        dataHoras.map(element => {
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
        datosOrden.map(element => {
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

    useEffect(()=>{
        const placa_viaje = [];
        data.map(({placa})=>{
            const placaUpercase = placa.toUpperCase();
            if(!placa_viaje.includes(placaUpercase)){
                placa_viaje.push(placaUpercase)
            }
        })
        placa_viaje.sort();
        setPlaca(placa_viaje)
        //
        const horas_viaje = [];
        data.map(({hora})=>{
            if(!horas_viaje.includes(hora)){
                horas_viaje.push(hora)
            }
        })
        horas_viaje.sort();
        setHoras(horas_viaje);
    },[])

    useEffect(()=>{
        changePlaca({value: placa[0]})
    },[placa])

    return (
        <>
        <div className="jumbotron px-0  py-1 mb-0 d-block"  style={{color: '#000'}}>
            <h5 className="text-center">Ruta de Camiones <p style={{fontSize: '15px', color: '#000'}}> { getFecha(fecha) }</p></h5>
        </div>
        <div className="my-2 d-flex">
                    <div className="form-group d-flex my-0">
                        <label style={{padding: '4px'}}>Fecha: </label>
                        <input type="date" name="fecha_pomas" className="form-control" onChange={({target}) => { getData(target);
                            }}></input>
                    </div>
                    <div className="form-group d-flex my-0">
                    <label style={{padding: '4px'}}>Placa: </label>
                        <select name="placas" className="form-control mx-3" style={{width: '200px'}} onChange={({target}) =>changePlaca(target)}>
                        {
                            placa.map(item => <option value={item} >{item}</option>)
                        }   
                        </select>
                    </div>
        </div>
        <div className="table-responsive">
        <table className="table table-bordered">
            <tbody>
            <tr>
                <td>
                    <div className="d-flex"> { newData.length > 0 && newData.map((item,index) => (
                                <div className="cardMain" key={index}>
                                         <div className="headercard" style={{background: item.ultimo == 'NO'? '#3F6791': '#D2A957'}}>
                                            <h3 style={{color: '#FFF' }}>{ item.finca }</h3>
                                        </div>

                                        <div className="bodycard">
                                        <ul>
                                            <li>
                                                <h6>Conductor: <p>{ item.conductor }</p> </h6>
                                            </li>
                                            <li>
                                                <h6>Hora: <p style={{color: '#EE6D6D' }}>{ item.hora }</p> </h6>   
                                            </li>
                                            <li>
                                                <h6>Ultimo: <p>{ item.ultimo }</p> </h6>  
                                            </li>
                                            <li>
                                                <h6>Orden: <p>{ item.orden }</p> </h6>  
                                            </li>
                                            <li>
                                                <ul>
                                                    Buques:
                                                    { 
                                                    item.buque.map((item,index) => (
                                                        <li key={index}>{item}</li>
                                                   )) 
                                                }
                                                </ul>
                                            </li>
                                            
                                        </ul>  
                                        </div>
                                    </div>
                               
                                ))
                                    
                            }
                    </div>
                 </td>
                            </tr>
               
            </tbody>
        </table>
        </div>
        
        </>
    )
}

export default Lista;