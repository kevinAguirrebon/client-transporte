import React,{ useState, useEffect} from 'react';
import TablaTransporte from './tablaTransporte';
import fecha_format from '../../../helpers/format_fecha'
import { getAlineacion } from '../../../redux/reducerViajes/reducerViajes';
import { useDispatch,useSelector } from 'react-redux';

const Transporte = () => {
    const dispatch = useDispatch();
    const [date,setDate] = useState("");
    const [loading,setLoading] = useState(false);
    const data = useSelector(store => store.viajes.alineacion);

    useEffect(()=>{
        const fecha = fecha_format();
        setDate(fecha); 
       dispatch(getAlineacion(fecha));
    },[dispatch])

    const getTransportePoma = async (fecha) => {
        setDate(fecha);
        setLoading(true);
        dispatch(getAlineacion(fecha))
        setLoading(false);
    }

    return (
        <>
        <div className="jumbotron py-2 mb-0 mt-1">
            <div className="d-flex justify-content-center">
                <h3 className="mx-1">Programa diario</h3>
                <button className="btn btn-secondary" onClick={() => getTransportePoma(date)}><i className="fas fa-redo"></i></button>
                {
                    loading && <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                }
            </div>
        </div>
            <TablaTransporte data={data} fecha={date} handleChange={getTransportePoma} loading={loading}/>
        </>
    )
}

export default Transporte;