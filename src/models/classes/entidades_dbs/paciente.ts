import { InterfacePaciente } from "../../interfaces/tipos.entidades";

export class Paciente implements InterfacePaciente {

  public rutPaciente: string;
  public nombrePaciente: string;
  public apellidoPaternoPa: string | null;
  public apellidoMaternoPa: string | null;
  public fechaNacimientoPa: Date;
  public domicilioPaciente: string | null;
  public telefonoPaciente: string | null;
  public pronombre: string | null;
  public nombreSocial: string | null;

  constructor(paciente: InterfacePaciente) {
    this.rutPaciente = paciente.rutPaciente;
    this.nombrePaciente = paciente.nombrePaciente;
    this.apellidoPaternoPa = paciente.apellidoPaternoPa ? paciente.apellidoPaternoPa: null;
    this.apellidoMaternoPa = paciente.apellidoMaternoPa ? paciente.apellidoMaternoPa: null;
    this.fechaNacimientoPa = paciente.fechaNacimientoPa;
    this.domicilioPaciente = paciente.domicilioPaciente ? paciente.domicilioPaciente : null;
    this.telefonoPaciente = paciente.telefonoPaciente ? paciente.telefonoPaciente : null;
    this.pronombre = paciente.pronombre ? paciente.pronombre : null;
    this.nombreSocial = paciente.nombreSocial ? paciente.nombrePaciente : null;
  }
}
