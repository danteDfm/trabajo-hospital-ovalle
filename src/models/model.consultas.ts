import ConexionDatabase from "../database/conexion.database";
import FormularioRegistro from "./model.formulario";
import {
  ElementosDisforia,

} from "../interfaces/interfaz.formulario.registro";




const objDatabase = new ConexionDatabase();
export class Consultas
  extends FormularioRegistro
{
  poolConexion = objDatabase.getConnection();

  constructor(

    elementosDisofira: ElementosDisforia,
    
  ) {
    super(elementosDisofira);
  }

  async crearFichaTecnica(devolucionId: (data:boolean, query:string, formato:string)=>void, generadoConsultas: (tabla:string, veces:number, cadena:string)=>(string)) {
    try {
      
      const resultId = await devolucionId(
        this.disforia,
        generadoConsultas("DETALLES_DISFORIA", 1, "?,"),
        `${this.detallesDisforia}`
      );

      let [resultPresenciaDisforia] = await this.poolConexion.execute(
       generadoConsultas("PRESENCIA_DISFORIA", 2, "?,"),
        [this.disforia, resultId]
      );

      console.log(resultPresenciaDisforia);

      return;
    } catch (err) {
      console.log(`ERROR DE CONSULTA CREATE  ${err}`);
    }
  }
}
