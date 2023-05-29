INSERT INTO prendas_disconformidad VALUES (NULL, "Bracket"), (NULL, "Tukcet"), (NULL, "Packet");

INSERT INTO centros_salud VALUES (NULL, "Antonio tirado Lanas", "Coquimbo", "/logo")

INSERT INTO profesionales_usuarios_salud VALUES (NULL, "196674292", "dante", "danteflores@gmail.com", "desarrollador", "dante569", "administrador", 1)



--DESCRIBE es para ver la estructura de la tabla



SELECT rut_paciente, fecha_ingreso, id_ficha_tecnica FROM fichas_tecnicas AS ft
JOIN pacientes AS pa ON  ft.fk_paciente = pa.id_paciente
WHERE rut_paciente = '111111111'



SELECT DISTINCT (rut_paciente), pa.nombre_paciente, pa.apellido_paterno_paciente, pa.apellido_materno_paciente,nombre_centro_salud FROM fichas_tecnicas AS ft
JOIN pacientes AS pa ON ft.fk_paciente = pa.id_paciente
JOIN profesionales_usuarios_salud AS pu ON pu.id_profesional_salud = ft.fk_profesional_usuario
JOIN centros_salud AS cs ON pu.fk_centro_salud = cs.id_centro_salud
WHERE nombre_centro_salud = 'Antonio tirado Lanas'
ORDER BY id_paciente DESC  


SELECT fecha_ingreso, nombre_paciente, rut_paciente, nombre_social, identidad_genero FROM fichas_tecnicas AS ft
JOIN pacientes AS pa ON ft.fk_paciente = pa.id_paciente
JOIN historias_identidades_generos AS hg ON pa.fk_historia_genero = hg.id_historia_identidad_genero
WHERE rut_paciente = '333333333' AND fecha_ingreso = (SELECT max(fecha_ingreso) FROM fichas_tecnicas AS ft
JOIN pacientes AS pa ON ft.fk_paciente = pa.id_paciente
JOIN historias_identidades_generos AS hg ON pa.fk_historia_genero = hg.id_historia_identidad_genero
WHERE rut_paciente = '333333333')




