"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var User_1 = require("./classes/User");
var messagesToSend = require("./classes/messagesToSend");
var utilities = require("./classes/utilities");
var servicioAfiliadoEPS = require("./services/consultaAfiliadoEPS");
var app = express();
var url = 'https://eu17.chat-api.com/instance20416/message?token=cd5k6c9y2tynp1wa';
var users = [];
var user;
var data;
var documentNumber;
var documentDate;
var message;
var saludosInicial = [];
var citaInicial = [];
var tipoDocumento = [];
var input = "";
var diasDisponibles = [];
var senderName;
var chatId;
var fromMe;
var existeAfiliado = false;
var DiasDisponibles = [
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
];
var horasDisponibles = [
    "8:00",
    "9:00",
    "3:30",
    "4:20",
    "cancelar"
];
app.use(bodyParser.json());
app.post('/my_webhook_url2', function (req, res) {
    data = req.body; // New messages in the "body" variable
    console.log('ELEMENT', data);
    utilities.utilities.functionWithCallBack(checkMessega(), 1000).then(function (res) {
        subFlow();
        /* consultarServicio(); */
    });
    res.sendStatus(200); //Response does not matter
});
function checkMessega() {
    data.messages.forEach(function (element) {
        input = element.body;
        input = input.toLocaleLowerCase().trim();
        senderName = element.senderName;
        chatId = element.chatId;
        fromMe = element.fromMe;
    });
    citaInicial = ["cita", "citas"];
    saludosInicial = ["hola", "ola", "buena tarde", "buen dia", "buena noche", "qhubo"];
    tipoDocumento = ["cédula de ciudadanía", "pasaporte", "tarjeta de identidad", "cancelar"];
    //diasDisponibles = ["martes", "miercoles", "jueves", "viernes", "cancelar"];
    console.log('users', users);
    if (users.find(function (userValue) { return userValue.chatId == chatId; })) {
        if (!fromMe) {
            if (saludosInicial.find(function (valueSaludo1) { return valueSaludo1 == input; })) {
                message = messagesToSend.newMessage('saludoInicial', senderName);
                user = new User_1.User();
                user = new User_1.User(chatId, message, 'saludoInicial');
                sendMessage(user);
                users.push(user);
            }
            else if (citaInicial.find(function (valueCita) { return utilities.utilities.isContain(input, valueCita); })) {
                console.log('hey mans ');
                message = messagesToSend.newMessage('citaInicial', senderName);
                user = new User_1.User();
                user = new User_1.User(chatId, message, 'citaInicial');
                sendMessage(user);
                users.push(user); /*  */
            }
        }
    }
    else {
        if (saludosInicial.find(function (valueSaludo2) { return valueSaludo2 == input; })) {
            message = messagesToSend.newMessage('saludoInicial', senderName);
            user = new User_1.User(chatId, message, 'saludoInicial');
            sendMessage(user);
            users.push(user);
        }
    }
}
function subFlow() {
    users.forEach(function (element, index) {
        console.log("Estado: ", element.state);
        if (!fromMe) {
            //Ingresa l tipo de documento
            if (element.state == 'citaInicial') {
                if (tipoDocumento.find(function (response) { return utilities.utilities.isContain(input, response); })) {
                    users.splice(index, 1);
                    message = messagesToSend.newMessage('citasSubFlow1', senderName);
                    user = new User_1.User(chatId, message, 'citasSubFlow1');
                    sendMessage(user);
                    users.push(user);
                }
            }
            if (element.state == 'citasSubFlow1') {
                console.log('this is happening');
                if (input.match(/([^a-zA-Z])/g)) {
                    users.splice(index, 1);
                    documentNumber = parseInt(input);
                    message = messagesToSend.newMessage('citasSubFlow2', senderName);
                    user = new User_1.User(chatId, message, 'citasSubFlow2');
                    sendMessage(user);
                    users.push(user);
                    //Consultar cédula
                    console.log(input);
                    utilities.utilities.functionWithCallBack(subFlow(), 2000).then(function (res) {
                        existeAfiliado = consultarServicio("CC", Number(input));
                    });
                }
                else {
                    console.log('HEY BRO!!!!!');
                    users.splice(index, 1);
                    message = messagesToSend.newMessage('citasSubFlow1', senderName);
                    user = new User_1.User(chatId, message, 'citasSubFlow1');
                    sendMessage(user);
                    users.push(user);
                }
            }
            if (existeAfiliado) {
                //Validda la fecha de expedición
                if (element.state == 'citasSubFlow2') {
                    if (input.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g)) {
                        users.splice(index, 1);
                        documentDate = input;
                        message = messagesToSend.newMessage('eligeCita1', senderName);
                        user = new User_1.User(chatId, message, 'eligeCita1');
                        sendMessage(user);
                        users.push(user);
                    }
                    else {
                        users.splice(index, 1);
                        message = messagesToSend.newMessage('docInvalidoFecha', senderName);
                        user = new User_1.User(chatId, message, 'citasSubFlow1');
                        sendMessage(user);
                        users.push(user);
                    }
                }
                if (element.state == 'eligeCita1') {
                    for (var indices = 0; indices < DiasDisponibles.length; indices++) {
                        var element_1 = DiasDisponibles[indices];
                        console.log(indices);
                        console.log(DiasDisponibles[indices]);
                        if (Number(indices - 1) == Number(input)) {
                            console.log("ENTRÓÓÓÓÓÓÓÓÓÓÓ");
                            users.splice(index, 1);
                            message = messagesToSend.newMessage('eligeCita2', senderName, DiasDisponibles[indices - 1]);
                            user = new User_1.User(chatId, message, 'eligeCita2');
                            sendMessage(user);
                            users.push(user);
                        }
                    }
                }
                if (element.state == 'eligeCita2') {
                    horasDisponibles.forEach(function (element, indice2) {
                        if (Number(indice2 - 1) == Number(input)) {
                            users.splice(index, 1);
                            message = messagesToSend.newMessage('eligeCita3', senderName, null, horasDisponibles[indice2 - 1]);
                            user = new User_1.User(chatId, message, 'eligeCita3');
                            sendMessage(user);
                            users.push(user);
                        }
                    });
                }
                if (element.state == 'eligeCita3') {
                    if (Number(input.match(/([^a-zA-Z])/g)) == 1) {
                        message = messagesToSend.newMessage('eligeCita5', senderName);
                        user = new User_1.User(chatId, message, 'eligeCita5');
                        sendMessage(user);
                        users.push(user);
                    }
                    else if (Number(input.match(/([^a-zA-Z])/g)) == 2) {
                        message = messagesToSend.newMessage('eligeCita1', senderName);
                        user = new User_1.User(chatId, message, 'eligeCita1');
                        sendMessage(user);
                        users.push(user);
                    }
                }
            }
            else if (!existeAfiliado && element.state == 'citasSubFlow1') {
                console.log("Número de documento no está afiliado");
                users.splice(index, 1);
                message = messagesToSend.newMessage('citasSubFlow1', senderName);
                user = new User_1.User(chatId, message, 'citasSubFlow1');
                sendMessage(user);
                users.push(user);
            }
        }
    });
}
function sendMessage(data) {
    request({
        url: url,
        method: "POST",
        json: data
    });
}
var server = app.listen(process.env.PORT, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("El servidor se encuentra en el puerto " + port + " y el host es " + host);
});
function consultarServicio(tipo, cedula) {
    //console.log("SERVER_>_>_>_>_>", JSON.stringify(servicioAfiliadoEPS.servicioAfiliadoEPS.servicioQuemado("CC", "1107063182")));
    //console.log("SERVER_>_>_>_>_>", servicioAfiliadoEPS.servicioAfiliadoEPS.armaObjetos(tipo, cedula));
    //let data = JSON.parse(servicioAfiliadoEPS.servicioAfiliadoEPS.servicioQuemado("CC", "1107063182"));
    var datos = servicioAfiliadoEPS.servicioAfiliadoEPS.armaObjetos(tipo, cedula);
    console.log("BODY__>__>__>__>", datos.body.responseMessageOut.body.response.consultaAfiliadoResponse.afiliado);
    if (datos.responseMessageOut.body != undefined) {
        console.log("Existe");
        return true;
    }
    else {
        console.log("No existe");
        return false;
    }
}
