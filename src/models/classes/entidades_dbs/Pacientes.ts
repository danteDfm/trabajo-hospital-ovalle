import { OkPacket } from "mysql2";
import { Pacientes } from "../../interfaces/tipos.entidades";
import { consultasGenerales } from "../../../consultas/consultasGenerales";




export class EntidadPaciente implements Pacientes {

  paciente: {
    rutPaciente: string;
    nombrePaciente: string;
    apellidoPaternoPa: string | null;
    apellidoMaternoPa: string | null;
    pronombre: string | null;
    nombreSocial: string | null;
    fechaNacimientoPa: Date;
    domicilioPaciente: string | null;
    telefonoPaciente: string | null;
  }

  constructor(fichas: Pacientes) {
    
    this.paciente = fichas.paciente;
  }

 
  async crearPaciente():Promise <number> {

    try{

    let idPaciente:number;
    let pacienteFormateada;

    const consulta: string = "SELECT id_paciente FROM PACIENTES WHERE rut_paciente = ?";
    const creacion: string = "INSERT INTO PACIENTES VALUES (NULL, ?,?,?,?,?,?,?,?,?)";

    const dataPaciente = await consultasGenerales(consulta, [this.paciente.rutPaciente]);

   
      if (dataPaciente && dataPaciente.length > 0){

        idPaciente = dataPaciente[0].id_paciente;
        return idPaciente;

      } 

      pacienteFormateada = Object.values(this.paciente);

      const setHeaderPaciente: any = await consultasGenerales(
        creacion,
        pacienteFormateada
      );
        
      idPaciente = (setHeaderPaciente as OkPacket).insertId;
      return idPaciente;

    }catch(err){  

      console.log(err);

      throw("Error al ejecutar la consulta");

    }


  }

  comprobarVariables() {
    try {
      if (
          !this.paciente.rutPaciente ||
          !this.paciente.nombrePaciente ||
          !this.paciente.fechaNacimientoPa
      ) {
        throw 100;
      }
    } catch (err) {
      throw {
        code: err,
        status: "failure",
        msj: "Error, estas variables no pueden venir vacias, rutPaciente, nombrePaciente, fechaNacimiento",
      };
    }
  }
  async crearFicha(query:string, datos:( string | number | Date | null | undefined)[]){
    try{
 
     const data:any=await consultasGenerales(query, datos);
     const idFicha = (data as OkPacket).insertId;
     return "La operacion fue llevada con exito";
     
    }
    catch(err){
 
     
     throw("Error en crear la ficha tecnica");
 
    }
 
   }
}
