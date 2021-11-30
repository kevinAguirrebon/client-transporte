import React, { useEffect } from 'react';

const TableControl = ({filterd,dataCamiones,alineacion,data_final,setData_final}) => {

    useEffect(() => {
        const data = []; 
        const placa = filterd.map(({placa_id}) =>  placa_id.toUpperCase());
        const placas = Array.from(new Set(placa));
        placas.forEach(placa_id => {
            const data_repetida = filterd.filter(element => element.placa_id.toUpperCase() === placa_id);
            if(data_repetida.length > 0){
                let count = 0;
                data_repetida.forEach(element => {
                    count++;
                    data.push({
                        ...element, count: count
                    })
                })
            }
        })
        setData_final(data);
    },[filterd,setData_final])


    return (
        <table className="table table-bordered table-sm">
            <thead>
                <tr style={{background: '#2E86C1'}}>
                    <th className="text-center" style={{color: '#FFF'}}>Id</th>
                    <th className="text-center" style={{color: '#FFF'}}>Fecha</th>
                    <th className="text-center" style={{color: '#FFF'}}>Placa</th>
                    <th className="text-center" style={{color: '#FFF'}}>Conductor</th>
                    <th className="text-center" style={{color: '#FFF'}}>Nombre</th>
                    <th className="text-center" style={{width: '200px',color: '#FFF'}}>Fincas</th>
                    <th className="text-center" style={{color: '#FFF'}}>Alineación</th>
                    <th className="text-center" style={{color: '#FFF'}}>Total</th>
                    <th className="text-center" style={{color: '#FFF'}}>Estado</th>
                    <th className="text-center" style={{color: '#FFF'}}>Cant. Viajes</th>
                    <th className="text-center" style={{color: '#FFF'}}>Cola</th>
                </tr>
            </thead>
            <tbody>
            {
                data_final.length > 0 ? data_final.map((viaje) => {
                    let total_alineacion = 0;
                    let capacidad = 0;
                    let pallets = dataCamiones.find(({placa}) => placa === viaje.placa_id);
                    if(pallets){
                        capacidad = pallets.capacidad;
                    }
                    return (
                        <tr key={viaje.id}>
                            <td className="text-center">{viaje.id}</td>
                            <td >{viaje.fecha}</td>
                            <td >{viaje.placa_id}</td>
                            <td >{viaje.conductor}</td>
                            <td >{viaje.nombre}</td>
                            <td className="td_alineacion" colSpan="2">
                                <table className="table table-sm">
                                    <tbody style={{background: '#F4F6F9'}}>
                                        {
                                            viaje.rutas_det.length > 0 && viaje.rutas_det.map(element => {
                                                const data = alineacion.find(({codigo_finca}) => codigo_finca === element.finca_id);
                                                if(data){
                                                    total_alineacion += parseFloat(data.restantes);
                                                }
                                                return (
                                                    <tr key={element.id} >
                                                        <td style={{width: '200px'}}>{element.finca}</td>
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
                            <th className="text-center">{ Math.floor((total_alineacion? total_alineacion : 0) / (capacidad ? capacidad : 0))}</th>
                            <th className='text-center'>{ viaje.count === 1 ? <button type="button" className="btn"><i className="fas fa-check-circle"></i></button> : <button type="button" className="btn" disabled={true}><i className="fas fa-circle"></i></button>}</th>
                        </tr>
                )}): <tr>
                        <td colSpan="9" className="text-center"><h3>No hay viajes registradas</h3></td>
                    </tr>
                    }
            </tbody>
        </table>
    )
}

export default TableControl;