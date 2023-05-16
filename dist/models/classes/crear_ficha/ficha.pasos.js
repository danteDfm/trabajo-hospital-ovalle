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
            pronombre: undefined,
            nombreSocial: undefined,
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
                telefonoPersonaInvolucrada: "",
                domicilioPersonaInvolucrada: "",
            },
            dataAcompanante: {
                rutAcompanante: "",
                nombreCompletoAcompanante: "",
                parentescoAcompanante: "",
                telefonoAcompanante: "",
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
                tiempoLatencia: new Date(),
                apoyoNucleoFamiliar: false,
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
                apoyoEscolar: false,
                detallesApoyo: ""
            },
            antecedentesFamiliares: {
                presenciaAntecedentes: false,
                detallesAntecedentes: "",
            },
            judicializaciones: {
                juicio: false,
                dataTribunal: ""
            }
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
                diagnosticoPsiquiatrico: false,
            },
            usoFarmacos: {
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
