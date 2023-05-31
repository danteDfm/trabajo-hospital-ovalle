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
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.conexion = yield __1.mysqlConnexion;
        });
    }
    crearPrimerPaso() {
        const paciente = Object.values(this.paciente);
        const involucrado = Object.values(this.involucrado);
        const acompanante = Object.values(this.acompanante);
        console.log(involucrado);
        console.log(acompanante);
    }
}
exports.Formulario = Formulario;
