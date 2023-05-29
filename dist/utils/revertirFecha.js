"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revertirFecha = void 0;
function revertirFecha(fecha) {
    let nuevaFecha;
    let dateArray;
    let fechaFormat;
    fechaFormat = fecha.map(result => {
        dateArray = result.split("/");
        nuevaFecha = dateArray.reverse().join("/");
        return nuevaFecha;
    });
    return fechaFormat;
}
exports.revertirFecha = revertirFecha;
