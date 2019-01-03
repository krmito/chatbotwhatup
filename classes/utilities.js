"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities = /** @class */ (function () {
    function utilities() {
    }
    utilities.functionWithCallBack = function (functionX, timeout) {
        var promise = new Promise(function (resolve, reject) {
            setTimeout(function () {
                functionX;
                resolve();
            }, timeout);
        });
        return promise;
    };
    utilities.isContain = function (input, value) {
        if (input.includes(value)) {
            return value;
        }
    };
    utilities.diaSemana = function (dia, mes, anio) {
        var dias = ["dom", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"];
        var dt = new Date(mes + ' ' + dia + ', ' + anio + ' 12:00:00');
        //document.getElementById('div1').innerHTML = "Dia de la semana : " + dias[dt.getUTCDay()];    
        console.log('DIA DE LA SEMANA QUE QUIERO OBTENER ' + dias[dt.getUTCDay()]);
        return dias[dt.getUTCDay()];
    };
    return utilities;
}());
exports.utilities = utilities;
