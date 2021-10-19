import React from 'react';
import formato_fecha from '../../../helpers/fecha'

const TablaTransporte = ({data,fecha,handleChange}) => {
    return (
        <table className="table table-striped table-sm table-bordered">
            <thead>
                <tr style={{background: '#6EBE5E'}}>
                    <th colSpan="2" className="text-center" style={{width: '32%'}}>
                        FECHA DE EMBARQUES ===={'>'}
                    </th>
                    <th className="px-0 py-0" style={{width: '16%'}}>
                        <input type="date" className="rounded-0 form-control" name="fecha" style={{paddingTop: '5px'}} onChange={({target})=>handleChange(target.value)}/>
                    </th>
                    <th colSpan="3" className="text-center" style={{width: '48%'}}>{formato_fecha(fecha)}</th>
                </tr>
                <tr style={{background: '#2E86C1'}} >
                    <th className="text-center" style={{color: '#FFF'}}>Código</th>
                    <th className="text-center" style={{color: '#FFF'}}>Finca</th>
                    <th className="text-center" style={{color: '#FFF'}}>Pallets Alineados</th>
                    <th className="text-center" style={{color: '#FFF'}}>Pallets Reales</th>
                    <th className="text-center" style={{color: '#FFF'}}>Pallets Recogidos</th>
                    <th className="text-center" style={{color: '#FFF'}}>Pallets Restantes</th>
                </tr>
            </thead>
            <tbody>
                { 
                data.length > 0 ? data.map(({codigo_finca,finca,avance,recogidas,restantes,alineacion})=>{
                    return (
                        <tr key={codigo_finca}>
                        <td className="text-center">{codigo_finca}</td>
                        <td className="text-center">{finca}</td>
                        <td className="text-center">{alineacion}</td>
                        <td className="text-center">{avance}</td>
                        <td className="text-center">{recogidas}</td>
                        <td className="text-center">{restantes}</td>
                        </tr>
                    )
                }):
               <tr>
                   <td colSpan="6" className="text-center"><h4>Información no encontrada</h4></td>
               </tr>
            }
                 
            </tbody>
        </table>
    )
}

export default TablaTransporte;