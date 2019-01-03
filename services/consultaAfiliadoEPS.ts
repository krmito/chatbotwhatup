export class servicioAfiliadoEPS {

  static servicio = "https://virtual.comfenalcovalle.com.co/esb/RESTJSONChannelAdapter/Afiliado";
  static cuerpo = {}
  static request = require('request');
  static tipoDocumento: string = "";
  static fechaExpedicion: string = "";

  constructor() {}

  static armaObjetos(tipo:string, cedula:number) {
    this.cuerpo = {
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
              "abreviatura": tipo,
              "identificacion": cedula
            }
          }
        }
      }
    }

    this.request.post(
      {
        "headers": { "content-type": "application/json" },
        "url": this.servicio,
        "body": JSON.stringify(this.cuerpo)
      }, (error:any, response:any, body:any) => {

        if (error) {
          return console.dir(error);
        }
        if (JSON.parse(response.body).responseMessageOut.body.response.consultaAfiliadoResponse.afiliado != undefined) {
          this.tipoDocumento = JSON.parse(response.body).responseMessageOut.body.response.consultaAfiliadoResponse.afiliado.idTiid;
          this.fechaExpedicion = JSON.parse(response.body).responseMessageOut.body.response.consultaAfiliadoResponse.afiliado.fechaAfiliacionSistema;

          console.log("CC: " , this.tipoDocumento , " Fecha expedición: " , this.fechaExpedicion);
          
        } else {
          this.tipoDocumento = '';

        }
      });
  }
}