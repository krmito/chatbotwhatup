import express = require('express');
import bodyParser = require('body-parser');
import request = require('request');
import { User } from "./classes/User";
let functionFlow = require("./classes/Function");
let app = express();
let url: string = 'https://eu18.chat-api.com/instance19951/sendMessage?token=z4brc8usiyl6dzi8';
let users: Array<any> = [];
let user: User;
let data: any;
let message: string;
app.use(bodyParser.json());

app.post('/my_webhook_url', (req, res) => {
  data = req.body; // New messages in the "body" variable
  console.log('ELEMENT', data.messages);
  checkMessega();
  res.sendStatus(200); //Response does not matter
});

function checkMessega() {

  console.log('LA DIMENSION DEL MENSAJE ES ', data.messages);
  console.log('TAMAÑO ', data.messages.length);


  data.messages.forEach(element => {
    console.log('element', element);
    if (element.chatId.indexOf('@')) {
      element.chatId.slice(element.chatId.indexOf('@'));
    }
    message = functionFlow.sendChangedFlujo('saludoInicial', element.senderName);
    user = new User(element.chatId, message, 'saludoInicial');
  });
  console.log('LENGTH', users.length);

  if (users.length == 0) {
    users.push(user);
    sendMessage(user);
  } else {
    console.log('users', users);
    users.forEach(e => {
      if (user.chatId.localeCompare(e.chatId) == 0) {
        console.log('El usuario esta en el flujo');
      } else {
        users.push(user);
        sendMessage(user);
      }
    });
  }
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


