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
exports.Tabla = void 0;
const consultasGenerales_1 = require("../../consultas/consultasGenerales");
class Tabla {
    listarPacientesPorCentro(nombreCentro) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = ` 
    SELECT estado_ficha, id_paciente, id_ficha_tecnica, fecha_ingreso, rut_paciente, nombre_paciente,
    nombre_social, apellido_paterno_paciente, apellido_materno_paciente, nombre_centro_salud
    FROM fichas_tecnicas AS ft
    JOIN PACIENTES AS pa ON ft.fk_paciente = pa.id_paciente
    JOIN PROFESIONALES_USUARIOS_SALUD AS ucs ON ft.fk_profesional_usuario = id_profesional_salud
    JOIN CENTROS_SALUD AS cs ON fk_centro_salud = cs.id_centro_salud
    WHERE nombre_centro_salud = ?
    ORDER BY CASE WHEN estado_ficha = 'inactivo' THEN 1 ELSE 0 END, fecha_ingreso DESC
    `;
            try {
                if (!nombreCentro)
                    throw ({
                        ok: false,
                        msj: "Falta el nombre del centro"
                    });
                const dataPaciente = yield (0, consultasGenerales_1.consultasGenerales)(query, [nombreCentro]);
                return dataPaciente;
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    pacientesOtrosCentros(nombreCentro) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT estado_ficha, id_paciente, id_ficha_tecnica, fecha_ingreso, rut_paciente, nombre_paciente,
    nombre_social, apellido_paterno_paciente, apellido_materno_paciente, nombre_centro_salud
    FROM fichas_tecnicas AS ft
    JOIN PACIENTES AS pa ON ft.fk_paciente = pa.id_paciente
    JOIN PROFESIONALES_USUARIOS_SALUD AS ucs ON ft.fk_profesional_usuario = id_profesional_salud
    JOIN CENTROS_SALUD AS cs ON fk_centro_salud = cs.id_centro_salud
    WHERE nombre_centro_salud != ?
    ORDER BY fecha_ingreso DESC`;
            try {
                if (!nombreCentro)
                    throw ({
                        ok: false,
                        msj: "Falta el nombre del centro"
                    });
                const dataPaciente = yield (0, consultasGenerales_1.consultasGenerales)(query, [nombreCentro]);
                return dataPaciente;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.Tabla = Tabla;
