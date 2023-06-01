import { Paciente } from "./entidades_dbs/paciente";
import { Involucrado } from "./entidades_dbs/personasInv";
import { mysqlConnexion } from "../..";
import { OkPacket } from "mysql2";
import { consultasGenerales } from "../../consultas/consultasGenerales";

export class Formulario {
  private paciente?: Paciente;
  private involucrado?: Involucrado;
  private acompanante?: Involucrado;



  constructor(
    paciente?: Paciente,
    involucrado?: Involucrado,
    acompanante?: Involucrado
  ) {
    this.paciente = paciente;
    this.involucrado = involucrado;
    this.acompanante = acompanante;
  } 
  


   async existenciaUsuario(rutPaciente:string | undefined): Promise<number | undefined>{

    const query:string = "SELECT id_paciente FROM PACIENTES WHERE rut_paciente = ?"
    const resultado:any = await consultasGenerales(query, [rutPaciente]);
   
    if(resultado && resultado.length > 0){
     
      return resultado[0].id_paciente;

    }
    else{
    return undefined;
    }


  }

  async crearPrimerPaso(){

    const conexion = await mysqlConnexion;

    let valuePaciente;
    let valueInvolucrado;
    let valueAcompanante;

    if(this.paciente) valuePaciente = Object.values(this.paciente);
    if(this.involucrado) valueInvolucrado = Object.values(this.involucrado);
    if(this.acompanante) valueAcompanante = Object.values(this.acompanante);

    let idPaciente: number | undefined;

    try {

      
      idPaciente = await this.existenciaUsuario(this.paciente?.rutPaciente);
       
      

      if(!idPaciente){ 

        
        var [resultadoPaciente]: any = await conexion?.query(`INSERT INTO PACIENTES VALUES (NULL, ?,?,?,?,?,?,?,?,?)`,
        valuePaciente
        );
  
        idPaciente = (resultadoPaciente as OkPacket).insertId;
       
      }

      
      
      const [resultadoInvolucrado]:any = await conexion?.query(`INSERT INTO PERSONAS_INVOLUCRADAS_TRANSICION VALUES (NULL, ?,?,?,?,?,?,?)`, valueInvolucrado);

      const [resultadoAcompanante]:any = await conexion?.query(`INSERT INTO PERSONAS_INVOLUCRADAS_TRANSICION VALUES (NULL, ?,?,?,?,?,?,?)`, valueAcompanante);


  

      const ida = (resultadoInvolucrado as OkPacket).insertId;
      const idi = (resultadoAcompanante as OkPacket).insertId;
     
      console.log(idPaciente);
      console.log(ida);
      console.log(idi);


      return "primer paso completado";


    } catch (error:any){

      console.log(error);
      throw new Error("Error al guardar primer paso");

    }
  }

  crearSegundoPaso(){





  }
}
