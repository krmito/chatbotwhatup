import express = require('express');
import bodyParser = require('body-parser');
import request = require('request');
import { User } from "./classes/User";
let functionFlow = require("./classes/Function");
let utilties = require("./classes/utilities");

let app = express();
let url: string = 'https://eu18.chat-api.com/instance20171/sendMessage?token=dojgtkb21ug0jab6';
let users: Array<any> = [];
let user: User;
let data: any;
let documentNumber: number;
let documentDate: string;
let message: string;
app.use(bodyParser.json());
let saludosInicial: Array<any> = [];

app.post('/my_webhook_url', (req, res) => {
  data = req.body; // New messages in the "body" variable
  console.log('ELEMENT', data);
  
  checkMessega();
/*   subFlow() */
  res.sendStatus(200); //Response does not matter
});

function checkMessega() {

  console.log('LA DIMENSION DEL MENSAJE ES ', data.messages);
  console.log('TAMAÑO ', data.messages.length);
  let input: string;
  let datos: string;

  data.messages.forEach(element => {
    input = element.body;
    saludosInicial = ["hola", "ola", "buena tarde", "buen dia", "buena noche", "qhubo"];
    saludosInicial.forEach(e => {
      console.log('chance2', e, input);

      if (e.toLowerCase() == input.trim().toLowerCase()) {
        console.log('chance1', e, input);
        datos = functionFlow.sendChangedFlujo('saludoInicial', element.senderName);
        user = new User(element.chatId, datos, 'saludoInicial');
        sendMessage(user);
        users.push(user);
      }
    });

    console.log('chance4', input);
    if (input.toLowerCase().indexOf('citas') >= 0) {
      console.log('chance3', input);
      datos = functionFlow.sendChangedFlujo('citasflow', element.senderName);
      user = new User(element.chatId, datos, 'citasInicial');
      sendMessage(user);
      users.push(user);
    }

  });

    data.messages.forEach(element => {
      console.log('element', element);
      if (element.chatId.indexOf('@')) {
        element.chatId.slice(element.chatId.indexOf('@'));
      }
  
      if (users.length == 0 || users.forEach(e => {
        e.chatId.localeCompare(element.chatId) != 0
      })) {
  
        message = functionFlow.sendChangedFlujo('saludoInicial', element.senderName);
        user = new User(element.chatId, message, 'saludoInicial');
        sendMessage(user);
        users.push(user);
      } else {
        console.log('users', users);
        users.forEach(e => {
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


