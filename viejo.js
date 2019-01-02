"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var User_1 = require("./classes/User");
var functionFlow = require("./classes/Function");
var utilties = require("./classes/utilities");
var app = express();
var url = 'https://eu18.chat-api.com/instance20171/sendMessage?token=dojgtkb21ug0jab6';
var users = [];
var user;
var data;
var documentNumber;
var documentDate;
var message;
app.use(bodyParser.json());
var saludosInicial = [];
app.post('/my_webhook_url', function (req, res) {
    data = req.body; // New messages in the "body" variable
    console.log('ELEMENT', data);
    checkMessega();
    /*   subFlow() */
    res.sendStatus(200); //Response does not matter
});
function checkMessega() {
    console.log('LA DIMENSION DEL MENSAJE ES ', data.messages);
    console.log('TAMAÑO ', data.messages.length);
    var input;
    var datos;
    data.messages.forEach(function (element) {
        input = element.body;
        saludosInicial = ["hola", "ola", "buena tarde", "buen dia", "buena noche", "qhubo"];
        saludosInicial.forEach(function (e) {
            console.log('chance2', e, input);
            if (e.toLowerCase() == input.trim().toLowerCase()) {
                console.log('chance1', e, input);
                datos = functionFlow.sendChangedFlujo('saludoInicial', element.senderName);
                user = new User_1.User(element.chatId, datos, 'saludoInicial');
                sendMessage(user);
                users.push(user);
            }
        });
        console.log('chance4', input);
        if (input.toLowerCase().indexOf('citas') >= 0) {
            console.log('chance3', input);
            datos = functionFlow.sendChangedFlujo('citasflow', element.senderName);
            user = new User_1.User(element.chatId, datos, 'citasInicial');
            sendMessage(user);
            users.push(user);
        }
    });
    data.messages.forEach(function (element) {
        console.log('element', element);
        if (element.chatId.indexOf('@')) {
            element.chatId.slice(element.chatId.indexOf('@'));
        }
        if (users.length == 0 || users.forEach(function (e) {
            e.chatId.localeCompare(element.chatId) != 0;
        })) {
            message = functionFlow.sendChangedFlujo('saludoInicial', element.senderName);
            user = new User_1.User(element.chatId, message, 'saludoInicial');
            sendMessage(user);
            users.push(user);
        }
        else {
            console.log('users', users);
            users.forEach(function (e) {
                if (user.chatId.localeCompare(e.chatId) == 0) {
                    console.log('El usuario esta en el flujo');
                }
            });
        }
    });
}
/* function subFlow() {
  let input: string;
  let datos: string;
  users.forEach((element, index) => {
    if (element.state == 'citasInicial') {
      users.splice(index);
      datos = functionFlow.sendChangedFlujo('citasSubFlow1', element.senderName);
      user = new User(element.chatId, datos, 'citasSubFlow1');
      sendMessage(user);
      users.push(user);
    }
    //Flujo para pedir dato del número de documento
    if (element.state == 'citasSubFlow1') {
      users.splice(index);
      data.messages.forEach(element => {
        input = element.body
        if (input.match(/([^a-zA-Z])/g)) {
          documentNumber = parseInt(input);
          datos = functionFlow.sendChangedFlujo('citasSubFlow2', element.senderName);
          user = new User(element.chatId, datos, 'citasSubFlow2');
          sendMessage(user);
          users.push(user);
        } else {
          datos = functionFlow.sendChangedFlujo('docInvalido', element.senderName);
          user = new User(element.chatId, datos, 'citasSubFlow1');
          sendMessage(user);
          users.push(user);
        }
      });
    }else

    if (element.state == 'citasSubFlow2') {
      users.splice(index);
      data.messages.forEach(element => {
        input = element.body
        if (input.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g)) {
          documentDate = input;
          datos = functionFlow.sendChangedFlujo('citasSubFlow3', element.senderName);
          user = new User(element.chatId, datos, 'saludoInicial');
          sendMessage(user);
          users.push(user);
        } else {
          datos = functionFlow.sendChangedFlujo('docInvalidoFecha', element.senderName);
          user = new User(element.chatId, datos, 'citasSubFlow1');
          sendMessage(user);
          users.push(user);
        }
      });
    }

  });
} */
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
