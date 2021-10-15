const MESES = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

const Fecha = (date) =>{
    if(date){
        const f = new Date(date);
        const dia = f.getDate() + 1;
        const mes = f.getMonth();
        const year = f.getFullYear();
        return dia + ' de ' + MESES[mes] + ' del ' + year;
    }else{
        return 'No ha seleccionado una fecha';
    }
}

export default Fecha;