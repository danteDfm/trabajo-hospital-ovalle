import { OkPacket } from "mysql2/promise";
import { mysqlConnexion } from "..";


export async function devolucionId(
  
  query: string,
  formato: any[],
  data?: boolean

): Promise<number | null> {

  try { 

    const objConexion = await mysqlConnexion;
  
    if (data) {

      let [resultadoConsulta] = await objConexion!.query(query, formato);
      const idConsultas = (resultadoConsulta as OkPacket).insertId;


      return idConsultas as number;
    } else {
      return null;
    }
  } catch (err) {

    console.log(`ERROR EN GENERADOR DE CONSULTAS ${err}`);
    throw (err);
  }
}
