"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var servicioAfiliadoEPS = /** @class */ (function () {
    function servicioAfiliadoEPS() {
    }
    servicioAfiliadoEPS.armaObjetos = function (tipo, cedula) {
        var _this = this;
        console.log("Tipo: ", tipo, " cédula: ", cedula);
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
        };
        console.log("Cuerpo: " + JSON.stringify(this.cuerpo));
        this.request.post({
            "headers": { "content-type": "application/json" },
            "url": this.servicio,
            "body": JSON.stringify(this.cuerpo)
        }, function (error, response, body) {
            _this.reponse = response;
            if (error) {
                return console.dir(error);
            }
            if (JSON.parse(response.body).responseMessageOut.body.response.consultaAfiliadoResponse.afiliado != undefined) {
                _this.tipoDocumento = JSON.parse(response.body).responseMessageOut.body.response.consultaAfiliadoResponse.afiliado.idTiid;
                _this.fechaExpedicion = JSON.parse(response.body).responseMessageOut.body.response.consultaAfiliadoResponse.afiliado.fechaAfiliacionSistema;
                console.log("CC: ", _this.tipoDocumento, " Fecha expedición: ", _this.fechaExpedicion);
            }
            else {
                _this.tipoDocumento = '';
            }
        });
        return this.reponse;
    };
    servicioAfiliadoEPS.servicio = "https://virtual.comfenalcovalle.com.co/esb/RESTJSONChannelAdapter/Afiliado";
    servicioAfiliadoEPS.cuerpo = {};
    servicioAfiliadoEPS.request = require('request');
    servicioAfiliadoEPS.tipoDocumento = "";
    servicioAfiliadoEPS.fechaExpedicion = "";
    return servicioAfiliadoEPS;
}());
exports.servicioAfiliadoEPS = servicioAfiliadoEPS;
