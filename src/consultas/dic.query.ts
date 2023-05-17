export const dicQuerys = {
  paciente: `SELECT 
  id_paciente, 
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
  antecedente_familires
  FROM pacientes 
  WHERE rut_paciente LIKE "%?"`,

  detallesPaciente: `SELECT 
id_droga,
detalles_drogas,
id_habito_alimenticio ,
detalle_habito_alimenticio,
id_antecedentes_familia,
id_antecedentes_familia,
id_historia_identidad_genero,
identidad_genero, 
orientacion_sexual , 
inicio_transicion_sexual , 
tiempo_latencia , 
apoyo_nucleo_familiar ,
uso_prenda , 
presencia_disforia,
detalles_elemento
 FROM PACIENTES AS p
		left JOIN antecedentes_familiares AS af ON p.fk_antecedentes_familiares = af.id_antecedentes_familia
		left JOIN DETALLES_DROGAS AS dd ON p.fk_detalles_drogas = dd.id_droga
		left JOIN habitos_alimenticios AS ha ON p.fk_habitos_alimenticios = ha.id_habito_alimenticio
		left JOIN (SELECT * FROM HISTORIAS_IDENTIDADES_GENEROS AS hig
					  LEFT JOIN detalles_disforia AS dedi ON hig.fk_detalles_disforia = dedi.id_elemento_disforia 
					 ) AS hig ON p.fk_historia_genero = hig.id_historia_identidad_genero
WHERE id_paciente = ?
`,
  historiasClinicas: `
SELECT 
id_historia_clinica,
detalles_antecedente_perinatales,
detalles_antecedentes_hospitalizaciones,
detalles_antecedentes_quirurgicos,
detalles_antecedentes_alergicos,
detalles_antecedentes_pni FROM pacientes AS pa
LEFT JOIN fichas_tecnicas AS ft ON pa.id_paciente = ft.fk_paciente
LEFT JOIN  historias_clinicas AS hc ON ft.fk_historia_clinica = hc.id_historia_clinica
WHERE id_paciente = ?`,

  apoyoFamilia: `SELECT 
id_detalle_apoyo,
detalles_apoyo 
FROM pacientes AS pa
LEFT JOIN fichas_tecnicas AS ft ON pa.id_paciente = ft.fk_paciente
LEFT JOIN  DETALLES_APOYO AS da ON ft.fk_detalles_apoyo = da.id_detalle_apoyo
WHERE id_paciente = ?
`,

  funcionalidadGenital: `SELECT 
id_funcionalidad_genital,
detalle_funcionalidad_genital
FROM pacientes AS pa
LEFT JOIN fichas_tecnicas AS ft ON pa.id_paciente = ft.fk_paciente
LEFT JOIN  ANTECEDENTES_FUNCIONALIDADES_GENITAL AS afg ON ft.fk_funcionalidad_genital = afg.id_funcionalidad_genital
WHERE id_paciente = ?`,

  detallesJuicio: `SELECT 
id_detalle_juicio, 
detalles_juicio
FROM pacientes AS pa
LEFT JOIN fichas_tecnicas AS ft ON pa.id_paciente = ft.fk_paciente
LEFT JOIN  DETALLES_JUICIO AS dj ON ft.fk_detalles_juicio= dj.id_detalle_juicio
WHERE id_paciente = ?
`,
  encargado: `SELECT 
id_persona_involucrada_transicion, 
rut_persona_involucrada, 
pit.pasaporte,
nombres_persona_involucrada, 
apellido_paterno_persona_involucrada,   	
apellido_materno_persona_involucrada, 
parentesco_persona_involucrada,
telefono_persona_involucrada,
domicilio_persona_involucrada 
FROM pacientes AS pa
LEFT JOIN fichas_tecnicas AS ft ON pa.id_paciente = ft.fk_paciente
LEFT JOIN  PERSONAS_INVOLUCRADAS_TRANSICION AS pit ON ft.fk_persona_involucrada_encargada = pit.id_persona_involucrada_transicion
WHERE id_paciente = ?`,

  acompanante: `SELECT
  id_persona_involucrada_transicion,
rut_persona_involucrada,
nombres_persona_involucrada,
parentesco_persona_involucrada,
telefono_persona_involucrada  FROM pacientes AS pa
LEFT JOIN fichas_tecnicas AS ft ON pa.id_paciente = ft.fk_paciente
LEFT JOIN  PERSONAS_INVOLUCRADAS_TRANSICION AS pit ON ft.fk_persona_involucrada_acompanante= pit.id_persona_involucrada_transicion
WHERE id_paciente = ?`,

  areaPsicologica: `SELECT 
  id_area_psiquica ,
control_equipo_salud_mental,
psicoterapia,
evaluacion_psiquica,
diagnostico_psiquiatrico,
utilizacion_farmaco,
id_tipo_farmaco, 
detalles_farmaco
FROM pacientes AS pa
LEFT JOIN fichas_tecnicas AS ft ON pa.id_paciente = ft.fk_paciente
LEFT JOIN (SELECT * FROM areas_psiquicas AS aps
				LEFT JOIN tipos_farmacos AS tf ON aps.fk_detalles_farmaco = tf.id_tipo_farmaco
) AS aps ON ft.fk_area_psiquica = aps.id_area_psiquica 
WHERE id_paciente = ?

`,

  ficha: `SELECT
  id_ficha_tecnica, 
fecha_ingreso,
borrado_logico,
apoyo_escolar,
judicializacion FROM pacientes AS pa
LEFT JOIN fichas_tecnicas AS ft ON pa.id_paciente = ft.fk_paciente
WHERE id_paciente = ?
`,
};
