import React from 'react';

const Rutas = () => {
    return (
        <div>
            <div className="jumbotron px-0  py-1 mb-0 d-block"  style={{color: '#000'}}>
                <h5 className="text-center mb-0">Rutas<p className="mb-1" style={{fontSize: '15px', color: '#000'}}> 2021 - 11 - 03 </p></h5>
            </div>
            <div className="my-2 d-flex">
                <div className="form-group d-flex my-0">
                    <label style={{padding: '4px'}}>Fecha: </label>
                    <input type="date" name="fecha_pomas" className="form-control"></input>
                </div>
                <div className="form-group d-flex my-0">
                <label style={{padding: '4px'}}>Ruta: </label>
                    <select name="placas" className="form-control mx-3" style={{width: '200px'}} >  
                        <option value="">Ruta 1</option>
                        <option value="">Ruta 2</option>
                        <option value="">Ruta 3</option>
                    </select>
                </div>
            </div>
            <div className="my-2">
                <button className="btn btn-secondary">Crear ruta</button>
            </div>
            <table className="table table-sm table-bordered">
                <thead>
                    <tr style={{background: '#2E86C1'}}>
                        <th style={{color: '#FFF'}}>Id</th>
                        <th style={{color: '#FFF'}}>Fecha</th>
                        <th style={{color: '#FFF'}}>Camión</th>
                        <th style={{color: '#FFF'}}>Conductor</th>
                        <th className="text-center" style={{color: '#FFF'}}>Pallets Alineación</th>
                        <th className="text-center" style={{color: '#FFF'}}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2021-11-05</td>
                        <td>T45DSF</td>
                        <td>Kevin Andres Aguirre Bonilla</td>
                        <td className="td_alineacion">
                            <table className="table">
                                <thead>
                                    <tr style={{background: '#6EBE5E'}}>
                                        <th style={{color: '#FFF'}}>Fincas</th>
                                        <th style={{color: '#FFF'}}>Disponibles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ACACIAS</td>
                                        <td>12</td>
                                    </tr>
                                    <tr>
                                        <td>PETRA</td>
                                    <td>12</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <button className="btn btn-primary">Editar</button>
                            <button className="btn btn-danger">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

}

export default Rutas;