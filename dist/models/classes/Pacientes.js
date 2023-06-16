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
const consultasGenerales_1 = require("../../consultas/consultasGenerales");
class EntidadPaciente {
    constructor(fichas) {
        this.rutPaciente = fichas.rutPaciente;
        this.nombrePaciente = fichas.nombrePaciente;
        this.apellidoPaternoPa = fichas.apellidoPaternoPa || null;
        this.apellidoMaternoPa = fichas.apellidoMaternoPa || null;
        this.pronombre = fichas.pronombre || null;
        this.nombreSocial = fichas.nombreSocial || null;
        this.fechaNacimientoPa = fichas.fechaNacimientoPa || null;
        this.domicilioPaciente = fichas.domicilioPaciente || null;
        this.telefonoPaciente = fichas.telefonoPaciente || null;
    }
    crearPaciente() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let idPaciente;
                const consulta = "SELECT id_paciente FROM PACIENTES WHERE rut_paciente = ?";
                const creacion = "INSERT INTO PACIENTES VALUES (NULL, ?,?,?,?,?,?,?,?,?)";
                const dataPaciente = yield (0, consultasGenerales_1.consultasGenerales)(consulta, [
                    this.rutPaciente,
                ]);
                if (dataPaciente && dataPaciente.length > 0) {
                    idPaciente = dataPaciente[0].id_paciente;
                    return idPaciente;
                }
                const setHeaderPaciente = yield (0, consultasGenerales_1.consultasGenerales)(creacion, [
                    this.rutPaciente,
                    this.nombrePaciente,
                    this.apellidoPaternoPa,
                    this.apellidoMaternoPa,
                    this.fechaNacimientoPa,
                    this.domicilioPaciente,
                    this.telefonoPaciente,
                    this.pronombre,
                    this.nombreSocial,
                ]);
                idPaciente = setHeaderPaciente.insertId;
                return idPaciente;
            }
            catch (err) {
                console.log(err);
                throw "Error al ejecutar la consulta";
            }
        });
    }
    actulizarPaciente(idPaciente) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `UPDATE PACIENTES SET nombre_paciente = ?, apellido_paterno_paciente = ?, apellido_materno_paciente = ?, domicilio_paciente  = ?, telefono_paciente = ?,  pronombre = ?,  nombre_social = ?
        WHERE id_paciente  = ?
        `;
                console.log("hol");
                console.log(this.nombrePaciente);
                yield (0, consultasGenerales_1.consultasGenerales)(query, [
                    this.nombrePaciente,
                    this.apellidoPaternoPa,
                    this.apellidoMaternoPa,
                    this.domicilioPaciente,
                    this.telefonoPaciente,
                    this.pronombre,
                    this.nombreSocial,
                    idPaciente,
                ]);
                return "Los datos han sido actualizados";
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
}
exports.EntidadPaciente = EntidadPaciente;
