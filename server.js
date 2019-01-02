"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var User_1 = require("./classes/User");
var messagesToSend = require("./classes/messagesToSend");
var utilities = require("./classes/utilities");
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
var horasDisponibles = [];
;
var senderName;
var chatId;
var fromMe;
app.use(bodyParser.json());
app.post('/my_webhook_url2', function (req, res) {
    data = req.body; // New messages in the "body" variable
    console.log('ELEMENT', data);
    utilities.functionWithCallBack(checkMessega(), 1000).then(function (res) {
        subFlow();
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
    tipoDocumento = ["cédula de ciudadanía", "pasaporte", "tarjeta de identidad", "cancelar", "1", "2", "3", "4"];
    diasDisponibles = ["martes", "miercoles", "jueves", "viernes", "cancelar", "1", "2", "3", "4", "5"];
    var horasDisponibles = [
        {
            "1": "8:00",
            "2": "9:00",
            "3": "3:30",
            "4": "4:20",
            "5": "cancelar"
        }
    ];
    console.log(horasDisponibles);
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
            else if (citaInicial.find(function (valueCita) { return utilities.isContain(input, valueCita); })) {
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
            if (element.state == 'citaInicial') {
                if (tipoDocumento.find(function (response) { return utilities.isContain(input, response); })) {
                    users.splice(index, 1);
                    console.log('Cant tell man');
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
                    console.log('Cant tell man');
                    message = messagesToSend.newMessage('citasSubFlow2', senderName);
                    user = new User_1.User(chatId, message, 'citasSubFlow2');
                    sendMessage(user);
                    users.push(user);
                }
                else {
                    console.log('HEY BRO!!!!!');
                    message = messagesToSend.newMessage('citasSubFlow1', senderName);
                    user = new User_1.User(chatId, message, 'citasSubFlow1');
                    sendMessage(user);
                    users.push(user);
                }
            }
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
                    message = messagesToSend.newMessage('docInvalidoFecha', senderName);
                    user = new User_1.User(chatId, message, 'citasSubFlow1');
                    sendMessage(user);
                    users.push(user);
                }
            }
            if (element.state == 'eligeCita1') {
                message = messagesToSend.newMessage('eligeCita2', element.senderName);
                user = new User_1.User(chatId, message, 'eligeCita2');
                sendMessage(user);
                users.push(user);
            }
            if (element.state == 'eligeCita2') {
                message = messagesToSend.newMessage('eligeCita3', element.senderName);
                user = new User_1.User(chatId, message, 'eligeCita3');
                sendMessage(user);
                users.push(user);
            }
            if (element.state == 'eligeCita3') {
                message = messagesToSend.newMessage('eligeCita4', element.senderName);
                user = new User_1.User(chatId, message, 'eligeCita4');
                sendMessage(user);
                users.push(user);
            }
             * /;
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
