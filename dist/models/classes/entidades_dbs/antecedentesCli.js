"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntecedentesCli = void 0;
class AntecedentesCli {
    constructor(antecedentes) {
        this.antecedentePerinatales = antecedentes.antecedentePerinatales;
        this.antecedenteHospitalizaciones = antecedentes.antecedenteHospitalizaciones;
        this.antecedentesQuirurgicos = antecedentes.antecedentesQuirurgicos;
        this.antecedentesAlergicos = antecedentes.antecedentesAlergicos;
        this.antecedentesPni = antecedentes.antecedentesPni;
        this.funcionalidadGenital = antecedentes.funcionalidadGenital;
    }
}
exports.AntecedentesCli = AntecedentesCli;
