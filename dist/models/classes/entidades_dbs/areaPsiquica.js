"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaPsique = void 0;
class AreaPsique {
    constructor(psique) {
        this.controlEquipoSaludMental = psique.controlEquipoSaludMental;
        this.psicoterapia = psique.psicoterapia;
        this.evaluacionPsiquica = psique.evaluacionPsiquica;
        this.diagnosticoPsiquiatrico = psique.diagnosticoPsiquiatrico;
        this.utilizacionFarmaco = psique.utilizacionFarmaco;
        this.detallesFarmacos = psique.detallesFarmacos;
    }
}
exports.AreaPsique = AreaPsique;
