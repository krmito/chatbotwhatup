import express = require('express');
import bodyParser = require('body-parser');
import request = require('request');
import { User } from "./classes/User";
let messagesToSend = require("./classes/messagesToSend");
let utilities = require("./classes/utilities");
import servicioAfiliadoEPS = require("./services/consultaAfiliadoEPS");
/* let servicioAfiliadoEPS = require("./services/consultaAfiliadoEPS"); */

let app = express();
let url: string = 'https://eu17.chat-api.com/instance20731/sendMessage?token=fyjnhn48zfqfz3p0';
let users: Array<any> = [];
let user: User;
let data: any;
let documentNumber: number;
let documentDate: string;
let message: string;
let saludosInicial: Array<string> = [];
let citaInicial1: Array<string> = [];
let citaInicial2: Array<string> = [];
let tipoDocumento: Array<string> = [];
let input: string = "";
let diasDisponibles: Array<string> = [];
let senderName: string;
let chatId: string;
let fromMe: boolean;
let elementUser: User;
let indexUser: number;
let fechaActual = new Date();
let dia = fechaActual.getDate();
let mes = fechaActual.getMonth();
let anio = fechaActual.getFullYear();
let mesString: string;
let datos: any;
let DiasDisponibles: Array<string> = [];
let horasDisponibles: Array<string> = [];
let arregloDias: Array<any> = [];;
let existeAfiliado: boolean;
let correo:string;
app.use(bodyParser.json());

app.post('/my_webhook_url2', (req, res) => {
    data = req.body; // New messages in the "body" variable

    console.log('ELEMENT', data);
    //servicioAfiliadoEPS.armaObjetos("CC", "1107063182")

    checkMessage();
    res.sendStatus(200); //Response does not matter
});


function checkMessage() {

    citaInicial2 = ["general", "odontologia"];
    citaInicial1 = ["cita", "citas", "Citas"];
    saludosInicial = ["hola", "ola", "buena tarde", "buen dia", "buena noche", "qhubo"];
    tipoDocumento = ["cédula de ciudadanía", "pasaporte", "tarjeta de identidad", "cancelar"];
    DiasDisponibles = ["martes", "miercoles", "jueves", "viernes", "cancelar"];
    horasDisponibles = ["8:00", "9:00", "3:30", "4:20", "cancelar"];

    data.messages.forEach(element => {
        input = element.body;
        input = input.toLocaleLowerCase().trim();
        senderName = element.senderName;
        chatId = element.chatId;
        fromMe = element.fromMe
    });


    console.log('users', users);
    if (users.find(userValue => userValue.chatId == chatId)) {
        if (!fromMe) {
            if (saludosInicial.find(valueSaludo1 => valueSaludo1 == input)) {
                message = messagesToSend.newMessage('saludoInicial', senderName);
                user = users.find(userValue => userValue.chatId == chatId);
                user.state = 'saludoInicial';
                user.body = message;
                sendMessage(user);

            } else if (citaInicial1.find(valueCita => utilities.utilities.isContain(input, valueCita))) {
                
                message = messagesToSend.newMessage('citaInicial1', senderName);
                user = users.find(userValue => userValue.chatId == chatId);
                user.state = 'citaInicial1';
                user.body = message;
                sendMessage(user);

            }
        }
    } else {
        if (saludosInicial.find(valueSaludo2 => valueSaludo2 == input)) {
            message = messagesToSend.newMessage('saludoInicial', senderName);
            user = new User(chatId, message, 'saludoInicial')
            sendMessage(user);
            users.push(user);
        }
    }
    subFlow();
}

