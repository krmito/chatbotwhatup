"use strict";
let functions = {
    sendChangedFlujo: function (nombre, user) {
        
        let mensaje = '';
        switch (nombre) {
            case 'saludoInicial':
                mensaje = "Hola, " + user + " Bienvenido a la linea de atencion de *S.O.S*.\nPor favor dime en que quieres que te ayude utiliza una de las palabras claves:\n*Certificados*\uD83D\uDCC4\n*Afiliacion* \uD83C\uDD98\n*Subsidios* \uD83D\uDCB5\n*Cancelar* \u23F9\uFE0F";
                break;
            case 'certificados':
                mensaje = "Por favor " + user + " digite su numero de cedula sin puntos ni comas";
                break;
        }
        return mensaje;
    }
};
module.exports = functions;
