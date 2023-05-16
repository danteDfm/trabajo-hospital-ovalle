
//informacion personal del paciente
export interface InformacionPersonalPaciente {

  rutPaciente: string;
  nombrePaciente: string;
  apellidoPaternoPaciente: string;
  apellidoMaternoPaciente: string;
  pronombre?: string | null;
  nombreSocial?: string | null;
  fechaNacimiento: Date;
  domicilioPaciente?: string | null;
}


//informacion de los involucrados en el proceso
export interface InformacionDatosInvolucrados {

    dataInvolucrado:{

        rutPersonaInvolucrada?:string | null;
        nombresPersonaInvolucrada?:string | null;
        apellidoPaternoInvolucrado?:string | null;
        apellidoMaternoInvolucrado?:string | null;
        parentescoPersonaInvolucrada?:string | null;
        telefonoPersonaInvolucrada:string | null;
        domicilioPersonaInvolucrada?:string | null;    

    },
    dataAcompanante:{

        rutAcompanante?:string | null;
        nombreCompletoAcompanante?:string | null;
        parentescoAcompanante?:string | null;
        telefonoAcompanante?:string | null;    

    }
    

}


//infromacion relacionada a la identidad de genero

export interface HistoriaIdentidadGenero{

    historiaGenero:{

      identidadGenero?:string | null;
      orientacionSexual?:string | null;
      inicioTransicion: Date;
      tiempoLatencia:Date;
      apoyoNucleoFamiliar?: boolean;

    },
    prendasDisconformidadGenero:{

     usoPrenda:boolean;
     prendas?:[]

    }

}

//informacion relaxionada con el entorno, escolar y antecedentes de la familia
export interface Entorno{

    escolaridad:{

        apoyoEscolar: boolean,
        detallesApoyo?: string | null;


    },
    antecedentesFamiliares:{

        presenciaAntecedentes:boolean;
        detallesAntecedentes:string;


    },
    judicializaciones:{

        juicio:boolean,
        dataTribunal:string

    }

}

//todo lo relacionado a la psique del paciente
export interface AreasPsiquica{

    datosPsiquicos:{

        controlEquipoSaludMental:boolean;
        psicoterapia:boolean;
        evaluacionPsiquica:boolean;
        diagnosticoPsiquiatrico:boolean;
        
    },
    usoFarmacos:{

        usoFarmaco:boolean;
        tipoFarmaco?:string | null;

    },
    disforia:{

        presenciaDisforia:boolean;
        detallesDisforia:string

    },
    habitos:{
    
        alimenticios:string;
        usoDrogas:boolean;
        drogas?:string | null;
        
    }


}

//toddo relacionado a los antecedentes del paciente

export interface AntecedentesClinicos{

    detallesAntecedentesPerinatales?:string | null | undefined;
    detallesAntecedentesHospitalizaciones?:string | null | undefined;
    detallesAntecedentesQuirurgicos?:string | null | undefined;
    detallesAntecedentesAlergicos?:string | null | undefined;
    detallesAntecedentesPni?:string | null | undefined;
    detallesAntecedentesGenitales?:string | null | undefined;

}