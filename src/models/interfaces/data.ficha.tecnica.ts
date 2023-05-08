
//informacion personal del paciente
export interface InformacionPersonalPaciente {

  rutPaciente: string;
  nombrePaciente: string;
  apellidoPaternoPaciente: string;
  apellidoMaternoPaciente: string;
  pronombre?: string;
  nombreSocial?: string;
  fechaNacimiento: Date;
  domicilioPaciente?: string;
}


//informacion de los involucrados en el proceso
export interface InformacionDatosInvolucrados {

    dataInvolucrado:{

        rutPersonaInvolucrada:string;
        nombresPersonaInvolucrada:string;
        apellidoPaternoInvolucrado:string;
        apellidoMaternoInvolucrado:string;
        parentescoPersonaInvolucrada?:string;
        telefonoPersonaInvolucrada?:number;
        domicilioPersonaInvolucrada?:string;    

    },
    dataAcompanante:{

        rutAcompanante:string;
        nombreCompletoAcompanante:string;
        parentescoAcompanante?:string;
        telefonoAcompanante?:number;    

    }
    

}


//infromacion relacionada a la identidad de genero

export interface HistoriaIdentidadGenero{

    historiaGenero:{

      identidadGenero?:string;
      orientacionSexual?:string;
      inicioTransicion: Date;
      tiempoLtencia:Date;
      apoyoNucleoFamiliar?:string;

    },
    prendasDisconformidadGenero:{

     usoPrenda:boolean;
     prendas?:[]

    }

}

//informacion relaxionada con el entorno, escolar y antecedentes de la familia
export interface Entorno{

    escolaridad:{

        gradoEscolar:string;
        gradoDeApoyo:string;
        actorInvolucrado?:string;
        detallesApoyo?:string;


    },
    antecedentesFamiliares:{

        presenciaAntecedentes:boolean;
        detallesAntecedentes:string;


    }

}

//todo lo relacionado a la psique del paciente
export interface AreasPsiquica{

    datosPsiquicos:{

        controlEquipoSaludMental:boolean;
        psicoterapia:boolean;
        evaluacionPsiquica:boolean;
        diagnosicoPsiquiatrico:boolean;
        
    },
    usofarmacos:{

        usoFarmaco:boolean;
        tipoFarmaco?:string;

    },
    disforia:{

        presenciaDisforia:boolean;
        detallesDisforia:string

    },
    habitos:{
    
        alimenticios:string;
        usoDrogas:boolean;
        drogas?:string;
        
    }


}

//toddo relacionado a los antecedentes del paciente

export interface AntecedentesClinicos{

    detallesAntecedentesPerinatales:string;
    detallesAntecedentesHospitalizaciones:string;
    detallesAntecedentesQuirurgicos:string;
    detallesAntecedentesAlergicos:string;
    detallesAntecedentesPni:string;
    detallesAntecedentesGenitales:string;

}