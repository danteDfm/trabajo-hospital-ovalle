import { format, utcToZonedTime } from 'date-fns-tz';
import moment from 'moment-timezone';

export function fechaExacta():string{

    
    const zona = "America/Santiago";
    let fecha  = new Date().toISOString().split('T').shift();
    const tiempo = moment().tz(zona).format('HH:mm:ss');


    const fechayhora = `${fecha} ${tiempo}`;
    return fechayhora;

}