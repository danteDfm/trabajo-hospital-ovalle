CREATE DATABASE proyecto_transicion
USE proyecto_transicion
DROP DATABASE proyecto_transicion

CREATE TABLE EPISODIOS_PACIENTE(
id_episodio INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
fecha_inicio DATE NOT NULL, 
fecha_termino DATE NOT NULL,
observaciones DATE NOT NULL,  
rut_profesional DATE NOT NULL, 
rut_paciente VARCHAR NOT NULL, 
estado_ficha NOT NULL
)

CREATE TABLE CENTROS_SALUD(
id_centro_salud INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
nombre_centro_salud VARCHAR(50),
comuna_centro_atencion VARCHAR (20),
logo VARCHAR (60)
)

CREATE TRIGGER truguna 
AFTER INSERT ON fichas_tecnicas 
FOR EACH ROW 
BEGIN 

END 

--PROFESIONALES DE LA SALUD

CREATE  TABLE PROFESIONALES_USUARIOS_SALUD(
id_profesional_salud INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
rut_profesional_salud VARCHAR (12) NOT NULL, 
nombre_profesional_salud VARCHAR (50) NOT NULL,  
email_profesional_salud VARCHAR (50) NOT NULL, 
cargo_profesional_salud VARCHAR (20) NOT NULL, 
contrasena VARCHAR (50) NOT NULL,
roles VARCHAR (15) NOT NULL, 
fk_centro_salud INT, 
FOREIGN KEY (fk_centro_salud) REFERENCES CENTROS_SALUD (id_centro_salud)
)


--FICHA TECNICA
create table fichas_tecnicas(
id_ficha_tecnica int not null auto_increment primary KEY, 
fecha_ingreso date not NULL,
borrado_logico BOOLEAN NOT NULL,
apoyo_escolar BOOLEAN  NOT NULL,
judicializacion BOOLEAN NOT NULL,
detalles_apoyo_es VARCHAR (255),
detalles_judicializacion VARCHAR(255),
fk_profesional_usuario INT NOT NULL,
fk_area_psiquica int,   
fk_historia_clinica int, 
fk_persona_involucrada_encargada INT,
fk_persona_involucrada_acompanante INT,
FOREIGN KEY (fk_profesional_usuario) REFERENCES PROFESIONALES_USUARIOS_SALUD (id_profesional_salud),
foreign key (fk_area_psiquica) references AREAS_PSIQUICAS (id_area_psiquica),
foreign key (fk_historia_clinica) references HISTORIAS_CLINICAS (id_historia_clinica),
FOREIGN KEY (fk_persona_involucrada_encargada) REFERENCES PERSONAS_INVOLUCRADAS_TRANSICION(id_persona_involucrada_transicion),
FOREIGN KEY (fk_persona_involucrada_acompanante) REFERENCES PERSONAS_INVOLUCRADAS_TRANSICION(id_persona_involucrada_transicion)
)


CREATE TABLE FICHAS_PACIENTES(
id_ficha_paciente INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
fk_ficha_tecnica INT NOT NULL, 
fk_paciente INT NOT NULL, 
FOREIGN KEY (fk_ficha_tecnica ) REFERENCES fichas_tecnicas(id_ficha_tecnica ),
FOREIGN KEY (FK_paciente) REFERENCES pacientes (id_paciente)
)

SELECT * FROM fichas_pacientes


--historia clinca

create table HISTORIAS_CLINICAS(
id_historia_clinica int not null auto_increment primary key, 
detalles_antecedente_perinatales VARCHAR(255),
detalles_antecedentes_hospitalizaciones VARCHAR(255),
detalles_antecedentes_quirurgicos VARCHAR(255),
detalles_antecedentes_alergicos VARCHAR(255),
detalles_antecedentes_pni VARCHAR(255),
detalles_funcionalidad_genital VARCHAR (255)
)


--persona involucrada
CREATE TABLE PERSONAS_INVOLUCRADAS_TRANSICION(
id_persona_involucrada_transicion INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
rut_persona_involucrada VARCHAR(13), 
pasaporte VARCHAR(13),
nombres_persona_involucrada VARCHAR (30), 
apellido_paterno_persona_involucrada VARCHAR (15),   	
apellido_materno_persona_involucrada VARCHAR (15), 
parentesco_persona_involucrada VARCHAR (15),
telefono_persona_involucrada VARCHAR (15),
domicilio_persona_involucrada VARCHAR (30)
)


create table AREAS_PSIQUICAS(
id_area_psiquica int not null auto_increment primary KEY,
control_equipo_salud_mental boolean NOT NULL,
psicoterapia BOOLEAN  NOT NULL,
evaluacion_psiquica BOOLEAN NOT NULL,
diagnostico_psiquiatrico BOOLEAN  NOT NULL,
utilizacion_farmaco BOOLEAN NOT NULL,
detalles_farmacos VARCHAR (255)
)
 
--paciente 

CREATE TABLE PACIENTES(
id_paciente int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
rut_paciente VARCHAR(12),
pasaporte VARCHAR(13),
nombre_paciente varchar(40) NOT NULL, 
apellido_paterno_paciente varchar(20), 
apellido_materno_paciente varchar(20), 
pronombre varchar(6),
nombre_social varchar(25),
fecha_nacimiento_paciente date NOT NULL, 
domicilio_paciente varchar(50),
telefono_paciente VARCHAR (20),
uso_droga boolean NOT NULL, 
antecedente_familires BOOLEAN NOT NULL,
detalles_uso_droga VARCHAR (255),
detalles_antecedentes_familia VARCHAR (255),
fk_historia_genero INT UNIQUE,
fk_habitos_alimenticios INT UNIQUE,
FOREIGN KEY (fk_historia_genero) REFERENCES historias_identidades_generos (id_historia_identidad_genero),
FOREIGN KEY (fk_habitos_alimenticios) REFERENCES HABITOS_ALIMENTICIOS (id_habito_alimenticio)
);



--habitos alimenticios 
CREATE TABLE HABITOS_ALIMENTICIOS(
id_habito_alimenticio INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
detalle_habito_alimenticio VARCHAR (20) NOT NULL
);



--historia identidad de genero

create table HISTORIAS_IDENTIDADES_GENEROS(
id_historia_identidad_genero int not null auto_increment primary key, 
identidad_genero varchar(15), 
orientacion_sexual varchar(15), 
inicio_transicion_sexual date not null, 
tiempo_latencia date not null, 
apoyo_nucleo_familiar BOOLEAN NOT NULL,
uso_prenda BOOLEAN NOT NULL, 
presencia_disforia BOOLEAN NOT NULL,
detalles_diforia VARCHAR (200)
)
 


CREATE TABLE SELECCION_PRENDA(
id_prenda_n_n INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
fk_historia_genero INT NOT NULL, 
fk_prenda_disconformidad INT NOT NULL, 
FOREIGN KEY(fk_historia_genero) REFERENCES  HISTORIAS_IDENTIDADES_GENEROS (id_historia_identidad_genero),
FOREIGN KEY(fk_prenda_disconformidad) REFERENCES PRENDAS_DISCONFORMIDAD(id_prenda_disconformidad)
)

create table PRENDAS_DISCONFORMIDAD(
id_prenda_disconformidad int not null auto_increment primary key, 
nombre_prenda varchar(20) NOT NULL
)





