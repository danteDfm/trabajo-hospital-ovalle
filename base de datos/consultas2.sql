insert into CENTROS_SALUD values (NULL, "Antonio Tirado Lanas", "Coquimbo", "/pruebas");
insert into PRENDAS_DISCONFORMIDAD values (null, "packing"), (null, "binder"), (null, "tucking");


select * from fichas_tecnicas

select id_paciente, id_ficha_tecnica ,fecha_ingreso,rut_paciente, nombre_paciente, apellido_paterno_paciente, apellido_materno_paciente, nombre_centro_salud from  fichas_tecnicas as ft
join PACIENTES as pa on ft.fk_paciente = pa.id_paciente
join PROFESIONALES_USUARIOS_SALUD as ucs on ft.fk_profesional_usuario = id_profesional_salud 
join  CENTROS_SALUD as cs on fk_centro_salud = cs.id_centro_salud
where estado_ficha  =  true 
order by fecha_ingreso desc 

insert into  fichas_tecnicas (fecha_ingreso , estado_ficha, nivelFormulario, fk_paciente, fk_profesional_usuario) values ("1997/09/22", 1, 1, 1, 1)

select fecha_ingreso, estado_ficha, id_ficha_tecnica, nombre_paciente, nivelFormulario, id_paciente  from fichas_tecnicas as ft
left join PACIENTES as pa on ft.fk_paciente = pa.id_paciente
where rut_paciente  = '11111136'  and estado_ficha = 1


select * from fichas_tecnicas 
select * from PROFESIONALES_USUARIOS_SALUD

update fichas_tecnicas set estado_ficha = 1,
    nivelFormulario  = 1
    where id_ficha_tecnica = 7

select * from  fichas_tecnicas as ft
left join pacientes as pa on ft.fk_paciente = pa.id_paciente
left join PERSONAS_INVOLUCRADAS_TRANSICION as pi on  ft.fk_persona_involucrada_encargada  = pi.id_persona_involucrada_transicion 
left join PERSONAS_INVOLUCRADAS_TRANSICION as pia on  ft.fk_persona_involucrada_acompanante = pia.id_persona_involucrada_transicion 
where rut_paciente  = '111111112'  and estado_ficha = 1


select id_paciente, estado_ficha, id_ficha_tecnica from fichas_tecnicas as ft
    left join PACIENTES as pa on ft.fk_paciente = pa.id_paciente
    where rut_paciente  = '111111112'  AND estado_ficha = 1






update fichas_tecnicas set estado_ficha = 0
where id_ficha_tecnica = 3

select id_paciente from fichas_tecnicas as ft
left join PACIENTES AS pa on ft.fk_paciente  = idpaciente
where estado_ficha = 

select * from HISTORIAS_CLINICAS
select * from pacientes

select id_paciente, id_ficha_tecnica , fecha_ingreso,rut_paciente, nombre_paciente ,apellido_paterno_paciente, apellido_materno_paciente, nombre_centro_salud from  fichas_tecnicas as ft
join PACIENTES as pa on ft.fk_paciente = pa.id_paciente
join PROFESIONALES_USUARIOS_SALUD as ucs on ft.fk_profesional_usuario = id_profesional_salud 
join  CENTROS_SALUD as cs on fk_centro_salud = cs.id_centro_salud
where estado_ficha  =  true 
order by fecha_ingreso desc 

SELECT * FROM Pacientes AS pa
    JOIN fichas_tecnicas AS ft ON pa.id_paciente = ft.fk_paciente 
    WHERE rut_paciente = ? AND id_ficha_tecnica = (SELECT max(id_ficha_tecnica) FROM Pacientes AS pa join fichas_tecnicas AS ft ON pa.id_paciente = ft.fk_paciente 
    WHERE rut_paciente = ?)
    ORDER BY fecha_ingreso desc 