function subFlow() {
    /*   users.forEach((element, index) => {
          elementUser = element;
          indexUser = index;
      }); */
    console.log("Estado: ", user.state, ' ', chatId);
    if (user = users.find(userValue => userValue.chatId == chatId)) {

        if (!fromMe) {
            //Ingresa l tipo de documento
            if (user.state == 'citaInicial1') {
                if (citaInicial2.find(response => utilities.utilities.isContain(input, response))) {
                    message = messagesToSend.newMessage('citaInicial2', senderName);
                    user = users.find(userValue => userValue.chatId == chatId);
                    user.state = 'citaInicial2';
                    user.body = message;
                    sendMessage(user);
                }
            } else if (user.state == 'citaInicial2') {
                if (tipoDocumento.find(response => utilities.utilities.isContain(input, response))) {

                    
                    message = messagesToSend.newMessage('citasSubFlow1', senderName);
                    user = users.find(userValue => userValue.chatId == chatId);
                    user.state = 'citasSubFlow1';
                    user.body = message;
                    sendMessage(user);
                }
            } else if (user.state == 'citasSubFlow1') {
                console.log('this is happening');
                if (input.match(/([^a-zA-Z])/g)) {

                    documentNumber = parseInt(input);
                    
                    message = messagesToSend.newMessage('citasSubFlow2', senderName);
                    user = users.find(userValue => userValue.chatId == chatId);
                    user.state = 'citasSubFlow2';
                    user.body = message;
                    sendMessage(user);
                } else {
                    message = messagesToSend.newMessage('citasSubFlow1', senderName);
                    user = users.find(userValue => userValue.chatId == chatId);
                    user.state = 'citasSubFlow1';
                    user.body = message;
                    sendMessage(user);
                }
            } else if (user.state == 'citasSubFlow2') {
                availableDates();
                //Validda la fecha de expedición
                if (input.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g)) {
                    let availableDate: string = '';

                    arregloDias.forEach((element, index) => {
                        console.log('heyy', index, element);
                        index = index + 1;
                        availableDate += index + '.' + element.text + "\n";
                    });

                    console.log('arregloDias ', arregloDias);


                    documentDate = input;

                    utilities.utilities.functionWithCallBack(consultarServicio("CC", documentNumber), 4000).then(res => {


                        console.log("BOOLENAO: ", JSON.parse(datos).responseMessageOut.body.response.consultaAfiliadoResponse);
                        if (JSON.parse(datos).responseMessageOut.body.response.consultaAfiliadoResponse.afiliado != undefined) {
                            let afiliado = JSON.parse(datos).responseMessageOut.body.response.consultaAfiliadoResponse.afiliado;
                            let calidadAfiliado = afiliado.calidadAfiliado;
                            let fechaAfiliacion = afiliado.fechaAfiliacionSistema;
                            let tipoAfiliado = afiliado.tipoAfiliado;
                            //correo = afiliado.email;
                            let object = { calidad: calidadAfiliado, fecha: fechaAfiliacion, tipo: tipoAfiliado};

                            console.log("Existe");
                            existeAfiliado = true;

                            message = messagesToSend.newMessage('eligeCita1', senderName, '', '', availableDate, object);
                            user = users.find(userValue => userValue.chatId == chatId);
                            user.state = 'eligeCita1';
                            user.body = message;
                            sendMessage(user);
                        } else {
                            existeAfiliado = false;
                            message = messagesToSend.newMessage('citasSubFlow1', senderName);
                            user = users.find(userValue => userValue.chatId == chatId);
                            user.state = 'citasSubFlow1';
                            user.body = message;
                            sendMessage(user);
                        }
                    });
                    arregloDias = [];
                } else {

                    message = messagesToSend.newMessage('docInvalidoFecha', senderName);
                    user = users.find(userValue => userValue.chatId == chatId);
                    user.state = 'citasSubFlow1';
                    user.body = message;
                    sendMessage(user);
                }
            } else if (user.state == 'eligeCita1') {

                for (let indices = 0; indices < DiasDisponibles.length; indices++) {
                    console.log('indices', indices);
                    console.log('DiasDisponibles[indices]', DiasDisponibles[indices]);
                    if (Number(indices) == Number(input)) {
                        console.log("ENTRÓÓÓÓÓÓÓÓÓÓÓ");

                        message = messagesToSend.newMessage('eligeCita2', senderName, DiasDisponibles[indices]);
                        user = users.find(userValue => userValue.chatId == chatId);
                        user.state = 'eligeCita2';
                        user.body = message;
                        sendMessage(user);
                    }
                }
            } else if (user.state == 'eligeCita2') {
                horasDisponibles.forEach((element, indice2) => {

                    if (Number(indice2 - 1) == Number(input)) {

                        message = messagesToSend.newMessage('eligeCita3', senderName, null, horasDisponibles[indice2 - 1], null, null, null, correo);
                        user = users.find(userValue => userValue.chatId == chatId);
                        user.state = 'eligeCita3';
                        user.body = message;
                        sendMessage(user);
                    }

                });
            } else if (user.state == 'eligeCita3') {

                if (Number(input.match(/([^a-zA-Z])/g)) == 1) {
                    message = messagesToSend.newMessage('eligeCita5', senderName);
                    user = users.find(userValue => userValue.chatId == chatId);
                    user.state = 'eligeCita5';
                    user.body = message;
                    sendMessage(user);
                } else if (Number(input.match(/([^a-zA-Z])/g)) == 2) {
                    message = messagesToSend.newMessage('eligeCita1', senderName);
                    user = users.find(userValue => userValue.chatId == chatId);
                    user.state = 'eligeCita1';
                    user.body = message;
                    sendMessage(user);
                }

            } else if (user.state == 'eligeCita5') {
                if (Number(input.match(/([^a-zA-Z])/g)) == 1) {
                    message = messagesToSend.newMessage('saludoInicial', senderName);
                    user = users.find(userValue => userValue.chatId == chatId);
                    user.state = 'saludoInicial';
                    user.body = message;
                    sendMessage(user);
                    users.push(user);
                }
            }
        }
    }
}

