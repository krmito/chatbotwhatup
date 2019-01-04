export class utilities {

    constructor() { }

    static functionWithCallBack(functionX: any, timeout: number) {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
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

    static diaSemana(dia:number,mes:number,anio:number){
        var dias=["dom", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"];
        var dt = new Date(mes+' '+dia+', '+anio+' 12:00:00');
        //document.getElementById('div1').innerHTML = "Dia de la semana : " + dias[dt.getUTCDay()];    
        console.log('DIA DE LA SEMANA QUE QUIERO OBTENER '+dias[dt.getUTCDay()]);
        return dias[dt.getUTCDay()];
    }
}