select 
id_ficha_tecnica,
estado_ficha,
apoyo_escolar,
judicializacion,
detalles_apoyo_es,
detalles_judicializacion,
fk_paciente, 
fk_profesional_usuario,
fk_area_psiquica,   
fk_historia_clinica, 
fk_persona_involucrada_encargada,
fk_persona_involucrada_acompanante,
rut_paciente,
nombre_paciente, 
apellido_paterno_paciente, 
apellido_materno_paciente, 
fecha_nacimiento_paciente, 
domicilio_paciente,
telefono_paciente,
pronombre,
nombre_social
from Pacientes as pa
join fichas_tecnicas as ft on pa.id_paciente = ft.fk_paciente 
where rut_paciente = '196674292' and id_ficha_tecnica =  (select max(id_ficha_tecnica) from Pacientes as pa
join fichas_tecnicas as ft on pa.id_paciente = ft.fk_paciente 
where rut_paciente = '196674292')
order by fecha_ingreso desc 


select * from HISTORIAS_CLINICAS
where id_historia_clinica = ?

select * from PERSONAS_INVOLUCRADAS_TRANSICION
where id_persona_involucrada_transicion = ?


select 
uso_droga, 
detalles_uso_droga
from HISTORIAL_DROGAS as hd
left join PACIENTES AS pa on hd.fk_paciente = pa.id_paciente
left join fichas_tecnicas as ft on ft.fk_paciente = pa.id_paciente
where estado_ficha  = 1





SELECT * FROM HABITOS_ALIMENTICIOS
where fk_paciente  = 5 and id_habito_alimenticio = (SELECT MAX(id_habito_alimenticio) FROM HABITOS_ALIMENTICIOS
where fk_paciente = 5)


SELECT * FROM HISTORIAS_IDENTIDADES_GENEROS
WHERE fk_paciente = 5 and id_historia_identidad_genero = (SELECT max(id_historia_identidad_genero) FROM HISTORIAS_IDENTIDADES_GENEROS
WHERE fk_paciente = 5)


}


	SELECT * FROM Pacientes AS pa
    JOIN fichas_tecnicas AS ft ON pa.id_paciente = ft.fk_paciente 
    WHERE rut_paciente = "11111136" AND id_ficha_tecnica = (SELECT max(id_ficha_tecnica) FROM Pacientes AS pa join fichas_tecnicas AS ft ON pa.id_paciente = ft.fk_paciente 
    WHERE rut_paciente = "11111136")
    ORDER BY fecha_ingreso desc 



 SELECT email_profesional_salud, contrasena, id_profesional_salud, roles, nombre_centro_salud  FROM profesionales_usuarios_salud
 join  CENTROS_SALUD as cs on id_centro_salud  = fk_centro_salud 
WHERE email_profesional_salud


	
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
    WHERE rut_paciente = 11111136 AND id_ficha_tecnica = (SELECT max(id_ficha_tecnica) FROM Pacientes AS pa join fichas_tecnicas AS ft ON pa.id_paciente = ft.fk_paciente 
    WHERE rut_paciente = 11111136)
    ORDER BY fecha_ingreso desc 
    
    
    
    	
	SELECT 
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
    WHERE rut_paciente = 11111136 AND id_ficha_tecnica = (SELECT max(id_ficha_tecnica) FROM Pacientes AS pa join fichas_tecnicas AS ft ON pa.id_paciente = ft.fk_paciente 
    WHERE rut_paciente = 11111136)
    ORDER BY fecha_ingreso desc 

		select 
        rut_paciente,
        nombre_social,
        nombre_paciente, 
        apellido_paterno_paciente, 
        id_ficha_tecnica, 
        fecha_ingreso,
        estado_ficha, 
        nivelFormulario,
        nombre_usuario
        from fichas_tecnicas as ft
        join PACIENTES AS pa ON ft.fk_paciente = pa.id_paciente
        left join PROFESIONALES_USUARIOS_SALUD as ps ON ft.fk_profesional_usuario = id_profesional_salud 
        WHERE id_paciente = 1 AND estado_ficha = 1 
        
