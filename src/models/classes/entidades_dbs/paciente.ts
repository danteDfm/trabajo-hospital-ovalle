import { InterfacePaciente } from "../../interfaces/tipos.entidades";

export class Paciente implements InterfacePaciente {
  public rutPaciente: string;
  public pasaporte?: string;
  public nombrePaciente: string;
  public apellidoPaternoPa?: string | null;
  public apellidoMaternoPa?: string | null;
  public pronombre?: string;
  public nombreSocial?: string;
  public fechaNacimientoPa: Date;
  public domicilioPaciente?: string;
  public telefonoPaciente?: string;

  constructor(paciente: InterfacePaciente) {
    this.rutPaciente = paciente.rutPaciente;
    this.nombrePaciente = paciente.nombrePaciente;
    this.apellidoPaternoPa = paciente.apellidoPaternoPa ? paciente.apellidoPaternoPa: null;
    this.apellidoMaternoPa = paciente.apellidoMaternoPa ? paciente.apellidoMaternoPa: null;
    this.pronombre = paciente.pronombre;
    this.nombreSocial = paciente.nombreSocial;
    this.fechaNacimientoPa = paciente.fechaNacimientoPa;
    this.domicilioPaciente = paciente.domicilioPaciente;
    this.telefonoPaciente = paciente.telefonoPaciente;
  }
}
