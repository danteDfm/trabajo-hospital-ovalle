import { Paciente } from "./entidades_dbs/paciente";
import { mysqlConnexion } from "../..";

export class Formulario{

  public paciente: Paciente;
  constructor(paciente:Paciente){
    this.paciente = paciente;
  }



}
