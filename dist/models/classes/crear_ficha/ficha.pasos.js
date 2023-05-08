"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntecedentesClinicosPaciente = exports.AreaPsiquica = exports.EntornoPaciente = exports.IdentidadGenero = exports.InformacionPaciente = void 0;
class InformacionPaciente {
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
exports.InformacionPaciente = InformacionPaciente;
class IdentidadGenero {
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
exports.IdentidadGenero = IdentidadGenero;
class EntornoPaciente {
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
exports.EntornoPaciente = EntornoPaciente;
class AreaPsiquica {
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
            disforia: {
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
exports.AreaPsiquica = AreaPsiquica;
class AntecedentesClinicosPaciente {
    constructor() {
        this.antecedentesClinicos = {
            detallesAntecedentesPerinatales: "",
            detallesAntecedentesHospitalizaciones: "",
            detallesAntecedentesQuirurgicos: "",
            detallesAntecedentesAlergicos: "",
            detallesAntecedentesPni: "",
            detallesAntecedentesGenitales: ""
        };
    }
}
exports.AntecedentesClinicosPaciente = AntecedentesClinicosPaciente;
