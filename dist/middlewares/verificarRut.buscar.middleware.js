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
exports.buscarRut = void 0;
const consultasGenerales_1 = require("../consultas/consultasGenerales");
function buscarRut(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rutPaciente } = req.params;
        const query = `SELECT id_paciente FROM PACIENTES where rut_paciente = ?`;
        try {
            const data = yield (0, consultasGenerales_1.consultasGenerales)(query, [rutPaciente]);
            console.log(data[0]);
            if (!data[0]) {
                throw "paciente no existe en la base de datos";
            }
            next();
        }
        catch (err) {
            res.status(500).json({
                ok: false,
                err,
            });
        }
    });
}
exports.buscarRut = buscarRut;
