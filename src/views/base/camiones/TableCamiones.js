import { map } from 'jquery';
import React, { useState, useEffect} from 'react';
const Table  = ({data,ftn_eliminar,ftn_actualizar}) => {
    const page = {
        perPage: 3,
        index: null,
        page: 0,
        total_camiones: 0,
        data: [],
        limit: []
    }
    const [pagination, setPagination] = useState(page);
    const changePage = (index) =>{
        let indexFin = (index * pagination.perPage);
        let indexInit = indexFin - pagination.perPage;
        let filtered = data.slice(indexInit, indexFin);
        let data_limit = Math.ceil((data.length / pagination.perPage));
        const limit = [];
        for (let index = 0; index < data_limit; index++) {
            limit.push(index + 1);
        }
        setPagination({...pagination, index: indexInit, data: filtered, total_camiones: data.length, page: index, limit: limit});
    
    }
    useEffect(() =>{
        changePage(1)
    },[data])

    return (
        <>
        <table className="table table-striped table-sm table-bordered mb-0">
            <thead>
                <tr style={{background: '#2E86C1'}} >
                    <th className="text-center" style={{color: '#FFF'}}>Placa</th>
                    <th className="text-center" style={{color: '#FFF'}}>Tipo_camion</th>
                    <th className="text-center" style={{color: '#FFF'}}>Capacidad</th>
                    <th className="text-center" style={{color: '#FFF'}}>Fecha</th>
                    <th className="text-center" style={{color: '#FFF'}}>Opciones</th>
                </tr>
            </thead>
            <tbody>
                { 
                pagination.data.length > 0 ? pagination.data.map(({placa,tipo_camion,capacidad,fecha_registro})=>{
                    return (
                        <tr key={placa}>
                        <td className="text-center">{placa}</td>
                        <td className="text-center">{tipo_camion}</td>
                        <td className="text-center">{capacidad}</td>
                        <td className="text-center">{fecha_registro}</td>
                        <td className="text-center">
                            <div className="container">
                                <button className="btn btn-info mx-2" data-toggle="modal" data-target="#modal-default" onClick={()=> ftn_actualizar(placa)}>
                                    <i className="far fa-edit"></i></button> 
                                <button className="btn btn-danger" onClick={()=>ftn_eliminar(placa)}><i className="far fa-trash-alt"></i></button>
                            </div>
                        </td>
                        </tr>
                    )
                }):
               <tr>
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
                        <a className="page-link" href="#" aria-disabled="true" onClick={()=>changePage(1)}>Previous</a>
                    </li>
                    {
                        pagination.page > 2 && <li className="page-item"><a className="page-link" href="#">...</a></li>
                    }
                    {
                        pagination.limit && pagination.limit.map(index => {
                            if(pagination.page > 4 && pagination.page)
                            return  <li className="page-item"><a className="page-link" href="#" onClick={()=>changePage(index)}>{index}</a></li>
                        })
                    }
                    {
                       pagination.page < 2 && <li className="page-item"><a className="page-link" href="#">...</a></li> 
                    }
                    <li className={`page-item ${ pagination.page >= pagination.limit.length  && 'disabled'}`}>
                        <a className="page-link" href="#" onClick={()=>changePage(pagination.limit.length)}>Next</a>
                    </li>
                </ul>
         </nav>
        }
        </>
    );
}

export default Table;
