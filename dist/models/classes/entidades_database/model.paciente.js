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
const generaConsultas_1 = require("../../../utils/generaConsultas");
class Paciente {
    constructor(paciente) {
        this.paciente = paciente;
    }
    crearPaciente() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, consultasGenerales_1.consultasGenerales)(`INSERT INTO PACIENTES VALUES (null, ${(0, generaConsultas_1.repetir)(10)} , null, null, null)`, [
                    (_a = this.paciente) === null || _a === void 0 ? void 0 : _a.rutPaciente,
                    (_b = this.paciente) === null || _b === void 0 ? void 0 : _b.nombrePaciente,
                    (_c = this.paciente) === null || _c === void 0 ? void 0 : _c.apellidoPaternoPaciente,
                    (_d = this.paciente) === null || _d === void 0 ? void 0 : _d.apellidoMaternoPaciente,
                    (_e = this.paciente) === null || _e === void 0 ? void 0 : _e.pronombre,
                    (_f = this.paciente) === null || _f === void 0 ? void 0 : _f.nombreSocial,
                    (_g = this.paciente) === null || _g === void 0 ? void 0 : _g.fechaNacimientoPaciente,
                    (_h = this.paciente) === null || _h === void 0 ? void 0 : _h.domicilioPaciente,
                    (_j = this.paciente) === null || _j === void 0 ? void 0 : _j.usoDroga,
                    (_k = this.paciente) === null || _k === void 0 ? void 0 : _k.antecedenteFamiliares,
                ]);
                return result;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    static traerDataPaciente() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataPaciente = yield (0, consultasGenerales_1.consultasGenerales)(`SELECT  id_ficha_tecnica,
     rut_paciente, nombre_paciente, 
     apellido_paterno_paciente,
     apellido_materno_paciente  FROM 
     FICHAS_TECNICAS AS ft JOIN PACIENTES AS pa ON  ft.fk_paciente = pa.id_paciente`);
                console.log(dataPaciente);
                return dataPaciente;
            }
            catch (err) {
                console.log(err);
                throw new Error();
            }
        });
    }
    actualiarLlavesForaneas(fkAFamilia, fkDDrogas, fkHAlimenticios, idFicha) {
        try {
            (0, consultasGenerales_1.consultasGenerales)(`UPDATE PACIENTES SET fk_antecedentes_familiares = ?, fk_detalles_drogas = ?, fk_habitos_alimenticios=? 
         WHERE id_paciente = ?`, [fkAFamilia, fkDDrogas, fkHAlimenticios, idFicha]);
        }
        catch (err) {
            console.log(err);
            throw new Error("Error de consulta");
        }
    }
    crearDetallesPaciente(detallesPaciente, idPaciente) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consultas = {
                    drogas: "INSERT INTO DETALLES_DROGAS VALUES (NULL, ?)",
                    alimenticio: "INSERT INTO HABITOS_ALIMENTICIOS VALUES (NULL, ?)",
                    antecedentesFamilia: "INSERT INTO ANTECEDENTES_FAMILIARES VALUES (NULL, ?)",
                };
                const { insertId: idDrogas } = yield (0, consultasGenerales_1.returnNull)(consultas.drogas, detallesPaciente.detallesDrogas);
                const { insertId: idAlimenticio } = yield (0, consultasGenerales_1.returnNull)(consultas.alimenticio, detallesPaciente.detallesAlimenticios);
                const { insertId: idAFamilia } = yield (0, consultasGenerales_1.returnNull)(consultas.antecedentesFamilia, detallesPaciente.detallesAntecedentes);
                this.actualiarLlavesForaneas(idAFamilia, idDrogas, idAFamilia, idPaciente);
                return {
                    idDrogas: idDrogas,
                    idAlimenticio,
                    idAFamilia
                };
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
}
exports.Paciente = Paciente;
