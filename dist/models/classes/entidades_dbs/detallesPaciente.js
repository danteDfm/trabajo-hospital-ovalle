"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class detallesPaciente {
    constructor(historiaDroga, antecedentes, dieta) {
        this.usoDroga = historiaDroga.usoDroga;
        this.detalleDroga = historiaDroga.detalleDroga;
        this.antecedente = antecedentes.antecedente;
        this.detalleAntecedente = antecedentes.detalleAntecedente;
        this.tipoDieta = dieta.tipoDieta;
    }
}
