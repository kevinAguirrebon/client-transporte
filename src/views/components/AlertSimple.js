import React from 'react';

const AlertSimple = ({tipo,icon,titulo,message}) =>{
    return (
        <div className="container">
            <div className={`alert alert-${tipo}`}>
                <h5><i className={icon} /> {titulo}!</h5><p>{message}</p>
            </div>
        </div>
    )
}

export default AlertSimple;