"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diccionarioAct = void 0;
exports.diccionarioAct = {
    paciente: `
    UPDATE pacientes 
    SET rut_paciente = ?,
    pasaporte  = ?,
    nombre_paciente = ?, 
    apellido_paterno_paciente = ? , 
    apellido_materno_paciente = ? , 
    pronombre = ?,
    nombre_social = ?,
    fecha_nacimiento_paciente= ? , 
    domicilio_paciente = ?,
    telefono_paciente = ?,
    uso_droga = ?, 
    antecedente_familires = ?
    WHERE id_paciente = ?
    `
};