function sendMessage(data: any) {
    request({
        url: url,
        method: "POST",
        json: data
    });
}

function availableDates() {
    switch (mes) {
        case 0: { mesString = 'January' } break;
        case 1: { mesString = 'February' } break;
        case 2: { mesString = 'March' } break;
        case 3: { mesString = 'April' } break;
        case 4: { mesString = 'May' } break;
        case 5: { mesString = 'June' } break;
        case 6: { mesString = 'July' } break;
        case 7: { mesString = 'August' } break;
        case 8: { mesString = 'September' } break;
        case 9: { mesString = 'October' } break;
        case 10: { mesString = 'November' } break;
        case 11: { mesString = 'December' } break;
    }

    let diasDisponibles = fechaActual.getDay();
    let contador = 0;
    /// ESTO ES EN CASO DE QUE EL HORARIO DE ATENFCIÓN SEA DE LUNES A VIERNES, EN CAOS DE QUE SE VA ATENDER FINES DE SEMANA HAY QUE HACER ALGO ADICIONAL
    for (let i = diasDisponibles; i <= 5; i++) {
        if (i == diasDisponibles) {
            arregloDias.push({ "text": 'Hoy ' + utilities.utilities.diaSemana(dia, mesString, anio) + ' ' + dia + '/' + (fechaActual.getMonth() + 1) + '/' + anio });
        } else if (i > diasDisponibles) {
            arregloDias.push({ "text": utilities.utilities.diaSemana(dia + contador, mesString, anio) + ' ' + (dia + contador) + '/' + (fechaActual.getMonth() + 1) + '/' + anio });
        }
        contador++;
    }
}

let server = app.listen(process.env.PORT, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("El servidor se encuentra en el puerto " + port + " y el host es " + host);
});


function consultarServicio(tipo: string, cedula: number) {
    servicioAfiliadoEPS.servicioAfiliadoEPS.armaObjetos(tipo, cedula, (x: any) => {
        console.log('YOLO--------->', x);
        datos = x;
    });
}