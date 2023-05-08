"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generadorConsultas = void 0;
function generadorConsultas(tabla, veces) {
    let queryFormateada = "";
    queryFormateada = `INSERT INTO ${tabla.trim()} VALUES(NULL, ${"?,"
        .repeat(veces)
        .slice(0, -1)})`;
    return queryFormateada;
}
exports.generadorConsultas = generadorConsultas;
