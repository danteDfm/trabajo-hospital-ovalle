import { mysqlConnexion } from "..";

export async function select (query:string){

    try{

      const conexion = await mysqlConnexion;
      const dataDbs = await conexion?.query(query);
      return dataDbs?.[0];

    }catch(err){

        throw new Error("ERROR EN LA CONSULTA consultaSelect");

    }

}