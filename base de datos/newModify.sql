CREATE DATABASE TRANSICION_GENERO;
USE TRANSICION_GENERO;

DROP DATABASE TRANSICION_GENERO;




create table HISTORIAS_CLINICAS(
id_historia_clinica int not null auto_increment primary key, 
detalles_antecedente_perinatales VARCHAR(255),
detalles_antecedentes_hospitalizaciones VARCHAR(255),
detalles_antecedentes_quirurgicos VARCHAR(255),
detalles_antecedentes_alergicos VARCHAR(255),
detalles_antecedentes_pni VARCHAR(255),
detalles_funcionalidad_genital VARCHAR (255),
detalles_antecedentes_familia  varchar (255)
);

	

CREATE TABLE PERSONAS_INVOLUCRADAS_TRANSICION(
id_persona_involucrada_transicion INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
rut_persona_involucrada VARCHAR(13), 
nombres_persona_involucrada VARCHAR (50), 
apellido_paterno_persona_involucrada VARCHAR (25),   	
apellido_materno_persona_involucrada VARCHAR (25), 
fecha_nacimiento_persona_involucrada date, 
parentesco_persona_involucrada VARCHAR (15),
telefono_persona_involucrada VARCHAR (15),
domicilio_persona_involucrada VARCHAR (30)
);




create table AREAS_PSIQUICAS(
id_area_psiquica int not null auto_increment primary KEY,
control_equipo_salud_mental boolean,
psicoterapia BOOLEAN,
evaluacion_psiquica BOOLEAN,
diagnostico_psiquiatrico BOOLEAN,
utilizacion_farmaco BOOLEAN,
detalles_farmacos VARCHAR (255)
);
 

 
CREATE TABLE PACIENTES(
id_paciente int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
rut_paciente VARCHAR(12) NOT NULL,
nombre_paciente varchar(50) NOT NULL, 
apellido_paterno_paciente varchar(20), 
apellido_materno_paciente varchar(20), 
fecha_nacimiento_paciente date NOT NULL, 
domicilio_paciente varchar(50),
telefono_paciente VARCHAR (20),
pronombre varchar(6),
nombre_social varchar(25)
);



CREATE TABLE HISTORIAL_DROGAS(
id_historial_droga INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
uso_droga boolean , 
detalles_uso_droga VARCHAR (255),
fk_paciente INT,
foreign key (fk_paciente) references PACIENTES (id_paciente)
);



CREATE TABLE HABITOS_ALIMENTICIOS(
id_habito_alimenticio INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
detalle_habito_alimenticio VARCHAR (255), 
fk_paciente INT,
foreign key (fk_paciente) references PACIENTES (id_paciente)
);



create table HISTORIAS_IDENTIDADES_GENEROS(
id_historia_identidad_genero int not null auto_increment primary key, 
identidad_genero varchar(15), 
orientacion_sexual varchar(15), 
autopercepcion int, 
inicio_transicion_sexual DATETIME, 
tiempo_latencia DATETIME, 
apoyo_nucleo_familiar BOOLEAN,
uso_prenda BOOLEAN, 
presencia_disforia BOOLEAN,
detalles_diforia VARCHAR (200),
fk_paciente int, 
foreign key (fk_paciente) references PACIENTES(id_paciente)
);



create table PRENDAS_DISCONFORMIDAD(
id_prenda_disconformidad int not null auto_increment primary key, 
nombre_prenda varchar(20) NOT NULL
);

CREATE TABLE SELECCION_PRENDA(
id_prenda_n_n INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
fk_historia_genero INT NOT NULL, 
fk_prenda_disconformidad INT NOT NULL, 
FOREIGN KEY(fk_historia_genero) REFERENCES  HISTORIAS_IDENTIDADES_GENEROS (id_historia_identidad_genero),
FOREIGN KEY(fk_prenda_disconformidad) REFERENCES PRENDAS_DISCONFORMIDAD(id_prenda_disconformidad)
);


CREATE TABLE CENTROS_SALUD(
id_centro_salud INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
nombre_centro_salud VARCHAR(100),
comuna_centro_atencion VARCHAR (20),
logo VARCHAR (100)
);

CREATE  TABLE PROFESIONALES_USUARIOS_SALUD(
id_profesional_salud INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
rut_profesional_salud VARCHAR (12) NOT NULL, 
nombre_profesional_salud VARCHAR (50) NOT NULL,  
email_profesional_salud VARCHAR (200) NOT NULL, 
cargo_profesional_salud VARCHAR (20) NOT NULL, 
contrasena VARCHAR (200) NOT NULL,
roles VARCHAR (15) NOT NULL, 
fk_centro_salud INT, 
FOREIGN KEY (fk_centro_salud) REFERENCES CENTROS_SALUD (id_centro_salud)
);



create table fichas_tecnicas(
id_ficha_tecnica int not null auto_increment primary KEY, 
fecha_ingreso DATETIME not NULL,
fecha_finalizacion DATETIME, 
estado_ficha BOOLEAN default false, 
nivelFormulario int not null, 
apoyo_escolar BOOLEAN,
judicializacion BOOLEAN,
detalles_apoyo_es VARCHAR (255),
detalles_judicializacion VARCHAR(255),
fk_paciente INT NOT NULL, 
fk_profesional_usuario INT NOT NULL,
fk_area_psiquica int,  
fk_historia_clinica int, 
fk_persona_involucrada_encargada INT,
fk_persona_involucrada_acompanante INT,
FOREIGN KEY (fk_paciente) REFERENCES pacientes (id_paciente),
FOREIGN KEY (fk_profesional_usuario) REFERENCES PROFESIONALES_USUARIOS_SALUD (id_profesional_salud),
foreign key (fk_area_psiquica) references AREAS_PSIQUICAS (id_area_psiquica),
foreign key (fk_historia_clinica) references HISTORIAS_CLINICAS (id_historia_clinica),
FOREIGN KEY (fk_persona_involucrada_encargada) REFERENCES PERSONAS_INVOLUCRADAS_TRANSICION(id_persona_involucrada_transicion),
FOREIGN KEY (fk_persona_involucrada_acompanante) REFERENCES PERSONAS_INVOLUCRADAS_TRANSICION(id_persona_involucrada_transicion)
);

insert into CENTROS_SALUD values (NULL, "Antonio Tirado Lanas", "Coquimbo", "/pruebas");
insert into PRENDAS_DISCONFORMIDAD values (null, "packing"), (null, "binder"), (null, "tucking");

