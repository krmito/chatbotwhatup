let functions = {
  sendChangedFlujo: function(nombre: string, user: string) {
    let mensaje = '';

    switch (nombre) {
      case 'saludoInicial':
        mensaje = `Hola, ${user} Bienvenido a la linea de atencion de *S.O.S*.
Por favor dime en que quieres que te ayude utiliza una de las palabras claves:
*Certificados*📄
*Afiliacion* 🆘
*Subsidios* 💵
*Cancelar* ⏹️`;
        break;
      case 'certificados':
        mensaje = `Por favor ${user} digite su numero de cedula sin puntos ni comas`;
        break;
    }
    return mensaje;
  }
}

module.exports = functions;
