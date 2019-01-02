"use strict";
var messagesToSend = {
    newMessage: function (state, userName, dia, hora) {
        var mensaje = '';
        switch (state) {
            case 'saludoInicial':
                mensaje = "Hola, " + userName + " Bienvenido a la linea de atencion de *Comfenalco*.\n        Por favor dime en que quieres que te ayude utiliza una de las palabras claves: \n*1.Certificados* \uD83D\uDCC4\n*2.Afiliacion* \uD83C\uDD98\n*3.Subsidios* \uD83D\uDCB5\n*4.Citas* \uD83D\uDCC5\n*5.Cancelar* \u23F9\uFE0F";
                break;
            case 'citaInicial':
                mensaje = "Por favor " + userName + " escoje el tipo de documento: \n*1.C\u00E9dula de ciudadan\u00EDa*\n*2.Pasaporte* \n*3.Tarjeta de identidad* \n*4.Cancelar* \u23F9\uFE0F";
                break;
            case 'certificados':
                mensaje = "Por favor " + userName + " digite su numero de cedula sin puntos ni comas";
                break;
            case 'citasSubFlow1':
                mensaje = "Por favor " + userName + " digite el numero de su documento (Ejemplo: 1144256257)";
                break;
            case 'docInvalido':
                mensaje = "Por favor " + userName + " digite un n\u00FAmero de documento v\u00E1lido \n*Formato: Sin espacios, sin comas, sin letras, sin caract\u00E9res especiales*";
                break;
            case 'docInvalidoFecha':
                mensaje = "Por favor " + userName + " digite una fecha de expedicion v\u00E1lida \n*(1990-12-20)*";
                break;
            case 'citasSubFlow2':
                mensaje = "Por favor " + userName + " digite la fecha de expedicion de su documento (1990-12-20)";
                break;
            case 'citasSubFlow3':
                mensaje = userName + " su numero de documento no se encuentra registrado, por favor intentalo de nuevo";
                break;
            case 'eligeCita1':
                mensaje = userName + " se a verificado su documento exitosamente, estos son los dias en que tenemos citas disponibles\n*1. Martes* \n*2. Miercoles* \n*3. Jueves* \n*4. Viernes* \n*5.Cancelar* \n";
                break;
            case 'eligeCita2':
                mensaje = userName + " estas son las horas en que tenemos citas disponibles para el " + hora + "\n*1. 8:00* \n*2. 9:00* \n*3. 3:30* \n*4. 4:20* \n*5.Cancelar* \n";
                break;
            case 'eligeCita3':
                mensaje = userName + " su cita esta para el " + dia + " a las " + hora + " en la sede principal\n        *1. Ok*\n        *2. Cancelar*";
                break;
            case 'eligeCita4':
                mensaje = "Desea que le mandemos esta informacion a su correo\n        *1. Si*\n        *2. No*";
                break;
        }
        return mensaje;
    }
};
module.exports = messagesToSend;
