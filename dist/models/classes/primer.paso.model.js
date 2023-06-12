"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormularioPrimerPaso = void 0;
class FormularioPrimerPaso {
    constructor(paciente, involucrado) {
        this.rutPaciente = paciente.rutPaciente;
        this.nombrePaciente = paciente.nombrePaciente;
        this.apellidoPaternoPa = paciente.apellidoPaternoPa;
        this.apellidoMaternoPa = paciente.apellidoMaternoPa;
        this.fechaNacimientoPa = paciente.fechaNacimientoPa;
        this.domicilioPaciente = paciente.domicilioPaciente;
        this.telefonoPaciente = paciente.telefonoPaciente;
        this.pronombre = paciente.pronombre;
        this.nombreSocial = paciente.nombreSocial;
        this.rutInvolucrado = involucrado.rutInvolucrado ? involucrado.rutInvolucrado : null;
        this.nombreInvolucrado = involucrado.nombreInvolucrado ? involucrado.nombreInvolucrado : null;
        this.apellidoPInvolucrado = involucrado.apellidoPInvolucrado ? involucrado.apellidoPInvolucrado : null;
        this.apellidoMInvolucrado = involucrado.apellidoMInvolucrado ? involucrado.apellidoMInvolucrado : null;
        this.parentescoInvolucrado = involucrado.parentescoInvolucrado ? involucrado.parentescoInvolucrado : null;
        this.telefonoInvolucrado = involucrado.telefonoInvolucrado ? involucrado.telefonoInvolucrado : null;
        this.domicilioInvolucrado = involucrado.domicilioInvolucrado ? involucrado.domicilioInvolucrado : null;
    }
}
exports.FormularioPrimerPaso = FormularioPrimerPaso;
