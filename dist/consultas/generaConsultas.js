"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generadorConsultas = void 0;
const repetir_cadena_1 = require("../utils/repetir.cadena");
function generadorConsultas(tabla, veces, cadena) {
    let resultadoCadena = "";
    let queryFormateada = "";
    try {
        if (!tabla || !veces || !cadena)
            throw new Error("LOS ARGUMENTOS NO PUEDEN ESTAR VACIOS");
        if (veces < 0 || veces > 40)
            throw new Error("NO EXISTEN TABLAS CON DEMASIADOS CAMPOS");
        resultadoCadena = (0, repetir_cadena_1.repetirCadena)(veces, cadena);
        queryFormateada = `INSERT INTO ${tabla.trim()} VALUES(NULL, ${resultadoCadena.slice(0, -1)})`;
        return queryFormateada;
    }
    catch (err) {
        console.log(err);
    }
    return "";
}
exports.generadorConsultas = generadorConsultas;
