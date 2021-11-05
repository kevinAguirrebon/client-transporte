import React,{ useState } from 'react';
import axios from '../../../axios/axios';
import Swal from 'sweetalert2';
import TablaTransporte from './tablaTransporte';

const Transporte = () => {
    const [pomas,setPomas] = useState([]);
    const [date,setDate] = useState(null);
    const [loading,setLoading] = useState(false);
    const getTransportePoma = async (fecha) => {
        if(fecha){
            setDate(fecha);
            try {
                setLoading(true);
                if(fecha){
                const request = await axios.get('api/alineacion',{
                    params: {id: fecha}
                });
                const response = await request.data;
                if(response.status === true){
                    setPomas(response.data);
                }else{
                    Swal.fire({
                        title: response.message,
                        icon: 'warning',
                        confirmButtonText: 'ok'
                    })
                }
                }}catch(err){
                    console.log(err)
            }
            setLoading(false); 
        }else{
            Swal.fire({
                title: 'Seleccione una fecha',
                icon: 'warning',
                confirmButtonText: 'ok'
            })
        } 
    }

    return (
        <>
        <div className="jumbotron py-3 mb-0 mt-1">
            <div className="d-flex justify-content-center">
                <h1 className="mx-2">Programa diario</h1>
                <button className="btn btn-success" onClick={() => getTransportePoma(date)}><i className="fas fa-redo"></i></button>
                {
                    loading && <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                }
            </div>
        </div>
        <TablaTransporte data={pomas} fecha={date} handleChange={getTransportePoma} loading={loading}/>
        </>
    )
}

export default Transporte;