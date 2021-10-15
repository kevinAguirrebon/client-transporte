import React,{useState} from 'react';
import Lista from './Lista';

const Rutas = () => {
    const [fecha,setFecha] = useState();

    const data = [
        {id: 112121, hora: '12:16', buque: 1149, conductor: '71934469',   placa:   'VXC187',   finca:  'PETRA', embarcadero: 'COLONIA', orden: 1, ultimo: 'NO'},
        {id: 112395, hora: '20:25', buque: 1148, conductor: '71934469',   placa:   'VXC187',   finca:  'PROVIDENCIA', embarcadero: 'COLONIA', orden: 3, ultimo: 'SI'},
        {id: 112419, hora: '12:10', buque: 1149, conductor: '1040351672', placa:  'LHE091',   finca: 'SULTANA', embarcadero: 'COLONIA', orden: 1, ultimo: 'NO'},
        {id: 112420, hora: '15:40', buque: 1149, conductor: '1040351672', placa:  'LHE091',   finca: 'SULTANA', embarcadero: 'COLONIA', orden: 2, ultimo: 'NO'},
        {id: 112421, hora: '18:50', buque: 1149, conductor: '71930425',   placa:   'LAG763',   finca:  'SULTANA', embarcadero: 'COLONIA', orden: 3, ultimo: 'SI'},
        {id: 112422, hora: '18:50', buque: 1151, conductor: '71930425',   placa:   'LAG763',   finca:  'SULTANA', embarcadero: 'COLONIA', orden: 3, ultimo: 'SI'},
        {id: 112518, hora: '13:55', buque: 1149, conductor: '98467229',   placa:   'MML064',   finca:  'CLAUDIA SOFIA', embarcadero: 'COLONIA', orden: 1, ultimo: 'NO'},
        {id: 112519, hora: '17:20', buque: 1149, conductor: '98704485',   placa:   'SRY914',   finca:  'CLAUDIA SOFIA', embarcadero: 'COLONIA', orden: 2, ultimo: 'NO'},
        {id: 112520, hora: '17:20', buque: 1148, conductor: '98704485',   placa:   'SRY914',   finca:  'CLAUDIA SOFIA', embarcadero: 'COLONIA', orden: 2, ultimo: 'NO'},
        {id: 112393, hora: '20:25', buque: 1149, conductor: '71934469',   placa:   'VXC187',   finca:  'PROVIDENCIA', embarcadero: 'COLONIA', orden: 3, ultimo: 'SI'},
        {id: 112392, hora: '16:40', buque: 1149, conductor: '1040375309',   placa:  'TOD419',   finca: 'PROVIDENCIA', embarcadero: 'COLONIA', orden: 2, ultimo: 'NO'},
        {id: 112122, hora: '17:52', buque: 1149, conductor: '71934469',   placa:   'VXC187',   finca:  'PETRA', embarcadero: 'COLONIA', orden: 2, ultimo: 'NO'},
        {id: 112123, hora: '19:00', buque: 1149, conductor: '15926214',   placa:   'XKB467',   finca:  'PETRA', embarcadero: 'COLONIA', orden: 3, ultimo: 'SI'},
        {id: 112124, hora: '19:00', buque: 1148, conductor: '15926214',   placa:   'XKB467',   finca:  'PETRA', embarcadero: 'COLONIA', orden: 3, ultimo: 'SI'},
        {id: 112271, hora: '13:12', buque: 1149, conductor: '71930425',   placa:   'LAG763',   finca:  'SANTA MARTA', embarcadero: 'COLONIA', orden: 1, ultimo: 'NO'},
        {id: 112272, hora: '15:50', buque: 1149, conductor: '71930425',   placa:   'lag763',   finca:  'SANTA MARTA', embarcadero: 'COLONIA', orden: 2, ultimo: 'NO'},
        {id: 112273, hora: '17:30', buque: 1149, conductor: '71930425',   placa:   'LAG763',   finca:  'SANTA MARTA', embarcadero: 'COLONIA', orden: 3, ultimo: 'SI'},
        {id: 112274, hora: '17:39', buque: 1148, conductor: '71930425',   placa:   'LAG763',   finca:  'SANTA MARTA', embarcadero: 'COLONIA', orden: 3, ultimo: 'SI'},
        {id: 112390, hora: '12:10', buque: 1149, conductor: '98467229',   placa:   'MML064',   finca:  'PROVIDENCIA', embarcadero: 'COLONIA', orden: 1, ultimo: 'NO'},
        {id: 112521, hora: '21:35', buque: 1149, conductor: '98704485',   placa:   'SRY914',   finca:  'CLAUDIA SOFIA', embarcadero: 'COLONIA', orden: 3, ultimo: 'SI'},
        {id: 112565, hora: '11:45', buque: 1149, conductor: '71940501',   placa:   'TMP322',   finca:  'MARGARITAS', embarcadero: 'COLONIA', orden: 1, ultimo: 'NO'},
        {id: 112566, hora: '15:06', buque: 1149, conductor: '71940501',   placa:   'TMP322',   finca:  'MARGARITAS', embarcadero: 'COLONIA', orden: 2, ultimo: 'NO'},
        {id: 112713, hora: '20:10', buque: 1148, conductor: '8338406',    placa:  'ufe341',    finca: 'FLORIDA', embarcadero: 'COLONIA', orden: 2, ultimo: 'SI'},
        {id: 112757, hora: '11:40', buque: 1149, conductor: '71934469',   placa:   'VXC187',   finca: 'REPRESA', embarcadero: 'COLONIA', orden: 1, ultimo: 'NO'},
        {id: 112759, hora: '16:40', buque: 1149, conductor: '71934469',   placa:   'XKB467',   finca:  'REPRESA', embarcadero: 'COLONIA', orden: 2, ultimo: 'NO'},
        {id: 112760, hora: '19:20', buque: 1149, conductor: '15926214',   placa:   'XKB467',   finca:  'REPRESA', embarcadero: 'COLONIA', orden: 3, ultimo: 'NO'},
        {id: 112761, hora: '20:20', buque: 1149, conductor: '15926214',   placa:   'XKB467',   finca:  'REPRESA', embarcadero: 'COLONIA', orden: 4, ultimo: 'SI'},
        {id: 112762, hora: '20:20', buque: 1148, conductor: '15926214',   placa:   'XKB467',   finca:  'REPRESA', embarcadero: 'COLONIA', orden: 4, ultimo: 'SI'},
        {id: 112901, hora: '22:00', buque: 1149, conductor: '1040371601',   placa:  'pei485',   finca: 'ACACIAS', embarcadero: 'COLONIA', orden: 3, ultimo: 'SI'},
        {id: 112902, hora: '22:00', buque: 1149, conductor: '1040371601',   placa:  'pei485',   finca: 'ACACIAS', embarcadero: 'COLONIA', orden: 3, ultimo: 'SI'},
        {id: 112712, hora: '20:10', buque: 1149, conductor: '8338406',    placa:  'ufe341',    finca: 'FLORIDA', embarcadero: 'COLONIA', orden: 2, ultimo: 'SI'},
        {id: 112711, hora: '16:00', buque: 1149, conductor: '71934469',   placa:   'VXC187',   finca:  'FLORIDA', embarcadero: 'COLONIA', orden: 2, ultimo: 'NO'},
        {id: 112567, hora: '17:32', buque: 1148, conductor: '71940501',   placa:   'TMP322',   finca:  'MARGARITAS', embarcadero: 'COLONIA', orden: 3, ultimo: 'SI'},
        {id: 112568, hora: '17:29', buque: 1149, conductor: '71940501',   placa:   'TMP322',   finca:  'MARGARITAS', embarcadero: 'COLONIA', orden: 3, ultimo: 'SI'},
        {id: 112618, hora: '11:20', buque: 1149, conductor: '1027944557',   placa:  'VOV304',   finca: 'RAICES', embarcadero: 'COLONIA', orden: 1, ultimo: 'NO'},
        {id: 112619, hora: '14:14', buque: 1149, conductor: '1027944557',   placa:  'VOV304',   finca: 'RAICES', embarcadero: 'COLONIA', orden: 2, ultimo: 'NO'},
        {id: 112621, hora: '17:10', buque: 1149, conductor: '1027944557',   placa:  'VOV304',   finca: 'RAICES', embarcadero: 'COLONIA', orden: 3, ultimo: 'NO'},
        {id: 112622, hora: '19:40', buque: 1148, conductor: '1027944557',   placa:  'VOV304',   finca: 'RAICES', embarcadero: 'COLONIA', orden: 4, ultimo: 'SI'},
        {id: 112623, hora: '19:40', buque: 1149, conductor: '1027944557',   placa:  'VOV304',   finca: 'RAICES', embarcadero: 'COLONIA', orden: 4, ultimo: 'SI'},
        {id: 112710, hora: '12:00', buque: 1149, conductor: '98704485',   placa:   'SRY914',   finca:  'FLORIDA', embarcadero: 'COLONIA', orden: 1, ultimo: 'NO'},
        {id: 112903, hora: '22:00', buque: 1148, conductor: '1040371601',   placa:  'pei485',   finca: 'ACACIAS', embarcadero: 'COLONIA', orden: 3, ultimo: 'SI'},
        {id: 112081, hora: '20:30', buque: 1149, conductor: '1027944557',   placa:  'VOV304',   finca: 'RANCHO ALEGRE', embarcadero: 'COLONIA', orden: 4, ultimo: 'SI'},
        {id: 109164, hora: '11:54', buque: 1149, conductor: '1040375309',   placa:  'TOD419',   finca: 'CEIBA', embarcadero: 'ZUNGO', orden: 1, ultimo: 'NO'},
        {id: 109847, hora: '12:20', buque: 1149, conductor: '1040371601',   placa:  'PEI485',   finca: 'ACACIAS', embarcadero: 'COLONIA', orden: 1, ultimo: 'NO'},
        {id: 109848, hora: '12:20', buque: 1148, conductor: '1040371601',   placa:  'PEI485',   finca: 'ACACIAS', embarcadero: 'COLONIA', orden: 1, ultimo: 'NO'},
        {id: 109849, hora: '16:40', buque: 1149, conductor: '1040371601',   placa:  'pei485',   finca: 'ACACIAS', embarcadero: 'COLONIA', orden: 2, ultimo: 'NO'},
        {id: 109850, hora: '16:40', buque: 1148, conductor: '98467229',   placa:   'mml064',   finca:  'ACACIAS', embarcadero: 'COLONIA', orden: 2, ultimo: 'NO'},
        {id: 110839, hora: '15:44', buque: 1150, conductor: '71937773',   placa:   'SBK973',   finca:  'COSTA RICA', embarcadero: 'COLONIA', orden: 1, ultimo: 'NO'},
        {id: 110840, hora: '15:45', buque: 1148, conductor: '71937773',   placa:   'SBK973',   finca:  'COSTA RICA', embarcadero: 'COLONIA', orden: 1, ultimo: 'NO'},
        {id: 110841, hora: '19:40', buque: 1149, conductor: '71937773',   placa:   'SBK973',   finca:  'COSTA RICA', embarcadero: 'COLONIA', orden: 2, ultimo: 'SI'},
        {id: 111347, hora: '19:30', buque: 1149, conductor: '1040375309',   placa:  'TOD419',   finca: 'CAREPA', embarcadero: 'COLONIA', orden: 1, ultimo: 'SI'},
        {id: 109726, hora: '17:50', buque: 1148, conductor: '71241526',   placa:   'TKG229',   finca:  'MAJAGUA', embarcadero: 'COLONIA', orden: 1, ultimo: 'SI'},
        {id: 109725, hora: '17:50', buque: 1149, conductor: '71241526',   placa:   'TKG229',   finca:  'MAJAGUA', embarcadero: 'COLONIA', orden: 1, ultimo: 'SI'},
        {id: 109165, hora: '16:45', buque: 1149, conductor: '8338406',    placa:  'ufe341',    finca: 'CEIBA', embarcadero: 'COLONIA', orden: 2, ultimo: 'NO'},
        {id: 109166, hora: '19:30', buque: 1149, conductor: '98467229',   placa:   'MML064',   finca:  'CEIBA', embarcadero: 'COLONIA', orden: 3, ultimo: 'SI'},
        {id: 109167, hora: '19:30', buque: 1148, conductor: '98467229',   placa:   'MML064',   finca:  'CEIBA', embarcadero: 'COLONIA', orden: 3, ultimo: 'SI'},
        {id: 109303, hora: '11:31', buque: 1149, conductor: '1040375309',   placa:  'UFE341',   finca: 'BANANAL 2', embarcadero: 'COLONIA', orden: 1, ultimo: 'NO'},
        {id: 109304, hora: '16:10', buque: 1149, conductor: '8338406',    placa:  'UFE341',    finca: 'BANANAL 2', embarcadero: 'COLONIA', orden: 2, ultimo: 'NO'},
        {id: 109305, hora: '16:10', buque: 1148, conductor: '8338406',    placa:  'UFE341',    finca: 'BANANAL 2', embarcadero: 'COLONIA', orden: 2, ultimo: 'NO'},
        {id: 109306, hora: '20:20', buque: 1149, conductor: '8338406',    placa:  'UFE341',    finca: 'BANANAL 2', embarcadero: 'COLONIA', orden: 3, ultimo: 'SI'},
        {id: 109307, hora: '20:20', buque: 1148, conductor: '8338406',    placa:  'UFE341',    finca: 'BANANAL 2', embarcadero: 'COLONIA', orden: 3, ultimo: 'SI'},
        {id: 111348, hora: '19:30', buque: 1148, conductor: '1040375309',   placa:  'TOD419',   finca: 'CAREPA', embarcadero: 'COLONIA', orden: 1, ultimo: 'SI'},
        {id: 111684, hora: '14:10', buque: 1149, conductor: '71937773',   placa:   'sbk973',   finca:  'REVANCHA', embarcadero: 'COLONIA', orden: 1, ultimo: 'NO'},
        {id: 111685, hora: '17:30', buque: 1149, conductor: '71937773',   placa:   'SBK973',   finca:  'REVANCHA', embarcadero: 'COLONIA', orden: 2, ultimo: 'NO'},
        {id: 111842, hora: '18:50', buque: 1148, conductor: '6283996',    placa:  'EA0591',    finca: 'MATEGUADUA', embarcadero: 'COLONIA', orden: 2, ultimo: 'SI'},
        {id: 111896, hora: '14:40', buque: 1149, conductor: '98704485',   placa:   'sry914',   finca:  'LAS DELICIAS', embarcadero: 'COLONIA', orden: 1, ultimo: 'NO'},
        {id: 111897, hora: '18:15', buque: 1149, conductor: '1040351672', placa:  'LHE091',   finca: 'LAS DELICIAS', embarcadero: 'COLONIA', orden: 2, ultimo: 'NO'},
        {id: 111898, hora: '19:50', buque: 1149, conductor: '71934469',   placa:   'VXC187',   finca:  'LAS DELICIAS', embarcadero: 'COLONIA', orden: 3, ultimo: 'SI'},
        {id: 111899, hora: '19:50', buque: 1148, conductor: '71934469',   placa:   'VXC187',   finca:  'LAS DELICIAS', embarcadero: 'COLONIA', orden: 3, ultimo: 'SI'},
        {id: 112077, hora: '12:10', buque: 1149, conductor: '1027944557',   placa:  'VOV304',   finca: 'RANCHO ALEGRE', embarcadero: 'COLONIA', orden: 1, ultimo: 'NO'},
        {id: 112078, hora: '15:20', buque: 1149, conductor: '1027944557',   placa:  'VOV304',   finca: 'RANCHO ALEGRE', embarcadero: 'COLONIA', orden: 2, ultimo: 'NO'},
        {id: 112079, hora: '15:20', buque: 1148, conductor: '1027944557',   placa:  'VOV304',   finca: 'RANCHO ALEGRE', embarcadero: 'COLONIA', orden: 2, ultimo: 'NO'},
        {id: 111841, hora: '18:50', buque: 1149, conductor: '6283996',    placa:  'EA0591',    finca: 'MATEGUADUA', embarcadero: 'COLONIA', orden: 2, ultimo: 'SI'},
        {id: 111840, hora: '14:50', buque: 1149, conductor: '71934469',   placa:   'VXC187',   finca:  'MATEGUADUA', embarcadero: 'COLONIA', orden: 1, ultimo: 'NO'},
        {id: 111686, hora: '17:30', buque: 1148, conductor: '71937773',   placa:   'SBK973',   finca:  'REVANCHA', embarcadero: 'COLONIA', orden: 2, ultimo: 'SI'},
        {id: 111742, hora: '15:00', buque: 1149, conductor: '6283996',    placa:  'EA0591',    finca: 'CASCO', embarcadero: 'COLONIA', orden: 1, ultimo: 'NO'},
        {id: 111743, hora: '15:00', buque: 1148, conductor: '6283996',    placa:  'EA0591',    finca: 'CASCO', embarcadero: 'COLONIA', orden: 1, ultimo: 'NO'},
        {id: 111744, hora: '18:04', buque: 1149, conductor: '6283996',    placa:  'EA0591',    finca: 'CASCO', embarcadero: 'COLONIA', orden: 2, ultimo: 'SI'},
        {id: 111745, hora: '18:40', buque: 1148, conductor: '6283996',    placa:  'EA0591',    finca: 'CASCO', embarcadero: 'COLONIA', orden: 2, ultimo: 'SI'},
        {id: 111788, hora: '14:00', buque: 1149, conductor: '71940501',   placa:   'TMP322',   finca: 'PALOMAS', embarcadero: 'COLONIA', orden: 1, ultimo: 'NO'},
        {id: 111789, hora: '18:00', buque: 1149, conductor: '71940501',   placa:   'TMP322',   finca: 'PALOMAS', embarcadero: 'COLONIA', orden: 2, ultimo: 'SI'},
        {id: 111790, hora: '18:00', buque: 1148, conductor: '71940501',   placa:   'TMP322',   finca: 'PALOMAS', embarcadero: 'COLONIA', orden: 2, ultimo: 'SI'},
        {id: 112080, hora: '17:50', buque: 1149, conductor: '1027944557',   placa:  'VOV304',   finca: 'RANCHO ALEGRE', embarcadero: 'COLONIA', orden: 3, ultimo: 'NO'}
       
    ];
    const getData = (fecha) => {
        setFecha(fecha.value)
    }

    return (
        <>
        {
            data.length > 0 && <Lista data={data} getData={getData} fecha={fecha}/>
        }
        </>
    )
}

export default Rutas;