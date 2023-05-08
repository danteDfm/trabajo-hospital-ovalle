import {
  InformacionPersonalPaciente,
  InformacionDatosInvolucrados,
  AntecedentesClinicos,
} from "../../interfaces/data.ficha.tecnica";
import { HistoriaIdentidadGenero } from "../../interfaces/data.ficha.tecnica";
import { Entorno } from "../../interfaces/data.ficha.tecnica";
import { AreasPsiquica } from "../../interfaces/data.ficha.tecnica";

export class InformacionPaciente {
  dataPaciente: InformacionPersonalPaciente;
  dataInvolucrados: InformacionDatosInvolucrados;

  constructor() {
    this.dataPaciente = {
      rutPaciente: "",
      nombrePaciente: "",
      apellidoPaternoPaciente: "",
      apellidoMaternoPaciente: "",
      pronombre: "",
      nombreSocial: "",
      fechaNacimiento: new Date(),
      domicilioPaciente: "",
    };

    this.dataInvolucrados = {
      dataInvolucrado: {
        rutPersonaInvolucrada: "",
        nombresPersonaInvolucrada: "",
        apellidoPaternoInvolucrado: "",
        apellidoMaternoInvolucrado: "",
        parentescoPersonaInvolucrada: "",
        telefonoPersonaInvolucrada: 0,
        domicilioPersonaInvolucrada: "",
      },

      dataAcompanante: {
        rutAcompanante: "",
        nombreCompletoAcompanante: "",
        parentescoAcompanante: "",
        telefonoAcompanante: 0,
      },
    };
  }
}

export class IdentidadGenero {
  historiaIdentidadGenero: HistoriaIdentidadGenero;

  constructor() {
    this.historiaIdentidadGenero = {
      historiaGenero: {
        identidadGenero: "",
        orientacionSexual: "",
        inicioTransicion: new Date(),
        tiempoLtencia: new Date(),
        apoyoNucleoFamiliar: "",
      },
      prendasDisconformidadGenero: {
        usoPrenda: false,
        prendas: []
      },
    };
  }
}


export class EntornoPaciente {
  entornoPaciente: Entorno;
  constructor() {
    this.entornoPaciente = {
      escolaridad: {
        gradoEscolar: "",
        gradoDeApoyo: "",
        actorInvolucrado: "",
        detallesApoyo: "",
      },
      antecedentesFamiliares: {
        presenciaAntecedentes: false,
        detallesAntecedentes: "",
      },
    };
  }
}

export class AreaPsiquica {
  datosPsiquicos: AreasPsiquica;

  constructor() {
    this.datosPsiquicos = {
      datosPsiquicos: {
        controlEquipoSaludMental: false,
        psicoterapia: false,
        evaluacionPsiquica: false,
        diagnosicoPsiquiatrico: false,
      },
      usofarmacos: {
        usoFarmaco: false,
        tipoFarmaco: "",
      },
      disforia:{

        presenciaDisforia: false,
        detallesDisforia: ""

      },
      habitos: {
        alimenticios: "",
        usoDrogas: false,
        drogas: "",
      },
    };
  }
}

export class AntecedentesClinicosPaciente{

  antecedentesClinicos: AntecedentesClinicos;

  constructor(){

    this.antecedentesClinicos={

      detallesAntecedentesPerinatales: "",
      detallesAntecedentesHospitalizaciones: "",
      detallesAntecedentesQuirurgicos: "",
      detallesAntecedentesAlergicos: "",
      detallesAntecedentesPni: "",
      detallesAntecedentesGenitales: ""

    } 



  }

}