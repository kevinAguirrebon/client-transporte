import React, { useState, useEffect } from 'react';

const TableRutas = ({data,clickDelete,updateRutas}) => {

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
        <table className="table table-sm table-bordered mb-0">
            <thead>
                <tr style={{background: '#229954'}}>
                    <th className="text-center" style={{color: '#FFF'}}>Id</th>
                    <th className="text-center" style={{color: '#FFF'}}>Fecha</th>
                    <th className="text-center" style={{color: '#FFF'}}>Fincas</th>
                    <th className="text-center" style={{color: '#FFF'}}>Orden</th>
                    <th className="text-center" style={{color: '#FFF'}}>Opciones</th>
                </tr>
            </thead>
            <tbody>
                {
                   pagination.data.length > 0 ? pagination.data.map(ruta => (
                        <tr key={ruta.id}>
                            <td className="text-center">{ruta.id}</td>
                            <td className="text-center">{ruta.fecha}</td>
                            <td className="td_alineacion" colSpan="2">
                                <table className="table table-sm">
                                    <tbody style={{background: '#F4F6F9'}}>
                                        {
                                            ruta.rutas_det.length > 0 && ruta.rutas_det.map(element => {
                                                return (
                                                        <tr key={element.id}>
                                                            <td style={{width: '150px'}}>{element.descripcion}</td>
                                                            <td style={{width: '150px'}} className="text-center">{element.orden}</td>
                                                        </tr>
                                                    )
                                                }
                                                
                                            )
                                        }
                                        
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <button className="btn btn-sm btn-info mx-2"  data-toggle="modal" data-target="#modal-default" onClick={()=> updateRutas(ruta.id)} >Editar</button>
                                <button className="btn btn-sm btn-danger" onClick={()=>clickDelete(ruta.id)}>Eliminar</button>
                            </td>
                        </tr>
                    )):  <tr>
                             <td colSpan="5" className="text-center"><h4>Información no encontrada</h4></td>
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