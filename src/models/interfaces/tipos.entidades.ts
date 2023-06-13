

    export interface Pacientes {

      rutPaciente?: string;
      nombrePaciente: string;
      apellidoPaternoPa: string | null;
      apellidoMaternoPa: string | null;
      pronombre: string | null;
      nombreSocial: string | null;
      fechaNacimientoPa: Date;
      domicilioPaciente: string | null;
      telefonoPaciente: string | null;
    }




export interface AntecedentesClinicos {

  antecedentePerinatales: string | null;
  antecedenteHospitalizaciones: string | null;
  antecedentesQuirurgicos: string | null;
  antecedentesAlergicos: string | null;
  antecedentesPni: string | null;
  funcionalidadGenital: string | null;
  antecedentesFamilia:string | null
}



export interface AreaPsiquica {
  controlEquipoSaludMental?: boolean | null;
  psicoterapia?: boolean | null;
  evaluacionPsiquica?: boolean | null;
  diagnosticoPsiquiatrico?: boolean | null;
  utilizacionFarmaco?: boolean | null;
  detallesFarmacos?: string | null;
}

export interface PrimerPaso{

  involucrado: {

    rutInvolucrado: string | null;
    nombreInvolucrado: string | null;
    apellidoPInvolucrado: string | null;
    apellidoMInvolucrado: string | null;
    fechaNacimiento: string | null

    parentescoInvolucrado: string | null;
    telefonoInvolucrado: string | null;
    domicilioInvolucrado: string | null;
  
  },
  acompanante: {

      rutInvolucrado: string | null;
      nombreInvolucrado: string | null;
      apellidoPInvolucrado: string | null;
      apellidoMInvolucrado: string | null;
      fechaNacimiento: string | null;
      parentescoInvolucrado: string | null;
      telefonoInvolucrado: string | null;
      domicilioInvolucrado: string | null;

  
    }
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
    
    identidadGenero: string | null;
    orientacionSexual: string | null;
    autopercepcion: number | null;
    inicioTransicioSexual: Date | null;
    tiempoLatencia: Date | null;
    apoyoFamiliar: boolean | null;
    usoPrenda: boolean | null;
    presenciaDisforia: boolean | null;
    detallesDiforia: string | null;
   

  
}

