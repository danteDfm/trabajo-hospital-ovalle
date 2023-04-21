import ConexionDatabase from "../database/conexion.database";
import {OkPacket} from 'mysql2/promise';

const obj = new ConexionDatabase();
const poolConexion = obj.getConnection();

export async function devolucionId(data: boolean, query:string, formato:string){

   if(data){
     
      let  [resultadoConsulta] =  await poolConexion.execute(query, formato.split(","));
      const idDetallesDisforia = (resultadoConsulta as OkPacket).insertId;

      return idDetallesDisforia;
   }
   else{

    return null;

   }
}