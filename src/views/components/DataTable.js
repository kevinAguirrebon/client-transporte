import React from 'react';
import DataTable from 'react-data-table-component';

const Table  = ({data,columns}) => {

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por Página:', 
        rangeSeparatorText: 'de', 
        noRowsPerPage: false, 
        selectAllRowsItem: true, 
        selectAllRowsItemText: 'Todos' 
    }

    const paginationRowsPerPageOptions = [5,10, 15, 20, 25, 30];

    const paginationIconNext = <i className="fas fa-angle-right"></i>
    const paginationIconPrevious = <i className="fas fa-angle-left"></i>
    const paginationIconLastPage = <i className="fas fa-angle-double-right"></i>
    const paginationIconFirstPage = <i className="fas fa-angle-double-left"></i>

    const noDataComponent = <h4>Información no encontrada</h4>

    return (
        <DataTable
        columns={columns}
        data={data}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        paginationIconNext={paginationIconNext}
        paginationIconPrevious={paginationIconPrevious}
        paginationIconFirstPage={paginationIconFirstPage}
        paginationIconLastPage={paginationIconLastPage}
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
        noHeader={false}
        noDataComponent={noDataComponent}

        
        highlightOnHover={true}
       
        />
    );
}

export default Table;
