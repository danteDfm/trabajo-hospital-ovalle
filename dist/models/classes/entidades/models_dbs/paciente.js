"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paciente = void 0;
class Paciente {
    constructor(paciente) {
        this.rutPaciente = paciente.rutPaciente;
        this.pasaporte = paciente.pasaporte;
        this.nombrePaciente = paciente.nombrePaciente;
        this.apellidoPaternoPa = paciente.apellidoPaternoPa;
        this.apellidoMaternoPa = paciente.apellidoMaternoPa;
        this.pronombre = paciente.pronombre;
        this.nombreSocial = paciente.nombreSocial;
        this.fechaNacimientoPa = paciente.fechaNacimientoPa;
        this.domicilioPaciente = paciente.domicilioPaciente;
        this.telefonoPaciente = paciente.telefonoPaciente;
        this.usoDroga = paciente.usoDroga;
        this.antecedenteFamilires = paciente.antecedenteFamilires;
        this.detallesUsoDroga = paciente.detallesUsoDroga;
        this.detallesAntecedentesFa = paciente.detallesAntecedentesFa;
    }
}
exports.Paciente = Paciente;
