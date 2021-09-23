const loader = new Notice();

function openLoader(){
    loader.showLoading({
      type: 'line',
      title: 'Cargando'
    });
}
function closeLoader(){
    loader.hideLoading();
}


function successAlert(mensaje) {
    Swal.fire({
        title: mensaje,
        text: '',
        icon: 'success',
        heightAuto: false
    });
}
function errorAlert(mensaje) {
    Swal.fire({
        title: mensaje,
        text: '',
        icon: 'error',
        heightAuto: false
    });
}
function getConfirmation(callback, args, mensaje) {
    Swal.fire({
        title: mensaje,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar',
        heightAuto: false
    }).then((result) => {
        if (result.isConfirmed) {
            callback.apply(this, args);
        }
    });
}
const populateFieldsByClassName = (data, campos) => {
    let info = [];
    for (i in data) {
        info.push(data[i]);
    }
    for (campo in campos) {
        let text = info[campo];
        if (text == null) {
            text = "";
        }
        if (campos[campo].nodeName == "INPUT")
            campos[campo].value = text;
        else
            campos[campo].innerHTML = text;
    }
}

const cleanFieldByClassName = (className) => {
    let fields = document.getElementsByClassName(className);
    for (let i in fields) {
        if (fields[i].nodeName == "INPUT")
            fields[i].value = "";
        else if (fields[i].nodeName == "SELECT")
            fields[i].value = "-1";
        else
            fields[i].innerHTML = "";
    }
}
function isNumber(value) {
    let number;
    try {
        number = parseInt(value);
        return true;
    } catch (e) {
        return false;
    }
}

function zfill(number, width) {
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = number.toString().length; /* Largo del número */
    var zero = "0"; /* String de cero */

    if (width <= length) {
        if (number < 0) {
            return ("-" + numberOutput.toString());
        } else {
            return numberOutput.toString();
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString());
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString());
        }
    }
}