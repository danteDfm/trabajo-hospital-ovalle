"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diccCrearFicha = void 0;
exports.diccCrearFicha = {
    insertPaso1: `insert into fichas_tecnicas
  (fecha_ingreso, estado_ficha, nivelFormulario, fk_paciente, fk_persona_involucrada_encargada, fk_persona_involucrada_acompanante ) VALUES (?,?,?,?,?,?)`,
};
