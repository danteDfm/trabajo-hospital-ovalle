
export interface FichaTecnica{

  fechaIngreso:string;
  borradoLogico:boolean;
  estadoFicha:boolean;
  apoyoEscolar:boolean;
  judicializacio: boolean;
  detallesApoyo: string;
  detallesJudicializacion:string;

}
export interface AntecedentesClinicos{
  antecedentePerinatales: string;
  antecedenteHospitalizaciones: string;
  antecedentesQuirurgicos: string;
  antecedentesAlergicos: string;
  antecedentesPni: string;
  funcionalidadGenital: string;
}
export interface PersonasInv{
  rutInvolucrada: string;
  pasaporte: string;
  nombreInvolucrada: string;
  apellidoPInvolucrada: string;
  apellidoMInvolucrada: string;
  parentescoInvolucrada: string;
  telefonoInvolucrada: string;
  domicilioInvolucrada: string;
}
export interface AreaPsiquica{
  controlEquipoSaludMental: boolean;
  psicoterapia: boolean;
  evaluacionPsiquica: boolean;
  diagnosticoPsiquiatrico: boolean;
  utilizacionFarmaco: boolean;
  detallesFarmacos: string;
}

export interface InterfacePaciente{
  rutPaciente: string;
  nombrePaciente: string;
  apellidoPaternoPa?: string | null;
  apellidoMaternoPa?: string | null;
  pronombre?: string;
  nombreSocial?: string;
  fechaNacimientoPa: Date;
  domicilioPaciente?: string;
  telefonoPaciente?: string;

}

export interface HistoriaDrogas{
  usoDroga?:boolean, 
  detalleDroga?:string
}

export interface AntecedentesFamilia{
    antecedente:boolean, 
    detalleAntecedente:boolean, 
}

export interface Dieta{
  tipoDieta:string
}

export interface HistoriaGenero{
  identidadGenero: string;
  orientacionSexual: string;
  inicioTransicioSexual: Date;
  tiempoLatencia: Date;
  apoyoFamiliar: boolean;
  usoPrenda: boolean;
  presenciaDisforia: boolean;
  detallesDiforia: string;
}

