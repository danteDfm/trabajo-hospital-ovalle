import { consultasGenerales } from "../../consultas/consultasGenerales";

export class PaginaPrincipal{


    async TotalPacientes(){

       const totalPacientes = await consultasGenerales(`SELECT COUNT(id_paciente) AS "paciente" FROM pacientes`);
       return totalPacientes[0];

    }
    async cantidadGeneros(genero:string){

        const [result]:any = await consultasGenerales(`SELECT count(identidad_genero) AS "generos" FROM historias_identidades_generos
        WHERE identidad_genero = ?`, [genero]);
         return result.generos;

    }
    async ingresosDelDia(){

        const query = `SELECT count(id_ficha_tecnica) as ingresosDia FROM fichas_tecnicas WHERE DATE(fecha_ingreso) = CURDATE();`;
        const result=await consultasGenerales(query);
        return result[0];

    }

   

} 