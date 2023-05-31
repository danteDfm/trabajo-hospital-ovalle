import { Paciente } from "./entidades_dbs/paciente";
import { Involucrado } from "./entidades_dbs/personasInv";
import { mysqlConnexion } from "../..";

export class Formulario{

  private paciente: Paciente;
  private involucrado:Involucrado;
  private acompanante:Involucrado;
  

  constructor(paciente:Paciente, involucrado:Involucrado, acompanante:Involucrado){

    this.paciente = paciente;
    this.involucrado = involucrado;
    this.acompanante = acompanante;
  

  }
  
 async init(){

    this.conexion = await mysqlConnexion;

  }
  crearPrimerPaso(){

    const paciente = Object.values(this.paciente);
    const involucrado = Object.values(this.involucrado);
    const acompanante = Object.values(this.acompanante);


    
    console.log(involucrado);
    console.log(acompanante);
    
  }


}
