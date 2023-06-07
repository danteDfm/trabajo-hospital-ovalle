"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diccionarioPasos = void 0;
exports.diccionarioPasos = {
    crearPrimerPaso: `INSERT INTO fichas_tecnicas 
  (fecha_ingreso,
    estado_ficha, 
    borrado_logico,
    nivelFormulario, 
    apoyo_escolar,
    judicializacion,
    detalles_apoyo_es,
    detalles_judicializacion,
    fk_paciente, 
    fk_profesional_usuario,
    fk_area_psiquica,   
    fk_historia_clinica, 
    fk_persona_involucrada_encargada,
    fk_persona_involucrada_acompanante
)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    update3: `UPDATE fichas_tecnicas 
SET fecha_ingreso=?,
  estado_ficha=?, 
  borrado_logico=?,
  nivelFormulario=?, 
  apoyo_escolar=?,
  judicializacion=?,
  detalles_apoyo_es=?,
  detalles_judicializacion=?,
  fk_paciente=?, 
  fk_profesional_usuario=?,
  fk_area_psiquica=?,   
  fk_historia_clinica = ?
  WHERE id_ficha_tecnica = ?
  `,
    update2: `UPDATE fichas_tecnicas 
  SET fecha_ingreso=?,
    estado_ficha=?, 
    borrado_logico=?,
    nivelFormulario=?, 
    apoyo_escolar=?,
    judicializacion=?,
    detalles_apoyo_es=?,
    detalles_judicializacion=?,
    fk_paciente=?, 
    fk_profesional_usuario=?,
    fk_area_psiquica=?,   
    fk_historia_clinica = ?
    WHERE id_ficha_tecnica = ?
    `,
    update1: `UPDATE fichas_tecnicas 
    SET fecha_ingreso=?,
      estado_ficha=?, 
      borrado_logico=?,
      nivelFormulario=?, 
      apoyo_escolar=?,
      judicializacion=?,
      detalles_apoyo_es=?,
      detalles_judicializacion=?,
      fk_paciente=?, 
      fk_profesional_usuario=?,
      fk_historia_clinica = ?
      WHERE id_ficha_tecnica = ?
      `
};
