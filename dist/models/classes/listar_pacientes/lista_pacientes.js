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
exports.DatosPaciente = void 0;
const consultasSelect_1 = require("../../../consultas/consultasSelect");
class DatosPaciente {
    traerDataPaciente() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = `
        SELECT  id_ficha_tecnica,
        rut_paciente, nombre_paciente, 
        apellido_paterno_paciente,
        apellido_materno_paciente  FROM 
        FICHAS_TECNICAS AS ft JOIN PACIENTES AS pa ON  ft.fk_paciente = pa.id_paciente
        `;
                const dataPaciente = yield (0, consultasSelect_1.consultarDatos)(query);
                console.log(dataPaciente);
                return dataPaciente;
            }
            catch (err) {
                console.log(err);
                throw new Error();
            }
        });
    }
}
exports.DatosPaciente = DatosPaciente;
