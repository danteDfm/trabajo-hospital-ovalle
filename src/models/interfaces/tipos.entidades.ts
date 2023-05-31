export interface FichaTecnica {
  fechaIngreso: Date;
  fechaFinalizacion: Date;
  estadoFicha: boolean;
  borradoLogico: boolean;
  apoyoEscolar?: boolean;
  judicializacio?: boolean;
  detallesApoyo?: string;
  detallesJudicializacion?: string;
}

export interface AntecedentesClinicos {
  antecedentePerinatales?: string;
  antecedenteHospitalizaciones?: string;
  antecedentesQuirurgicos?: string;
  antecedentesAlergicos?: string;
  antecedentesPni?: string;
  funcionalidadGenital?: string;
}


export interface InterfacePersonasInv {
  rutInvolucrado: string | null;
  nombreInvolucrado: string | null;
  apellidoPInvolucrado: string | null;
  apellidoMInvolucrado: string | null;
  parentescoInvolucrado: string | null;
  telefonoInvolucrado: string | null;
  domicilioInvolucrado: string | null;
}



export interface AreaPsiquica {
  controlEquipoSaludMental?: boolean;
  psicoterapia?: boolean;
  evaluacionPsiquica?: boolean;
  diagnosticoPsiquiatrico?: boolean;
  utilizacionFarmaco?: boolean;
  detallesFarmacos?: string;
}

export interface InterfacePaciente {
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

export interface HistoriaDrogas {
  usoDroga?: boolean;
  detalleDroga?: string;
}

export interface AntecedentesFamilia {
  antecedente?: boolean;
  detalleAntecedente?: boolean;
}

export interface Dieta {
  tipoDieta: string;
}

export interface HistoriaGenero {
  identidadGenero?: string | null;
  orientacionSexual?: string | null;
  inicioTransicioSexual?: Date | null;
  tiempoLatencia?: Date | null;
  apoyoFamiliar?: boolean | null;
  usoPrenda?: boolean | null;
  presenciaDisforia?: boolean | null;
  detallesDiforia?: string | null;
}

export interface Prenda{

  tipoPrenda?: Array<number>

}