SELECT *   from fichas_tecnicas as ft
join PACIENTES AS pa ON ft.fk_paciente = pa.id_paciente
        
    
select id_paciente, id_ficha_tecnica ,fecha_ingreso, rut_paciente, nombre_paciente,
         nombre_social,apellido_paterno_paciente, apellido_materno_paciente, nombre_centro_salud from  fichas_tecnicas as ft
            join PACIENTES as pa on ft.fk_paciente = pa.id_paciente
            join PROFESIONALES_USUARIOS_SALUD as ucs on ft.fk_profesional_usuario = id_profesional_salud 
            join  CENTROS_SALUD as cs on fk_centro_salud = cs.id_centro_salud
            where estado_ficha  =  1
            order by fecha_ingreso desc 
            
            select * from pacientes
            
            
            select id_paciente, id_ficha_tecnica ,fecha_ingreso, rut_paciente, nombre_paciente,
         nombre_social,apellido_paterno_paciente, apellido_materno_paciente, nombre_centro_salud from  fichas_tecnicas as ft
            join PACIENTES as pa on ft.fk_paciente = pa.id_paciente
            join PROFESIONALES_USUARIOS_SALUD as ucs on ft.fk_profesional_usuario = id_profesional_salud 
            join  CENTROS_SALUD as cs on fk_centro_salud = cs.id_centro_salud
            where estado_ficha  =  true 
            order by fecha_ingreso desc
            
            
            
            
select uso_droga, detalles_uso_droga from HISTORIAL_DROGAS as hd
join pacientes as pa on hd.fk_paciente = pa.id_paciente
where id_historial_droga = 1

SELECT detalle_habito_alimenticio FROM HABITOS_ALIMENTICIOS as ha
join pacientes as pa on ha.fk_paciente = pa.id_paciente
where id_habito_alimenticio = 1

SELECT 
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
WHERE id_historia_identidad_genero = 1


select 
fk_prenda_disconformidad
from SELECCION_PRENDA as sp
join HISTORIAS_IDENTIDADES_GENEROS as hg on sp.fk_historia_genero  = hg.id_historia_identidad_genero
WHERE id_historia_identidad_genero = 1


 select 
        rut_paciente,
        nombre_social,
        nombre_paciente, 
        apellido_paterno_paciente, 
        id_ficha_tecnica, 
        fecha_ingreso,
        fecha_finalizacion, 
        estado_ficha, 
        nivelFormulario,
        nombre_usuario 
        from fichas_tecnicas as ft
        join PACIENTES AS pa ON ft.fk_paciente = pa.id_paciente
        join PROFESIONALES_USUARIOS_SALUD as u ON ft.fk_profesional_usuario = u.id_profesional_salud
        WHERE rut_paciente  = "111111111" AND estado_ficha = 1 
			
            select * from fichas_tecnicas
            select * from pacientes
        
        delete FROM fichas_tecnicas WHERE fk_paciente = 17
        
        

        
	select 
    rut_paciente,
    nombre_social,
    nombre_paciente, 
    apellido_paterno_paciente, 
    id_ficha_tecnica, 
    fecha_ingreso,
    fecha_finalizacion, 
    estado_ficha, 
    nivelFormulario,
    nombre_usuario ,
    identidad_genero 
    from fichas_tecnicas as ft
    left join PACIENTES AS pa ON ft.fk_paciente = pa.id_paciente
    left join PROFESIONALES_USUARIOS_SALUD as u ON ft.fk_profesional_usuario = u.id_profesional_salud
    left join HISTORIAS_IDENTIDADES_GENEROS as hig ON  hig.fk_paciente = pa.id_paciente
    WHERE rut_paciente  = "111111113" AND estado_ficha = 1
		
  
delete from fichas_tecnicas where id_ficha_tecnica = 15




SELECT  id_paciente, rut_paciente, nombre_paciente,  fecha_nacimiento_paciente, nombre_social, identidad_genero, fecha_ingreso from fichas_tecnicas as ft
    left join PACIENTES AS pa ON ft.fk_paciente = pa.id_paciente
   left join PROFESIONALES_USUARIOS_SALUD as u ON ft.fk_profesional_usuario = u.id_profesional_salud
   left join HISTORIAS_IDENTIDADES_GENEROS as hig ON  hig.fk_paciente = pa.id_paciente
   WHERE rut_paciente  = "32143423-4"
   order by fecha_ingreso desc
   
   SELECT count(identidad_genero) AS "generos" FROM historias_identidades_generos
        WHERE identidad_genero = "heterosexual"