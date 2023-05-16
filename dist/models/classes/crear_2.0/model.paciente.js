"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paciente = void 0;
const consultasGenerales_1 = require("../../../consultas/consultasGenerales");
const entidades_1 = require("../entidades");
const dic_query_1 = require("../../../consultas/dic.query");
class Paciente extends entidades_1.Entidades {
    constructor(paciente, rutPaciente, nombrePaciente, apellidoPaternoPaciente, apellidoMaternoPaciente) {
        super(rutPaciente, nombrePaciente, apellidoPaternoPaciente, apellidoMaternoPaciente);
        this.paciente = paciente;
    }
    crearPaciente() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, consultasGenerales_1.consultasGenerales)(dic_query_1.diccionarioPaciente.crear, [
                    this.rut,
                    this.nombre,
                    this.apellidoPaterno,
                    this.apellidoMaterno,
                    this.paciente.pronombre,
                    this.paciente.nombreSocial,
                    this.paciente.fechaNacimientoPaciente,
                    this.paciente.domicilioPaciente,
                    this.paciente.usoDroga,
                    this.paciente.antecedenteFamiliares,
                ]);
                return result;
            }
            catch (err) {
                console.log(err);
                throw (err);
            }
        });
    }
    static traerDataPaciente() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataPaciente = yield (0, consultasGenerales_1.consultasGenerales)(dic_query_1.diccionarioPaciente.consulta);
                return dataPaciente;
            }
            catch (err) {
                console.log(err);
                throw new Error();
            }
        });
    }
    static actualiarLlavesForaneas(fkAFamilia, fkDDrogas, fkHAlimenticios, idPaciente) {
        try {
            const query = `UPDATE PACIENTES SET fk_antecedentes_familiares = ?,
                          fk_detalles_drogas = ?, fk_habitos_alimenticios=? WHERE id_paciente = ?`;
            (0, consultasGenerales_1.consultasGenerales)(query, [
                fkAFamilia,
                fkDDrogas,
                fkHAlimenticios,
                idPaciente,
            ]);
        }
        catch (err) {
            console.log(err);
            throw new Error("Error de consulta");
        }
    }
}
exports.Paciente = Paciente;
