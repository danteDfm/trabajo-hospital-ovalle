import { TypePaciente } from "../../types/tipos.entidades";


export class Paciente{

  //data paciente
  public rutPaciente?: string;
  public pasaporte?: string;
  public nombrePaciente: string;
  public apellidoPaternoPa?: string;
  public apellidoMaternoPa?: string;
  public pronombre?: string;
  public nombreSocial?: string;
  public fechaNacimientoPa: Date;
  public domicilioPaciente?: string;
  public telefonoPaciente?: string;
  public usoDroga: boolean;
  public antecedenteFamilires: boolean;
  public detallesUsoDroga?: string;
  public detallesAntecedentesFa?: string;

  constructor(paciente: TypePaciente){
    
    this.rutPaciente = paciente.rutPaciente;
    this.pasaporte = paciente.pasaporte;
    this.nombrePaciente = paciente.nombrePaciente;
    this.apellidoPaternoPa = paciente.apellidoPaternoPa;
    this.apellidoMaternoPa = paciente.apellidoMaternoPa;
    this.pronombre = paciente.pronombre;
    this.nombreSocial= paciente.nombreSocial;
    this.fechaNacimientoPa =paciente.fechaNacimientoPa;
    this.domicilioPaciente = paciente.domicilioPaciente;
    this.telefonoPaciente = paciente.telefonoPaciente;
    this.usoDroga = paciente.usoDroga;
    this.antecedenteFamilires = paciente.antecedenteFamilires;
    this.detallesUsoDroga = paciente.detallesUsoDroga;
    this.detallesAntecedentesFa = paciente.detallesAntecedentesFa;
 

  }

}



