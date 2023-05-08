"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentidadGenero = void 0;
class IdentidadGenero {
    constructor() {
        this.historiaIdentidadGenero = {
            historiaGenero: {
                identidadGenero: "",
                orientacionSexual: "",
                inicioTransicion: new Date(),
                tiempoLtencia: new Date(),
                apoyoNucleoFamiliar: ""
            },
            prendasDisconformidadGenero: {
                usoPrenda: false,
                predas: ""
            }
        };
    }
}
exports.IdentidadGenero = IdentidadGenero;
