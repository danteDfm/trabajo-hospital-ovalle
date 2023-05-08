"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InformacionPaciente = void 0;
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
