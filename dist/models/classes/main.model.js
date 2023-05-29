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
exports.PaginaPrincipal = void 0;
const consultasGenerales_1 = require("../../consultas/consultasGenerales");
class PaginaPrincipal {
    TotalPacientes() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalPacientes = yield (0, consultasGenerales_1.consultasGenerales)(`SELECT COUNT(id_paciente) AS "paciente" FROM pacientes`);
            return totalPacientes[0];
        });
    }
    cantidadGeneros(genero) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield (0, consultasGenerales_1.consultasGenerales)(`SELECT count(identidad_genero) AS "generos" FROM historias_identidades_generos
        WHERE identidad_genero = ?`, [genero]);
            return result.generos;
        });
    }
    ingresosDelDia() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT count(id_ficha_tecnica) as ingresosDia FROM fichas_tecnicas WHERE DATE(fecha_ingreso) = CURDATE();`;
            const result = yield (0, consultasGenerales_1.consultasGenerales)(query);
            return result[0];
        });
    }
}
exports.PaginaPrincipal = PaginaPrincipal;
