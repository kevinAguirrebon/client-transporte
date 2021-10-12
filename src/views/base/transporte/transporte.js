import React,{ useState } from 'react';
import axios from '../../../axios/axios';
import Swal from 'sweetalert2';
import TablaTransporte from './tablaTransporte';

const Transporte = () => {
    const [pomas,setPomas] = useState([]);
    const [date,setDate] = useState(null);
    const getTransportePoma = async (fecha) => {
        setDate(fecha);
        try {
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
        }else{

        }
    
        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <div className="jumbotron py-3 mb-0 mt-1">
                <div className="container text-center">
                    <h1>Programa diario</h1>
                </div>
            </div>

            <TablaTransporte data={pomas} fecha={date} handleChange={getTransportePoma}/>
        </>
    )
}

export default Transporte;