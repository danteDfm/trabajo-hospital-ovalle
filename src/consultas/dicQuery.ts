export const diccionarioConsultas ={

    paciente:`	
    SELECT 
    id_paciente, 
    rut_paciente,
    nombre_paciente, 
    apellido_paterno_paciente, 
    apellido_materno_paciente, 
    fecha_nacimiento_paciente, 
    domicilio_paciente,
    telefono_paciente,
    pronombre,
    nombre_social
    FROM Pacientes AS pa
    JOIN fichas_tecnicas AS ft ON pa.id_paciente = ft.fk_paciente 
    WHERE rut_paciente = ? AND id_ficha_tecnica = (SELECT max(id_ficha_tecnica) FROM Pacientes AS pa join fichas_tecnicas AS ft ON pa.id_paciente = ft.fk_paciente 
    WHERE rut_paciente = ?)
    ORDER BY fecha_ingreso desc`,

    ficha: `SELECT 
    id_ficha_tecnica, 
    fecha_ingreso,
    fecha_finalizacion, 
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
    FROM Pacientes AS pa
    JOIN fichas_tecnicas AS ft ON pa.id_paciente = ft.fk_paciente 
    WHERE rut_paciente = ? AND id_ficha_tecnica = (SELECT max(id_ficha_tecnica) FROM Pacientes AS pa join fichas_tecnicas AS ft ON pa.id_paciente = ft.fk_paciente 
    WHERE rut_paciente = ?)
    ORDER BY fecha_ingreso desc`

}