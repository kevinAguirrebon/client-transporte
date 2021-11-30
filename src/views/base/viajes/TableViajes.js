import React, { useState, useEffect } from 'react';

const TableViajes = ({data,deleteViaje,editViaje}) => {

    const [pagination, setPagination] = useState({
        perPage: 10,
        index: null,
        page: 1,
        total_camiones: null,
        data: [],
        limit: null,
        component_item: []
    });

    const changePage = (index) =>{
        let indexFin = (index * pagination.perPage);
        let indexInit = indexFin - pagination.perPage;
        let filtered = data.slice(indexInit, indexFin);
        let limit = Math.ceil((data.length / pagination.perPage));
        const limit_data = [];
        let i = (index > 5) ? index - 4 : 1;      
        if(i !== 1){
            limit_data.push({name: '...', value: i })
        }
        for (; (i <= index + 4) && i <= limit; i++) {
            limit_data.push({name: i, value: i })
            if(i === index + 4 && i <= limit){
                limit_data.push({name: '...', value: i })
            }
        }
        setPagination({...pagination, index: indexInit, data: filtered, total_camiones: data.length, page: index, limit: limit, component_item: limit_data});
    }

    useEffect(()=>{
        const initTable = (index) =>{
            let perPage = 10;
            let indexFin = (index * perPage);
            let indexInit = indexFin - perPage;
            let filtered = data.slice(indexInit, indexFin);
            let limit = Math.ceil((data.length / perPage));
            const limit_data = [];
            let i = (index > 5) ? index - 4 : 1;      
            if(i !== 1){
                limit_data.push({name: '...', value: i })
            }
            for (; (i <= index + 4) && i <= limit; i++) {
                limit_data.push({name: i, value: i })
                if(i === index + 4 && i <= limit){
                    limit_data.push({name: '...', value: i })
                }
            }
            setPagination({perPage: perPage,index: indexInit, data: filtered, total_camiones: data.length, page: index, limit: limit, component_item: limit_data});
        }
        initTable(1)
    },[data])

    return (
        <>
        <table className="table table-sm table-bordered">
                <thead>
                    <tr style={{background: '#239B56'}}>
                        <th style={{color: '#FFF'}}>Id</th>
                        <th style={{color: '#FFF'}}>Fecha</th>
                        <th style={{color: '#FFF'}} >Camión</th>
                        <th style={{color: '#FFF'}} >Documento</th>
                        <th style={{color: '#FFF'}} >Conductor</th>
                        <th style={{color: '#FFF'}}>Ruta</th>
                        <th style={{color: '#FFF'}}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                         pagination.data.length > 0 ? pagination.data.map((viaje) => (
                        <tr key={viaje.id}>
                            <td>{viaje.id}</td>
                            <td>{viaje.fecha}</td>
                            <td>{viaje.placa_id}</td>
                            <td>{viaje.conductor_id}</td>
                            <td>{viaje.nombre}</td>
                            <td>{viaje.ruta_id}</td>
                            <td>
                                <button className="btn btn-info btn-sm mx-2" data-toggle="modal" data-target="#modal-default" onClick={() => { editViaje(viaje.id) }}>Editar</button>
                                <button className="btn btn-danger btn-sm" onClick={()=>{ deleteViaje(viaje.id)}}>Eliminar</button>
                            </td>
                        </tr>
                        )): <tr>
                                <td colSpan="9" className="text-center"><h3>No hay viajes registradas</h3></td>
                            </tr>

                    }
                </tbody>
            </table>
            {
                data.length > 0  && 
                <nav aria-label="..." className="mx-0 my-0">
                    <ul className="pagination">
                        <li className={`page-item ${ pagination.page <= 1 && 'disabled'}`}>
                            <button className="page-link" aria-disabled="true" onClick={()=>changePage(1)}>Incio</button>
                        </li>
                        {
                            pagination.component_item.map(({name,value},index) => <li key={index} className={`page-item ${pagination.page === value && 'active'}`}><button className="page-link" onClick={()=>changePage(value)}>{name}</button></li>)
                        }
                        <li className={`page-item ${ pagination.page >= pagination.limit  && 'disabled'}`}>
                            <button className="page-link" onClick={()=>changePage(pagination.limit)}>fin</button>
                        </li>
                    </ul>
             </nav>
            }
            </>
    )
}
export default TableViajes;