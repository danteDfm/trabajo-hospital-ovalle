export const diccionarioSelect = {

  ficha: `SELECT 
  id_ficha_tecnica, 
  fecha_ingreso,
  borrado_logico,
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
  FROM FICHAS_TECNICAS WHERE id_ficha_tecnica = ?`,


  paciente: `SELECT 
  rut_paciente,
  pasaporte,
  nombre_paciente, 
  apellido_paterno_paciente, 
  apellido_materno_paciente, 
  pronombre,
  nombre_social,
  fecha_nacimiento_paciente, 
  domicilio_paciente,
  telefono_paciente,
  uso_droga, 
  antecedente_familires,
  detalles_uso_droga,
  detalles_antecedentes_familia,
  fk_historia_genero,
  fk_habitos_alimenticios
  FROM pacientes 
  WHERE id_paciente = ?`,

  HistoriaGenero:`SELECT 
  id_historia_identidad_genero,
  identidad_genero, 
  orientacion_sexual, 
  inicio_transicion_sexual, 
  tiempo_latencia, 
  apoyo_nucleo_familiar,
  uso_prenda, 
  presencia_disforia,
  detalles_diforia 
  FROM HISTORIAS_IDENTIDADES_GENEROS
  WHERE id_historia_identidad_genero = ?`,

  prenda: `SELECT 
  id_prenda_n_n, 
  fk_historia_genero, 
  fk_prenda_disconformidad
  FROM seleccion_prenda AS sp
  JOIN  historias_identidades_generos AS hg ON sp.fk_historia_genero = hg.id_historia_identidad_genero
  WHERE id_historia_identidad_genero = ?`,

  dieta: "SELECT detalle_habito_alimenticio FROM habitos_alimenticios WHERE id_habito_alimenticio = ?",

  antecedentes: `SELECT 
  detalles_antecedente_perinatales,
  detalles_antecedentes_hospitalizaciones,
  detalles_antecedentes_quirurgicos,
  detalles_antecedentes_alergicos,
  detalles_antecedentes_pni,
  detalles_funcionalidad_genital 
  FROM historias_clinicas
  WHERE id_historia_clinica = ?`,

  involucrados: `
  SELECT 
  id_persona_involucrada_transicion,
  rut_persona_involucrada, 
  pasaporte,
  nombres_persona_involucrada, 
  apellido_paterno_persona_involucrada,   	
  apellido_materno_persona_involucrada, 
  parentesco_persona_involucrada,
  telefono_persona_involucrada,
  domicilio_persona_involucrada 
  FROM personas_involucradas_transicion
  where id_persona_involucrada_transicion = ?`,

  psique: `SELECT 
  control_equipo_salud_mental,
  psicoterapia,
  evaluacion_psiquica,
  diagnostico_psiquiatrico,
  utilizacion_farmaco,
  detalles_farmacos
  FROM areas_psiquicas
  WHERE id_area_psiquica = ?`

}