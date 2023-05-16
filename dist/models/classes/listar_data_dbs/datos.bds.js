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
exports.TraerDataDbs = void 0;
const dic_query_1 = require("../../../consultas/dic.query");
const consultasSelect_1 = require("../../../consultas/consultasSelect");
class TraerDataDbs {
    constructor(idFicha) {
        this.paciente = [];
        this.fichaTecnica = [];
        this.IdFicha = idFicha;
    }
    traerDataPaciente() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = (this.fichaTecnica = yield (0, consultasSelect_1.consultarDatos)(dic_query_1.diccionarioConsultas.fichaTecnica, [this.IdFicha]));
                const idPaciente = yield data[0].id_paciente;
                this.paciente = yield (0, consultasSelect_1.consultarDatos)(dic_query_1.diccionarioConsultas.dataPaciente, [
                    idPaciente,
                ]);
            }
            catch (err) {
                console.log(err);
                throw new Error();
            }
        });
    }
    getDataFicha() {
        return {
            ficha: this.fichaTecnica[0],
            paciente: this.paciente[0],
        };
    }
}
exports.TraerDataDbs = TraerDataDbs;
