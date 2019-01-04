export class utilities {

    constructor() { }

    static functionWithCallBack(functionX: any, timeout: number) {
        let promise = new Promise((resolve, reject) => {
            console.log('entro1');

            setTimeout(() => {
                console.log('entro3');
                functionX
                resolve();
            }, timeout);
        });
        return promise;
    }

    static isContain(input: string, value: any) {
        if (input.includes(value)) {
            return value;
        }
    }

    static diaSemana(dia: string, mes: string, anio: string) {
        let dias = ["dom", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"];
        let dt = new Date(mes + ' ' + dia + ', ' + anio + ' 12:00:00');
        console.log('DIA DE LA SEMANA QUE QUIERO OBTENER ' + dias[dt.getUTCDay()]);
        return dias[dt.getUTCDay()];
    }
}