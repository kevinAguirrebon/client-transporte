import React, { useState, useEffect } from 'react';

const TableRutas = ({data,deleteRuta,editRuta,createRuta,setSearchInput,search}) => {

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
                    <tr style={{background: '#E9ECEF',border: '1px solid #000'}}>
                        <th colSpan="2"> <button className="btn btn-secondary mx-2" data-toggle="modal" data-target="#modal-default" onClick={() => { createRuta() }}>Crear viaje</button></th>
                        <th colSpan="3"><input type="text" className="form-control" value={search} onPaste={setSearchInput} onChange={setSearchInput} placeholder="Buscar..."></input></th>
                        <th className="text-center">Fincas por visitar</th>
                        <th className="text-center" style={{verticalAlign: 'middle'}} rowSpan="2">Acciones</th>
                    </tr>
                    <tr style={{background: '#239B56'}}>
                        <th style={{color: '#FFF',verticalAlign: 'middle'}}>Id</th>
                        <th style={{color: '#FFF', verticalAlign: 'middle'}}>Fecha</th>
                        <th style={{color: '#FFF',verticalAlign: 'middle'}} >Camión</th>
                        <th style={{color: '#FFF',verticalAlign: 'middle'}} >Documento</th>
                        <th style={{color: '#FFF',verticalAlign: 'middle'}} >Conductor</th>
                        <th style={{color: '#FFF'}}>Fincas</th>
                    </tr>
                </thead>
                <tbody>
                    {
                         pagination.data.length > 0 ? pagination.data.map((ruta,index) => (
                        <tr key={ruta.id}>
                            <td>{ruta.id}</td>
                            <td>{ruta.fecha}</td>
                            <td>{ruta.camion}</td>
                            <td>{ruta.conductor}</td>
                            <td>{ruta.nombre}</td>
                            <td className="td_alineacion">
                                <table className="table table-sm">
                                    <tbody style={{background: '#F4F6F9'}}>
                                        {
                                            ruta.rutas_det.length > 0 && ruta.rutas_det.map(element => {
                                                return (
                                                        <tr key={element.id}>
                                                            <td style={{width: '150px'}}>{element.descripcion}</td>
                                                        </tr>
                                                    )
                                                }
                                                
                                            )
                                        }
                                        
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <button className="btn btn-info btn-sm mx-2" data-toggle="modal" data-target="#modal-default" onClick={() => { editRuta(ruta.id) }}>Editar</button>
                                <button className="btn btn-danger btn-sm" onClick={()=>{ deleteRuta(ruta.id)}}>Eliminar</button>
                            </td>
                        </tr>
                        )): <tr>
                                <td colSpan="9" className="text-center"><h3>No hay rutas registradas</h3></td>
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
export default TableRutas;