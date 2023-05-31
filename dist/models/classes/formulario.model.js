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
class Formulario {
    constructor(paciente, involucrado, acompanante) {
        this.paciente = paciente;
        this.involucrado = involucrado;
        this.acompanante = acompanante;
    }
    crearPrimerPaso() {
        return __awaiter(this, void 0, void 0, function* () {
            const conexion = yield __1.mysqlConnexion;
            const valuePaciente = Object.values(this.paciente);
            const valueInvolucrado = Object.values(this.involucrado);
            const valueAcompanante = Object.values(this.acompanante);
            try {
                const [resultadoPaciente] = yield (conexion === null || conexion === void 0 ? void 0 : conexion.query(`INSERT INTO PACIENTES VALUES (NULL, ?,?,?,?,?,?,?,?,?)`, valuePaciente));
                const [resultadoInvolucrado] = yield (conexion === null || conexion === void 0 ? void 0 : conexion.query(`INSERT INTO PERSONAS_INVOLUCRADAS_TRANSICION VALUES (NULL, ?,?,?,?,?,?,?)`, valueInvolucrado));
                const [resultadoAcompanante] = yield (conexion === null || conexion === void 0 ? void 0 : conexion.query(`INSERT INTO PERSONAS_INVOLUCRADAS_TRANSICION VALUES (NULL, ?,?,?,?,?,?,?)`, valueAcompanante));
                const idp = resultadoPaciente.insertId;
                const ida = resultadoInvolucrado.insertId;
                const idi = resultadoAcompanante.insertId;
                console.log(idp);
                console.log(ida);
                console.log(idi);
            }
            catch (error) {
                throw new Error("Error de consulta primer paso");
            }
        });
    }
}
exports.Formulario = Formulario;
