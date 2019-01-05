
let messagesToSend = {
  newMessage: function (state?: string, userName?: string, dia?: string, hora?: string, x?: string, objecto?: any, correo:string) {
    let mensaje = '';

    switch (state) {
      case 'saludoInicial':
        mensaje = `Hola, ${userName} Bienvenido a la linea de atencion de *Comfenalco*.
        Por favor dime en que quieres que te ayude utiliza una de las palabras claves: 
*1.Certificados* 📄
*2.Afiliacion* 🆘
*3.Subsidios* 💵
*4.Citas* 📅
*5.Cancelar* ⏹️`;
        break;
      case 'citaInicial2':
        mensaje = `Por favor ${userName} escoje el tipo de documento: 
*1.Cédula de ciudadanía*
*2.Pasaporte* 
*3.Tarjeta de identidad* 
*4.Cancelar* ⏹️`;
        break;
      case 'citaInicial1':
        mensaje = `${userName} que tipo de cita quieres que se te agende
      *1.General*
      *2.Odontologia* `;
        break;
      case 'certificados':
        mensaje = `Por favor ${userName} digite su numero de cedula sin puntos ni comas`;
        break;
      case 'citasSubFlow1':
        mensaje = `Por favor ${userName} digite el numero de su documento (Ejemplo: 1144256257)`;
        break;
      case 'docInvalido':
        mensaje = `Por favor ${userName} digite un número de documento válido 
*Formato: Sin espacios, sin comas, sin letras, sin caractéres especiales*`;
        break;
      case 'docInvalidoFecha':
        mensaje = `Por favor ${userName} digite una fecha de expedicion válida 
*(1990-12-20)*`;
        break;
      case 'citasSubFlow2':
        mensaje = `Por favor ${userName} digite la fecha de expedicion de su documento (1990-12-20)`;
        break;
      case 'citasSubFlow3':
        mensaje = `${userName} su numero de documento no se encuentra registrado, por favor intentalo de nuevo`;
        break;
      case 'eligeCita1':
        mensaje = ` Tus datos son: 
Tu calidad de afiliado ${objecto.calidad}
Tu fecha de afiliacion ${objecto.fecha}
Tu tipo de afilaición ${objecto.tipo}
        ${userName} se a verificado su documento exitosamente, estos son los dias en que tenemos citas disponibles
        *1. Martes* 
        *2. Miercoles* 
        *3. Jueves* 
        *4. Viernes* 
        *5.Cancelar* 
`;
        break;
      case 'eligeCita2':
        mensaje = `${userName} estas son las horas en que tenemos citas disponibles para el ${dia}
*1. 8:00* 
*2. 9:00* 
*3. 3:30* 
*4. 4:20* 
*5.Cancelar* 
`;
        break;
      case 'eligeCita3':
        mensaje = `${userName} su cita esta para el ${dia} a las ${hora} en la sede principal,
        quieres que te enviemos la información a tu correo: ${correo}
        *1. Ok*
        *2. Cancelar*`;
        break;
      case 'eligeCita4':
        mensaje = `Desea que le mandemos esta informacion a su correo
        *1. Si*
        *2. No*`;
        break;
      case 'eligeCita5':
        mensaje = `Gracias ${userName}, hasta la próxima`;
        break;
      case 'eligeCita6':
        mensaje = `Bye`;
        break;
      case 'eligeCita7':
        mensaje = `${userName} no te entiendo`;
        break;
    }
    return mensaje;
  }
}

module.exports = messagesToSend;
