"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cambioEstado = void 0;
function cambioEstado(req, res, next) {
    const { fichas, areaPsiquica, historialDrogas, genero } = req.body;
    if (fichas.apoyoEscolar == false)
        fichas.detallesApoyo = null;
    if (fichas.judicializacion == false)
        fichas.detallesJudicializacion = null;
    if (areaPsiquica.utilizacionFarmaco == false)
        areaPsiquica.detallesFarmacos = null;
    if (historialDrogas.usoDrogas == false)
        historialDrogas.detallesDrogas = null;
    if (genero.presenciaDisforia == false)
        genero.detallesDiforia = null;
    next();
}
exports.cambioEstado = cambioEstado;
