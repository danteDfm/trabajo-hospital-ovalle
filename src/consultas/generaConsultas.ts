import {repetirCadena} from '../utils/repetir.cadena';

export function generadoConsultas(tabla:string, veces:number, cadena:string): string{

    let resultadoCadena:string="";
    let queryFormateada:string="";

    try{
        
        if(!tabla ||  !veces || !cadena) throw new Error("LOS ARGUMENTOS NO PUEDEN ESTAR VACIOS");
        if(veces < 0 || veces > 40) throw new Error("NO EXISTEN TABLAS CON DEMASIADOS CAMPOS");

        resultadoCadena=repetirCadena(veces, cadena);
        queryFormateada= `INSERT INTO ${tabla.trim()} VALUES(NULL, ${resultadoCadena.slice(0,-1)})`;
        return queryFormateada;
    }
    catch(err){

        console.log(err);

    }

    return "";
}

