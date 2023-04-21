"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consultaPreparada = void 0;
const repetir_cadena_1 = require("../utils/repetir.cadena");
function consultaPreparada(tabla, veces, cadena) {
    let resultadoCadena = "";
    let queryFormateada = "";
    try {
        if (!tabla || !veces || !cadena)
            throw new Error("VACIO");
        if (cadena !== "?,")
            throw new Error("FORMATO DE CADENA INCORRECTO");
        if (veces > 30 || veces < 0)
            throw new Error("no existen campos con esos numeros");
        resultadoCadena = (0, repetir_cadena_1.repetirCadena)(veces, cadena);
        queryFormateada = `INSERT INTO ${tabla.trim()} VALUES(${resultadoCadena.slice(0, -1)})`;
        return queryFormateada;
    }
    catch (err) {
        console.log(err);
    }
    return "";
}
exports.consultaPreparada = consultaPreparada;
