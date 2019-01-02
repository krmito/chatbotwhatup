"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var User_1 = require("./classes/User");
var functionFlow = require("./classes/Function");
var app = express();
var url = 'https://eu18.chat-api.com/instance19951/sendMessage?token=z4brc8usiyl6dzi8';
var users = [];
var user;
var data;
var message;
app.use(bodyParser.json());
app.post('/my_webhook_url', function (req, res) {
    data = req.body; // New messages in the "body" variable
    console.log('ELEMENT', data.messages);
    checkMessega();
    res.sendStatus(200); //Response does not matter
});
function checkMessega() {
    console.log('LA DIMENSION DEL MENSAJE ES ', data.messages);
    console.log('TAMAÑO ', data.messages.length);
    data.messages.forEach(function (element) {
        console.log('element', element);
        if (element.chatId.indexOf('@')) {
            element.chatId.slice(element.chatId.indexOf('@'));
        }
        message = functionFlow.sendChangedFlujo('saludoInicial', element.senderName);
        user = new User_1.User(element.chatId, message, 'saludoInicial');
    });
    console.log('LENGTH', users.length);
    if (users.length == 0) {
        users.push(user);
        sendMessage(user);
    }
    else {
        console.log('users', users);
        users.forEach(function (e) {
            if (user.chatId.localeCompare(e.chatId) == 0) {
                console.log('El usuario esta en el flujo');
            }
            else {
                users.push(user);
                sendMessage(user);
            }
        });
    }
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
