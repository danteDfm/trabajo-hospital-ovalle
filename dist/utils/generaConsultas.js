"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repetir = void 0;
function repetir(veces) {
    const caracter = "?,".repeat(veces).slice(0, -1);
    return caracter;
}
exports.repetir = repetir;
