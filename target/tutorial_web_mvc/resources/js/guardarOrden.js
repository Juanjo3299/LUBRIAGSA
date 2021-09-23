// Funcion para rellenar la table
let tablaRequisiciones = null;
let minDate, maxDate;

function llenarTablaRequisiciones(data) {

    if (tablaRequisiciones != null)
        tablaRequisiciones.destroy();

    tablaRequisiciones = $("#tabla-requisiciones").DataTable({
        ordering: false,
        searching: true,
        scrollX: true,
        "language": language,
        // scrollX: true,
        data: data,
        columns: [
            {render: () => `<input type="checkbox" name="requisiciones"/>`},
            {data: "FOLIO"},
            {data: "PRODUCTO"},
            {data: "Pr_Descripcion"},
            {data: "CANTIDAD"},
            {data: "PROVEEDOR"},
            {data: "PROVEEDOR_DESCRIPCION"},
            {data: "ULTIMO_PRECIO"},
            {data: "%DESCUENTO"},
            {render: () => `<input type="text" name="precio_final"/>`},
            {render: () => `<input type="text" name="importe"/>`},
            {render: () => `<input type="button" name="accion" value="ACCION"/>`}
        ],
    })

}

$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        const min = minDate.val();
        const max = maxDate.val();
        const date = new Date(data[2]);

        return (min === null && max === null) ||
            (min === null && date <= max) ||
            (min <= date && max === null) ||
            (min <= date && date <= max);

    }
);

$(document).ready(function() {
    // Create date inputs
    minDate = new DateTime($('#min'), {
        format: 'YYYY-MM-YY'
    });
    maxDate = new DateTime($('#max'), {
        format: 'YYYY-MM-YY'
    });

    // if(tablaRequisiciones != null)
    //     tablaRequisiciones.destroy();

    // DataTables initialisation
    // var table = $('#tabla-requisiciones').DataTable();
    // console.log(minDate, maxDate)

    // Refilter the table
    $('#min, #max').on('change', function () {
        tablaRequisiciones.draw();
    });
});

// Metodos ajax
$.ajax('/lubriagsa/procesos/findDetRequisiciones.do', {
    method: 'GET',
    dataType: 'json',
    timeout: 0,
    data: {
        folio: '01-0000177'
    }
}).done((response) => {
    llenarTablaRequisiciones(response.data)
})

