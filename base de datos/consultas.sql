

select id_historial_droga, uso_droga, detalles_uso_droga from HISTORIAL_DROGAS
    join pacientes as pa on fk_paciente = id_paciente
    where fk_paciente  = 14 and id_historial_droga = (select max(id_historial_droga) from HISTORIAL_DROGAS
    join pacientes as pa on fk_paciente = id_paciente
    where fk_paciente  = 14);

    
    SELECT 
    id_historia_identidad_genero,
    identidad_genero, 
    orientacion_sexual, 
    autopercepcion, 
    inicio_transicion_sexual, 
    tiempo_latencia, 
    apoyo_nucleo_familiar,
    uso_prenda, 
    presencia_disforia,
    detalles_diforia
    FROM HISTORIAS_IDENTIDADES_GENEROS as ig
    join pacientes as pa on ig.fk_paciente = pa.id_paciente
    JOIN fichas_tecnicas AS ft ON ft.fk_paciente = pa.id_paciente
    WHERE ig.fk_paciente =  14 and  id_historia_identidad_genero = (  SELECT 
    id_historia_identidad_genero
    FROM HISTORIAS_IDENTIDADES_GENEROS as ig
    join pacientes as pa on ig.fk_paciente = pa.id_paciente
    JOIN fichas_tecnicas AS ft ON ft.fk_paciente = pa.id_paciente
    WHERE ig.fk_paciente =  14);
    
    
    
SELECT
    id_habito_alimenticio,
    estado
    detalle_habito_alimenticio FROM HABITOS_ALIMENTICIOS as ha
    join pacientes as pa on ha.fk_paciente = pa.id_paciente
    where fk_paciente  = 14 and id_habito_alimenticio = (  SELECT
    id_habito_alimenticio FROM HABITOS_ALIMENTICIOS as ha
    join pacientes as pa on ha.fk_paciente = pa.id_paciente
    where fk_paciente  = 14)

select * from HISTORIAS_IDENTIDADES_GENEROS    
    

    
    select estado_ficha, id_paciente, id_ficha_tecnica ,fecha_ingreso, rut_paciente, nombre_paciente,
         nombre_social,apellido_paterno_paciente, apellido_materno_paciente, nombre_centro_salud from  fichas_tecnicas as ft
            join PACIENTES as pa on ft.fk_paciente = pa.id_paciente
            join PROFESIONALES_USUARIOS_SALUD as ucs on ft.fk_profesional_usuario = id_profesional_salud 
            join  CENTROS_SALUD as cs on fk_centro_salud = cs.id_centro_salud
            order by fecha_ingreso desc, estado_ficha desc
            
            
            SELECT estado_ficha, id_paciente, id_ficha_tecnica, fecha_ingreso, rut_paciente, nombre_paciente,
       nombre_social, apellido_paterno_paciente, apellido_materno_paciente, nombre_centro_salud
FROM fichas_tecnicas AS ft
JOIN PACIENTES AS pa ON ft.fk_paciente = pa.id_paciente
JOIN PROFESIONALES_USUARIOS_SALUD AS ucs ON ft.fk_profesional_usuario = id_profesional_salud
JOIN CENTROS_SALUD AS cs ON fk_centro_salud = cs.id_centro_salud
ORDER BY CASE WHEN estado_ficha = 'inactivo' THEN 1 ELSE 0 END, fecha_ingreso DESC


select * from fichas_tecnicas


select 
    nombre_paciente, 
    apellido_paterno_paciente, 
    id_ficha_tecnica, 
    fecha_ingreso,
    fecha_finalizacion, 
    estado_ficha, 
    nivelFormulario
    from fichas_tecnicas as ft
    join PACIENTES AS pa ON ft.fk_paciente = pa.id_paciente
    WHERE rut_paciente = "32143423-4" AND  estado_ficha = 0
    order by fecha_ingreso desc
    
    
    select 
    nombre_paciente, 
    apellido_paterno_paciente, 
    id_ficha_tecnica, 
    fecha_ingreso,
    fecha_finalizacion, 
    estado_ficha, 
    nivelFormulario,
    nombre_centro_salud 
    from fichas_tecnicas as ft
    join PACIENTES AS pa ON ft.fk_paciente = pa.id_paciente
    join PROFESIONALES_USUARIOS_SALUD as ps ON ft.fk_profesional_usuario = ps.id_profesional_salud 
    join CENTROS_SALUD as cs ON ps.fk_centro_salud  = cs.id_centro_salud
    WHERE rut_paciente = "32143423-4" AND  estado_ficha = 0
    order by fecha_ingreso desc
    
    
    select * from ficha_tecncia 