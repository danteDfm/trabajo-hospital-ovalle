"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ficha = void 0;
class Ficha {
    constructor(ficha) {
        this.fechaIngreso = ficha.fechaIngreso;
        this.borradoLogico = ficha.borradoLogico;
        this.apoyoEscolar = ficha.apoyoEscolar;
        this.judicializacio = ficha.judicializacio;
        this.detallesApoyo = ficha.detallesApoyo;
        this.detallesJudicializacion = ficha.detallesJudicializacion;
    }
    suma(n1) {
        return n1;
    }
}
exports.Ficha = Ficha;
