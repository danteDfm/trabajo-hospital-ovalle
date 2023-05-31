"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHistoriaGenero = void 0;
class CHistoriaGenero {
    constructor(genero) {
        this.identidadGenero = genero.identidadGenero ? genero.identidadGenero : null;
        this.orientacionSexual = genero.orientacionSexual;
        this.inicioTransicioSexual = genero.inicioTransicioSexual;
        this.tiempoLatencia = genero.tiempoLatencia;
        this.apoyoFamiliar = genero.apoyoFamiliar;
        this.usoPrenda = genero.usoPrenda;
        this.presenciaDisforia = genero.presenciaDisforia;
        this.detallesDiforia = genero.detallesDiforia;
    }
}
exports.CHistoriaGenero = CHistoriaGenero;
