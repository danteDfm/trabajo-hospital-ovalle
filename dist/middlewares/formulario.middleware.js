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
exports.buscarRut = exports.extraccId = void 0;
const consultasGenerales_1 = require("../consultas/consultasGenerales");
//extrae los id antes de actulizar las fichas, para mantener limpia las entidades 
function extraccId(req, res, next) {
    const { fichas, paciente, habitos, antecedentes, involucrado, acompanante, areaPsiquica, historialDrogas, genero, prendas, } = req.body;
    console.log(paciente);
    req.idTablas = {
        idFicha: fichas.idFicha,
        idPaciente: paciente.idPaciente,
        idAntecedente: antecedentes.idAntecedente,
        idDieta: habitos.idDieta,
        idInvolucrado: involucrado.idInvolucrado,
        idAcompanante: acompanante.idAcompanante,
        idAreaPsiquica: areaPsiquica.idAreaPsiquica,
        idDrogas: historialDrogas.idDrogas,
        idGenero: genero.idGenero,
        idPrenda: prendas.idPrenda
    };
    delete fichas.idFicha,
        delete paciente.idPaciente,
        delete antecedentes.idAntecedente,
        delete habitos.idDieta,
        delete involucrado.idInvolucrado,
        delete acompanante.idAcompanante,
        delete areaPsiquica.idAreaPsiquica,
        delete historialDrogas.idDrogas,
        delete genero.idGenero,
        delete prendas.idPrenda;
    next();
}
exports.extraccId = extraccId;
function buscarRut(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rutPaciente } = req.params;
        const query = `SELECT id_paciente FROM PACIENTES where rut_paciente = ?`;
        try {
            const data = yield (0, consultasGenerales_1.consultasGenerales)(query, [rutPaciente]);
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
