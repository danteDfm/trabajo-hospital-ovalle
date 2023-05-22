import { mysqlConnexion } from "..";

type Formato = number | string | Date | undefined | boolean;

export async function consultasGenerales(query: string, formato?:Formato[]) {
  try {
    const conexion = await mysqlConnexion;
    const [dataDbs]: any = await conexion?.query(query, formato);
    return dataDbs;
  } catch (err) {
    throw err;
  }
}

export async function returnNull(query: string, formato: Formato) {
  try {
    if (!formato) {
      return 0;
    }
    const conexion = await mysqlConnexion;
    const [dataDbs]: any = await conexion?.query(query, [formato]);
    return dataDbs;
  } catch (err) {
    throw err;
  }
}
