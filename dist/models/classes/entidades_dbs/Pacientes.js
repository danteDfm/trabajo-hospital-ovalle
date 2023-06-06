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
exports.EntidadPaciente = void 0;
const consultasGenerales_1 = require("../../../consultas/consultasGenerales");
class EntidadPaciente {
    constructor(fichas) {
        this.paciente = fichas.paciente;
    }
    crearPaciente() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let idPaciente;
                let pacienteFormateada;
                const consulta = "SELECT id_paciente FROM PACIENTES WHERE rut_paciente = ?";
                const creacion = "INSERT INTO PACIENTES VALUES (NULL, ?,?,?,?,?,?,?,?,?)";
                const dataPaciente = yield (0, consultasGenerales_1.consultasGenerales)(consulta, [this.paciente.rutPaciente]);
                if (dataPaciente && dataPaciente.length > 0) {
                    idPaciente = dataPaciente[0].id_paciente;
                    return idPaciente;
                }
                pacienteFormateada = Object.values(this.paciente);
                const setHeaderPaciente = yield (0, consultasGenerales_1.consultasGenerales)(creacion, pacienteFormateada);
                idPaciente = setHeaderPaciente.insertId;
                return idPaciente;
            }
            catch (err) {
                console.log(err);
                throw ("Error al ejecutar la consulta");
            }
        });
    }
    comprobarVariables() {
        try {
            if (!this.paciente.rutPaciente ||
                !this.paciente.nombrePaciente ||
                !this.paciente.fechaNacimientoPa) {
                throw 100;
            }
        }
        catch (err) {
            throw {
                code: err,
                status: "failure",
                msj: "Error, estas variables no pueden venir vacias, rutPaciente, nombrePaciente, fechaNacimiento",
            };
        }
    }
    crearFicha(query, datos) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, consultasGenerales_1.consultasGenerales)(query, datos);
                const idFicha = data.insertId;
                return "La operacion fue llevada con exito";
            }
            catch (err) {
                throw ("Error en crear la ficha tecnica");
            }
        });
    }
}
exports.EntidadPaciente = EntidadPaciente;
