
export type TypeFichaTecnica = {

  fechaIngreso:string;
  borradoLogico:boolean;
  apoyoEscolar:boolean;
  judicializacio: boolean;
  detallesApoyo: string;
  detallesJudicializacion:string;

}
export type TypeAntecedentesClinicos = {
  antecedentePerinatales: string;
  antecedenteHospitalizaciones: string;
  antecedentesQuirurgicos: string;
  antecedentesAlergicos: string;
  antecedentesPni: string;
  funcionalidadGenital: string;
}
export type TypePersonasInv = {
  rutInvolucrada: string;
  pasaporte: string;
  nombreInvolucrada: string;
  apellidoPInvolucrada: string;
  apellidoMInvolucrada: string;
  parentescoInvolucrada: string;
  telefonoInvolucrada: string;
  domicilioInvolucrada: string;
}
export type AreaPsiquica = {
  controlEquipoSaludMental: boolean;
  psicoterapia: boolean;
  evaluacionPsiquica: boolean;
  diagnosticoPsiquiatrico: boolean;
  utilizacionFarmaco: boolean;
  detallesFarmacos: string;
}

export type TypePaciente ={
  rutPaciente: string;
  pasaporte: string;
  nombrePaciente: string;
  apellidoPaternoPa: string;
  apellidoMaternoPa: string;
  pronombre: string;
  nombreSocial: string;
  fechaNacimientoPa: Date;
  domicilioPaciente: string;
  telefonoPaciente: string;
  usoDroga: boolean;
  antecedenteFamilires: boolean;
  detallesUsoDroga: string;
  detallesAntecedentesFa: string;

}

export type TypeHistoriaGenero = {
  identidadGenero: string;
  orientacionSexual: string;
  inicioTransicioSexual: Date;
  tiempoLatencia: Date;
  apoyoFamiliar: boolean;
  usoPrenda: boolean;
  presenciaDisforia: boolean;
  detallesDiforia: string;
}

export type PrendaYdieta={

  detallesHabitoAlimenticio: string;
  fkPrendaDisconformidad: Array<number>; 

}

