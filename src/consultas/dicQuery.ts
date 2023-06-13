export const diccCuartoPaso = {

  crearPrimerPaso:`INSERT INTO fichas_tecnicas 
  (fecha_ingreso,
    estado_ficha,
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
)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`,

}




export const diccTercerPaso ={

  case1: `INSERT INTO fichas_tecnicas (fecha_ingreso, 
    borrado_logico,
    estado_ficha,
    nivelFormulario,
    apoyo_escolar,
    detalles_apoyo_es, 
    fk_paciente,
    fk_profesional_usuario,
    fk_area_psiquica,
    fk_persona_involucrada_encargada,
    fk_persona_involucrada_acompanante) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
    case2:     `
    UPDATE fichas_tecnicas SET
    fecha_ingreso = ?,
    nivelFormulario = ?,
    apoyo_escolar = ?,
    detalles_apoyo_es = ?,
    fk_area_psiquica = ?
    WHERE id_ficha_tecnica = ?`,
    case3:     `
    UPDATE fichas_tecnicas SET fecha_ingreso = ?,
    nivelFormulario = ?, apoyo_escolar = ?, detalles_apoyo_es = ?, fk_area_psiquica=? WHERE id_ficha_tecnica = ? `


}

export const diccSegundoPaso = {


  case1:  `INSERT INTO FICHAS_TECNICAS (fecha_ingreso, estado_ficha, borrado_logico,nivelFormulario ,fk_paciente, fk_profesional_usuario, fk_persona_involucrada_encargada, fk_persona_involucrada_acompanante) VALUES (?,?,?,?,?,?,?,?)`,
  case2:  `UPDATE  fichas_tecnicas SET fecha_ingreso = ?, nivelFormulario = ?
  where id_ficha_tecnica =  ?`

}

export const primerPaso = `INSERT INTO FICHAS_TECNICAS (fecha_ingreso, estado_ficha, borrado_logico,nivelFormulario ,fk_paciente, fk_profesional_usuario, fk_persona_involucrada_encargada, fk_persona_involucrada_acompanante) VALUES (?,?,?,?,?,?, ?,?)`;