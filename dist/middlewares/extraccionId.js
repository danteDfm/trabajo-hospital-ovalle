"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extraccionId = void 0;
function extraccionId(req, res, next) {
    let idPaciente;
    let idInvolucrado;
    let idAcompanante;
    let idHistoria;
    let idPrenda;
    let idAreaPsiquica;
    let idDieta;
    let idAntecedentes;
    let idTablas;
    const { paciente, involucrado, acompanante, historiaGenero, detallesPrendas, areaPsiquica, detallesDieta, antecedentes, } = req.body;
    idPaciente = paciente.idPaciente;
    idInvolucrado = involucrado.idPeronsaInvo;
    idAcompanante = acompanante.idPersonaAcom;
    idHistoria = historiaGenero.idHistoria;
    idPrenda = detallesPrendas.idPrenda;
    idAreaPsiquica = areaPsiquica.idAreaPsiquica;
    idDieta = detallesDieta.idDieta;
    idAntecedentes = antecedentes.idAntecedentes;
    delete paciente.idPaciente;
    delete involucrado.idPeronsaInvo;
    delete acompanante.idPersonaAcom;
    delete historiaGenero.idHistoria;
    delete detallesPrendas.idPrenda;
    delete areaPsiquica.idAreaPsiquica;
    delete detallesDieta.idDieta;
    delete antecedentes.idAntecedentes;
    idTablas = {
        idPaciente,
        idInvolucrado,
        idAcompanante,
        idHistoria,
        idPrenda,
        idAreaPsiquica,
        idDieta,
        idAntecedentes,
    };
    req.idTablas = idTablas;
    next();
}
exports.extraccionId = extraccionId;
