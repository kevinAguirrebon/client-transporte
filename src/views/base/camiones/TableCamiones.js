import React from 'react';
import { deleteCamion,getCamion } from '../../../redux/reducerCamiones/camiones';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';


const Table  = ({data}) => {
    const dispatch = useDispatch();
    const btnEliminar = (id) => {
        Swal.fire({
            title: '¿Quieres eliminar este camión?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(deleteCamion(id));
            }
        });
	};

    return (
        <table className="table table-striped table-sm mt-3 table-bordered">
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
                data.length > 0 ? data.map(({placa,tipo_camion,capacidad,fecha_registro})=>{
                    return (
                        <tr>
                        <td className="text-center">{placa}</td>
                        <td className="text-center">{tipo_camion}</td>
                        <td className="text-center">{capacidad}</td>
                        <td className="text-center">{fecha_registro}</td>
                        <td className="text-center">
                            <div className="container">
                                <button className="btn btn-info mx-2" data-toggle="modal" data-target="#modal-default" onClick={()=> {
                                        //setSaveOrUpdate(2);
                                        dispatch(getCamion(placa))}
                                    }><i className="far fa-edit"></i></button> 
                                     <button className="btn btn-danger" onClick={()=>btnEliminar(placa)}><i className="far fa-trash-alt"></i></button>
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
    );
}

export default Table;
