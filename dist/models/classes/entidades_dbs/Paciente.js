"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paciente = void 0;
class Paciente {
    constructor(paciente) {
        this.rutPaciente = paciente.rutPaciente;
        this.nombrePaciente = paciente.nombrePaciente;
        this.apellidoPaternoPa = paciente.apellidoPaternoPa ? paciente.apellidoPaternoPa : null;
        this.apellidoMaternoPa = paciente.apellidoMaternoPa ? paciente.apellidoMaternoPa : null;
        this.pronombre = paciente.pronombre ? paciente.pronombre : null;
        this.nombreSocial = paciente.nombreSocial ? paciente.nombrePaciente : null;
        this.fechaNacimientoPa = paciente.fechaNacimientoPa;
        this.domicilioPaciente = paciente.domicilioPaciente ? paciente.domicilioPaciente : null;
        this.telefonoPaciente = paciente.telefonoPaciente ? paciente.telefonoPaciente : null;
    }
}
exports.Paciente = Paciente;
