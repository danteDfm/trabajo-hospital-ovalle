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
    listarPacientes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `select id_paciente, id_ficha_tecnica ,fecha_ingreso,rut_paciente, nombre_paciente, apellido_paterno_paciente, apellido_materno_paciente, nombre_centro_salud from  fichas_tecnicas as ft
            join PACIENTES as pa on ft.fk_paciente = pa.id_paciente
            join PROFESIONALES_USUARIOS_SALUD as ucs on ft.fk_profesional_usuario = id_profesional_salud 
            join  CENTROS_SALUD as cs on fk_centro_salud = cs.id_centro_salud
            where estado_ficha  =  true 
            order by fecha_ingreso desc 
        `;
                const dataPaciente = yield (0, consultasGenerales_1.consultasGenerales)(query);
                return dataPaciente;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.Tabla = Tabla;
