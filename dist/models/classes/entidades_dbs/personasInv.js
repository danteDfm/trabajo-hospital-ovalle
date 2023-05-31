"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Involucrado = void 0;
class Involucrado {
    constructor(involucrado) {
        this.rutInvolucrado = involucrado.rutInvolucrado
            ? involucrado.rutInvolucrado
            : null;
        this.nombreInvolucrado = involucrado.nombreInvolucrado
            ? involucrado.nombreInvolucrado
            : null;
        this.apellidoPInvolucrado = involucrado.apellidoPInvolucrado
            ? involucrado.apellidoPInvolucrado
            : null;
        this.apellidoMInvolucrado = involucrado.apellidoMInvolucrado
            ? involucrado.apellidoMInvolucrado
            : null;
        this.parentescoInvolucrado = involucrado.parentescoInvolucrado
            ? involucrado.parentescoInvolucrado
            : null;
        this.telefonoInvolucrado = involucrado.telefonoInvolucrado
            ? involucrado.telefonoInvolucrado
            : null;
        this.domicilioInvolucrado = involucrado.domicilioInvolucrado
            ? involucrado.domicilioInvolucrado
            : null;
    }
}
exports.Involucrado = Involucrado;
