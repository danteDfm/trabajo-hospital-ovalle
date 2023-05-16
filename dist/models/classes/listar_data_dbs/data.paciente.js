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
exports.ListaPaciente = void 0;
const consultasSelect_1 = require("../../../consultas/consultasSelect");
const dic_query_1 = require("../../../consultas/dic.query");
class ListaPaciente {
    constructor() {
        this.paciente = [];
    }
    dataPaciente() {
        return __awaiter(this, void 0, void 0, function* () {
            this.paciente = yield (0, consultasSelect_1.consultarDatos)(dic_query_1.diccionarioConsultas.paciente);
        });
    }
    getPaciente() {
        return this.paciente;
    }
}
exports.ListaPaciente = ListaPaciente;
