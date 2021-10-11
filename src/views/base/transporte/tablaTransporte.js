import React from 'react';

const TablaTransporte = ({data,fecha}) => {
    return (
        <table className="table table-striped table-sm mt-4 table-bordered">
            <thead>
                <tr style={{background: '#6EBE5E'}}>
                    <th colSpan="3" className="text-center">{`FECHA DE EMBARQUES ===>`}</th>
                    <th colSpan="2" className="text-center">{fecha}</th>
                </tr>
                <tr style={{background: '#2E86C1'}} >
                    <th className="text-center" style={{color: '#FFF'}}>Código</th>
                    <th className="text-center" style={{color: '#FFF'}}>Finca</th>
                    <th className="text-center" style={{color: '#FFF'}}>Avance</th>
                    <th className="text-center" style={{color: '#FFF'}}>Recogidas</th>
                    <th className="text-center" style={{color: '#FFF'}}>Restantes</th>
                </tr>
            </thead>
            <tbody>
                { 
                data.length > 0 ? data.map(({codigo_finca,finca,avance,recogidas,restantes})=>{
                    return (
                        <tr>
                        <td className="text-center">{codigo_finca}</td>
                        <td className="text-center">{finca}</td>
                        <td className="text-center">{avance}</td>
                        <td className="text-center">{recogidas}</td>
                        <td className="text-center">{restantes}</td>
                        </tr>
                    )
                }):
               <tr>
                   <td colSpan="5" className="text-center"><h4>Información no encontrada</h4></td>
               </tr>
            }
                 
            </tbody>
        </table>
    )
}

export default TablaTransporte;