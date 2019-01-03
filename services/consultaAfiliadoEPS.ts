
let servicio = "https://virtual.comfenalcovalle.com.co/esb/RESTJSONChannelAdapter/Afiliado";
let cuerpo = {}
let tipoDocumento;
let dni;
let fechaExpedicion;
let numeroAfiliacion;

let Request = require("request");

function armaObjetos() {

  cuerpo = {
    "requestMessageOut": {
      "header": {
        "invokerDateTime": "2017-11-11 08:49:45",
        "moduleId": "TAQUILLA1",
        "systemId": "PEEWAH",
        "messageId": "PEEWAH|TAQUILLA1|CC901097473",
        "logginData": {
          "sourceSystemId": "",
          "destinationSystemId": ""
        },
        "destination": {
          "namespace": "http://co/com/comfenalcovalle/esb/ws/ValidadorConsultaAfiliadosCaja",
          "name": "ValidadorConsultaAfiliadosCaja",
          "operation": "execute"
        },
        "securityCredential": {
          "userName": "",
          "userToken": ""
        },
        "classification": { "classification": "" }
      },
      "body": {
        "request": {
          "consultaAfiliadoRequest": {
            "abreviatura": arguments[0],
            "identificacion": arguments[1]
          }
        }
      }
    }
  }

  Request.post({
    "headers": { "content-type": "application/json" },
    "url": servicio,
    "body": JSON.stringify(cuerpo)
  }, (error, response, body) => {
    if (error) {
      return console.dir(error);
    }

    if (JSON.parse(response.body).responseMessageOut.body.response.consultaAfiliadoResponse.afiliado != undefined) {
      tipoDocumento = JSON.parse(response.body).responseMessageOut.body.response.consultaAfiliadoResponse.afiliado.idTiid;
      fechaExpedicion = JSON.parse(response.body).responseMessageOut.body.response.consultaAfiliadoResponse.afiliado.fechaAfiliacionSistema;

    } else {
      tipoDocumento = '';

    });
}
