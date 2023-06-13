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
exports.Fichas = void 0;
const consultasGenerales_1 = require("../../consultas/consultasGenerales");
class Fichas {
    listarFichaActiva(idFicha) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
        select 
        nombre_paciente, 
        apellido_paterno_paciente, 
        id_ficha_tecnica, 
        fecha_ingreso,
        fecha_finalizacion, 
        estado_ficha, 
        nivelFormulario
        from fichas_tecnicas as ft
        join PACIENTES AS pa ON ft.fk_paciente = pa.id_paciente
        WHERE  estado_ficha = 1 and id_ficha_tecnica = ?
        `;
            try {
                const fichaActiva = yield (0, consultasGenerales_1.consultasGenerales)(query, [idFicha]);
                return fichaActiva;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    listarFichasInactivas(idPaciente) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `select 
    nombre_paciente, 
    apellido_paterno_paciente, 
    id_ficha_tecnica, 
    fecha_ingreso,
    fecha_finalizacion, 
    estado_ficha, 
    nivelFormulario
    from fichas_tecnicas as ft
    join PACIENTES AS pa ON ft.fk_paciente = pa.id_paciente
    WHERE fk_paciente = 1 
    order by fecha_ingreso desc `;
            try {
                const fichasInactivas = (0, consultasGenerales_1.consultasGenerales)(query, [idPaciente]);
                return fichasInactivas;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.Fichas = Fichas;
