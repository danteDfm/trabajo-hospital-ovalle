import { Pacientes } from "../interfaces/formulario.registro";
import ConexionDatabase from "../database/conexion.database";
import {OkPacket} from 'mysql2/promise';


const objDatabase = new ConexionDatabase();

export class FormularioRegistro{

  //conexion
  poolConexion = objDatabase.getConnection();

 
  async crearFichaTecnica(){

        try{

          const result = (await this.poolConexion).query("SELETC * FROM DETALLES_DISFORIA");
          console.log(result);

        }catch(err){

  
           
            console.log(err);

        }

  }

   

  
}
