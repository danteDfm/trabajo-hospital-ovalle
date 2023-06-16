"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extraccId = void 0;
//extrae los id antes de actulizar las fichas, para mantener limpia las entidades 
function extraccId(req, res, next) {
    const { fichas, paciente, habitos, antecedentes, involucrado, acompanante, areaPsiquica, historialDrogas, genero, prendas, } = req.body;
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
