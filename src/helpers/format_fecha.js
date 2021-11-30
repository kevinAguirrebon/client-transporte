
const fecha_format = () =>{
        const f = new Date();
        const dia = f.getDate();
        const mes = f.getMonth() + 1;
        const year = f.getFullYear();
        return year + '-' + (mes) + '-' + dia;
}

export default fecha_format;