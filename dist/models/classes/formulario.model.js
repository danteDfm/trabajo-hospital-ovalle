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
exports.Formulario = void 0;
const __1 = require("../..");
const consultasGenerales_1 = require("../../consultas/consultasGenerales");
class Formulario {
    constructor(paciente, involucrado, acompanante) {
        this.paciente = paciente;
        this.involucrado = involucrado;
        this.acompanante = acompanante;
    }
    existenciaUsuario(rutPaciente) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT id_paciente FROM PACIENTES WHERE rut_paciente = ?";
            const resultado = yield (0, consultasGenerales_1.consultasGenerales)(query, [rutPaciente]);
            if (resultado && resultado.length > 0) {
                return resultado[0].id_paciente;
            }
            else {
                return undefined;
            }
        });
    }
    crearPrimerPaso() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const conexion = yield __1.mysqlConnexion;
            let valuePaciente;
            let valueInvolucrado;
            let valueAcompanante;
            if (this.paciente)
                valuePaciente = Object.values(this.paciente);
            if (this.involucrado)
                valueInvolucrado = Object.values(this.involucrado);
            if (this.acompanante)
                valueAcompanante = Object.values(this.acompanante);
            let idPaciente;
            try {
                idPaciente = yield this.existenciaUsuario((_a = this.paciente) === null || _a === void 0 ? void 0 : _a.rutPaciente);
                if (!idPaciente) {
                    var [resultadoPaciente] = yield (conexion === null || conexion === void 0 ? void 0 : conexion.query(`INSERT INTO PACIENTES VALUES (NULL, ?,?,?,?,?,?,?,?,?)`, valuePaciente));
                    idPaciente = resultadoPaciente.insertId;
                }
                const [resultadoInvolucrado] = yield (conexion === null || conexion === void 0 ? void 0 : conexion.query(`INSERT INTO PERSONAS_INVOLUCRADAS_TRANSICION VALUES (NULL, ?,?,?,?,?,?,?)`, valueInvolucrado));
                const [resultadoAcompanante] = yield (conexion === null || conexion === void 0 ? void 0 : conexion.query(`INSERT INTO PERSONAS_INVOLUCRADAS_TRANSICION VALUES (NULL, ?,?,?,?,?,?,?)`, valueAcompanante));
                const ida = resultadoInvolucrado.insertId;
                const idi = resultadoAcompanante.insertId;
                console.log(idPaciente);
                console.log(ida);
                console.log(idi);
                return "primer paso completado";
            }
            catch (error) {
                console.log(error);
                throw new Error("Error al guardar primer paso");
            }
        });
    }
    crearSegundoPaso() {
    }
}
exports.Formulario = Formulario;
