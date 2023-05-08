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
exports.EditarUsuario = void 0;
const consultasSelect_1 = require("../../../consultas/consultasSelect");
class EditarUsuario {
    constructor() {
    }
    dataPaciente() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT rut_paciente, nombre_paciente, apellido_paterno_paciente, appellido_materno_paciente  FROM PACIENTES";
            const dataPaciente = yield (0, consultasSelect_1.select)(query);
            return dataPaciente;
        });
    }
}
exports.EditarUsuario = EditarUsuario;
