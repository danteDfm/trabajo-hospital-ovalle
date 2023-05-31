"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paciente = void 0;
class Paciente {
    constructor(paciente) {
        this.rutPaciente = paciente.rutPaciente;
        this.nombrePaciente = paciente.nombrePaciente;
        this.apellidoPaternoPa = paciente.apellidoPaternoPa ? paciente.apellidoPaternoPa : null;
        this.apellidoMaternoPa = paciente.apellidoMaternoPa ? paciente.apellidoMaternoPa : null;
        this.pronombre = paciente.pronombre;
        this.nombreSocial = paciente.nombreSocial;
        this.fechaNacimientoPa = paciente.fechaNacimientoPa;
        this.domicilioPaciente = paciente.domicilioPaciente;
        this.telefonoPaciente = paciente.telefonoPaciente;
    }
}
exports.Paciente = Paciente;
