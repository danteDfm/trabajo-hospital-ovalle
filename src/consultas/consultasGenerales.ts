import { mysqlConnexion } from "..";
import { Formato } from "../models/types/paciente";

export async function consultasGenerales(query: string, formato?:Formato[]) {
  try {
    const conexion = await mysqlConnexion;
    const [dataDbs]: any = await conexion?.query(query, formato);
    return dataDbs;
  } catch (err) {
    
    console.log(err);
    throw ("Error interno de la consultas generales");
  }
}

