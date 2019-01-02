import express = require('express');
import bodyParser = require('body-parser');
import request = require('request');
import { User } from "./classes/User";
let messagesToSend = require("./classes/messagesToSend");
let utilities = require("./classes/utilities");

let app = express();
let url: string = 'https://eu14.chat-api.com/instance20416/sendMessage?token=cd5k6c9y2tynp1wa';
let users: Array<any> = [];
let user: User;
let data: any;
let documentNumber: number;
let documentDate: string;
let message: string;
let saludosInicial: Array<string> = [];
let citaInicial: Array<string> = [];
let tipoDocumento: Array<string> = [];
let input: string;
let diasDisponibles:Array<string> = [];
let horasDisponibles:Array<string> = [];;
let senderName: string;
let chatId: string;
let fromMe: boolean;

app.use(bodyParser.json());

app.post(' ', (req, res) => {
    data = req.body; // New messages in the "body" variable

    console.log('ELEMENT', data);
    utilities.functionWithCallBack(checkMessega(), 1000).then(res => {
        subFlow();
    });

    res.sendStatus(200); //Response does not matter
});


function checkMessega() {
    data.messages.forEach(element => {
        input = element.body;
        input = input.toLocaleLowerCase().trim();
        senderName = element.senderName;
        chatId = element.chatId;
        fromMe = element.fromMe
    });

    citaInicial = ["cita", "citas"];
    saludosInicial = ["hola", "ola", "buena tarde", "buen dia", "buena noche", "qhubo"];
    tipoDocumento = ["cédula de ciudadanía", "pasaporte", "tarjeta de identidad", "cancelar","1","2","3","4"];
    diasDisponibles = ["martes","miercoles","jueves","viernes","cancelar","1","2","3","4","5"];
    horasDisponibles = ["8:00", "9:00", "3:30", "4:20","cancelar","1","2","3","4","5"];
    console.log('users', users);

    if (users.find(userValue => userValue.chatId == chatId)) {
        if (!fromMe) {

            if (saludosInicial.find(valueSaludo1 => valueSaludo1 == input)) {
                message = messagesToSend.newMessage('saludoInicial', senderName);
                user = new User(chatId, message, 'saludoInicial')
                sendMessage(user);
                users.push(user);

            } else if (citaInicial.find(valueCita => utilities.isContain(input, valueCita))) {
                console.log('hey mans ');

                message = messagesToSend.newMessage('citaInicial', senderName);
                user = new User(chatId, message, 'citaInicial')
                sendMessage(user);
                users.push(user);/*  */
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
}

function subFlow() {
    users.forEach((element, index) => {
        if (!fromMe) {
            if (element.state == 'citaInicial') {
                console.log('this is happening');
                if (tipoDocumento.find(response => utilities.isContain(input, response))) {
                    console.log('Cant tell man');
                    message = messagesToSend.newMessage('citasSubFlow1', senderName);
                    user = new User(chatId, message, 'citasSubFlow1')
                    sendMessage(user);
                    users.push(user);
                }
            }
            if (element.state == 'citasSubFlow1') {
                console.log('this is happening');
                if (input.match(/([^a-zA-Z])/g)) {
                    documentNumber = parseInt(input); 
                    console.log('Cant tell man');
                    message = messagesToSend.newMessage('citasSubFlow2', senderName);
                    user = new User(chatId, message, 'citasSubFlow2')
                    sendMessage(user);
                    users.push(user);
                } else if (/([a-zA-Z])/g) {
                    console.log('HEY BRO!!!!!');
                    message = messagesToSend.sendChangedFlujo('docInvalido', element.senderName);
                    user = new User(chatId, message, 'citasSubFlow1');
                    sendMessage(user);
                    users.push(user);
                }
            }
            if (element.state == 'citasSubFlow2') {
                if (input.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g)) {
                    /*                     message = messagesToSend.sendChangedFlujo('citasSubFlow3', element.senderName);
                                        user = new User(chatId, message, 'saludoInicial');
                     */
                    documentDate = input;
                    message = messagesToSend.sendChangedFlujo('eligeCita1', element.senderName);
                    user = new User(chatId, message, 'eligeCita1');
                    sendMessage(user);
                    users.push(user);
                } else {
                    message = messagesToSend.sendChangedFlujo('docInvalidoFecha', element.senderName);
                    user = new User(chatId, message, 'citasSubFlow1');
                    sendMessage(user);
                    users.push(user);
                }
            }
            /* if (element.state == 'eligeCita1') {
                message = messagesToSend.sendChangedFlujo('eligeCita2', element.senderName);
                user = new User(chatId, message, 'eligeCita2');
                sendMessage(user);
                users.push(user);
            }
            if (element.state == 'eligeCita2') {
                message = messagesToSend.sendChangedFlujo('eligeCita3', element.senderName);
                user = new User(chatId, message, 'eligeCita3');
                sendMessage(user);
                users.push(user);
            }
            if (element.state == 'eligeCita3') {
                message = messagesToSend.sendChangedFlujo('eligeCita4', element.senderName);
                user = new User(chatId, message, 'eligeCita4');
                sendMessage(user);
                users.push(user);
            } */
        }
    });
}

function sendMessage(data: any) {
    request({
        url: url,
        method: "POST",
        json: data
    });
}


let server = app.listen(process.env.PORT, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("El servidor se encuentra en el puerto " + port + " y el host es " + host);
});