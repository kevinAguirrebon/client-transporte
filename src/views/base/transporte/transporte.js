import React,{ useState } from 'react';
import axios from '../../../axios/axios';
import Swal from 'sweetalert2';
import TablaTransporte from './tablaTransporte';

const Transporte = () => {
    const [pomas,setPomas] = useState([]);
    const [fecha,setFecha] = useState({fecha: null});

    const getTransportePoma = async () => {
        try {
            if(fecha.fecha){
            const request = await axios.get('api/alineacion',{
                params: {id: fecha.fecha}
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
            <h1 className="pt-2 pb-3">Programa diario</h1>
            <form>
                <div className="d-flex justify-content-start">
                    <label className="col-form-label col-sm-1">Fecha:</label>
                    <input type="date" placeholder="" name="fecha" className="form-control col-sm-2 mx-2" onChange={({target})=> setFecha({...fecha,[target.name] : target.value})}/>
                    <button type="button" className="btn btn-primary" onClick={()=>getTransportePoma()}>Buscar</button>
                </div>
            </form>
            <TablaTransporte data={pomas} fecha={fecha.fecha}/>
        </>
    )
}

export default Transporte;