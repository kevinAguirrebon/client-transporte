import React from 'react';

const Transporte = () => {
    return (
        <>
            <h1 className="py-2">Programa diario</h1>
            <form>
                <div className="d-flex justify-content-start">
                    <label className="col-form-label col-sm-1">Fecha:</label>
                    <input type="date" placeholder="" className="form-control col-sm-2 mx-2"/>
                    <button className="btn btn-primary">Buscar</button>
                </div>
            </form>
        </>
    )
}

export default Transporte;