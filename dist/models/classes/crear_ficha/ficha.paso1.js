"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entorno = exports.IdentidadGenero = exports.InformacionPaciente = void 0;
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
                predas: "",
            },
        };
    }
}
exports.IdentidadGenero = IdentidadGenero;
class entorno {
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
exports.entorno = entorno;
