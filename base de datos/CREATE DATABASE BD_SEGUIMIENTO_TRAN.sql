CREATE DATABASE proyecto_transicion
USE proyecto_transicion
DROP DATABASE proyecto_transicion

CREATE TABLE CENTROS_SALUD (
id_centro_salud INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
nombre_centro_salud VARCHAR(50), 
logo VARCHAR (60)
)

--PROFESIONALES DE LA SALUD

CREATE  TABLE PROFESIONALES_USUARIOS_SALUD(
id_profesional_salud INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
rut_profesional_salud VARCHAR (12) NOT NULL, 
nombre_profesional_salud VARCHAR (50) NOT NULL,  
email_profesional_salud VARCHAR (50) NOT NULL, 
cargo_profesional_salud VARCHAR (20) NOT NULL, 
contrasena VARCHAR (50) NOT NULL,
fk_centro_salud INT, 
FOREIGN KEY (fk_centro_salud) REFERENCES CENTROS_SALUD (id_centro_salud)
)


CREATE TABLE EPISODIOS_PACIENTE(
id_episodio INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
fecha_episodio DATE NOT NULL, 
estado:paciente NOT NULL
)

--FICHA TECNICA
create table FICHAS_TECNICAS(
id_ficha_tecnica int not null auto_increment primary KEY, 

fecha_ingreso date not NULL,
borrado_logico BOOLEAN NOT NULL,

apoyo_escolar ENUM('1','2','3') NOT NULL,
judicializacion ENUM('1','2','3') NOT NULL,

fk_profesional_usuario INT NOT NULL,
fk_paciente INT NOT NULL,
fk_detalles_apoyo INT,
fk_detalles_juicio INT, 
fk_area_psiquica int, 
fk_funcionalidad_genital int,  
fk_historia_clinica int, 
fk_persona_involucrada_encargada INT,
fk_persona_involucrada_acompanante INT,
FOREIGN KEY (fk_detalles_juicio) REFERENCES DETALLES_JUICIO (id_detalle_juicio),
FOREIGN KEY (fk_detalles_apoyo) REFERENCES DETALLES_APOYO (id_detalle_apoyo),
FOREIGN KEY (fk_profesional_usuario) REFERENCES PROFESIONALES_USUARIOS_SALUD (id_profesional_salud),
foreign key (fk_area_psiquica) references AREAS_PSIQUICAS (id_area_psiquica),
foreign key (fk_paciente) references PACIENTES (id_paciente),
foreign key (fk_funcionalidad_genital) references ANTECEDENTES_FUNCIONALIDADES_GENITAL(id_funcionalidad_genital),
foreign key (fk_historia_clinica) references HISTORIAS_CLINICAS (id_historia_clinica),
FOREIGN KEY (fk_persona_involucrada_encargada) REFERENCES PERSONAS_INVOLUCRADAS_TRANSICION(id_persona_involucrada_transicion),
FOREIGN KEY (fk_persona_involucrada_acompanante) REFERENCES PERSONAS_INVOLUCRADAS_TRANSICION(id_persona_involucrada_transicion)
)

SELECT * FROM FICHAS_TECNICAS

--historia clinca

create table HISTORIAS_CLINICAS(
id_historia_clinica int not null auto_increment primary key, 
detalles_antecedente_perinatales VARCHAR(255),
detalles_antecedentes_hospitalizaciones VARCHAR(255),
detalles_antecedentes_quirurgicos VARCHAR(255),
detalles_antecedentes_alergicos VARCHAR(255),
detalles_antecedentes_pni VARCHAR(255)
)



--persona involucrada
CREATE TABLE PERSONAS_INVOLUCRADAS_TRANSICION(
id_persona_involucrada_transicion INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
rut_persona_involucrada VARCHAR(13), 
nombres_persona_involucrada VARCHAR (30), 
apellido_paterno_persona_involucrada VARCHAR (15),   	
apellido_materno_persona_involucrada VARCHAR (15), 
parentesco_persona_involucrada VARCHAR (15),
responsabilidad_persona_involucrada VARCHAR (14),
telefono_persona_involucrada VARCHAR (15),
domicilio_persona_involucrada VARCHAR (30)
)




--antecedentes funcionalidad genital
create table ANTECEDENTES_FUNCIONALIDADES_GENITAL(
id_funcionalidad_genital int not null auto_increment primary key,
detalle_funcionalidad_genital varchar (255) NOT NULL
)


--apoyo escolaridad
CREATE TABLE DETALLES_APOYO(
id_detalle_apoyo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
detalles_apoyo VARCHAR (255)	NOT NULL
)


--juicios

CREATE TABLE DETALLES_JUICIO(
id_detalle_juicio INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
detalles_juicio VARCHAR (255) NOT NULL
)

 

create table AREAS_PSIQUICAS(
id_area_psiquica int not null auto_increment primary KEY,
control_equipo_salud_mental ENUM('1','2','3') NOT NULL,
psicoterapia ENUM('1','2','3') NOT NULL,
evaluacion_psiquica ENUM('1','2','3') NOT NULL,
diagnostico_psiquiatrico ENUM('1','2','3') NOT NULL,
utilizacion_farmaco ENUM('1','2','3') NOT NULL,
fk_detalles_farmaco INT UNIQUE, 
FOREIGN KEY (fk_detalles_farmaco) REFERENCES TIPOS_FARMACOS (id_tipo_farmaco)
)

create table TIPOS_FARMACOS(
id_tipo_farmaco int not null auto_increment primary key, 
detalles_farmaco VARCHAR (255)
)
 


--paciente 

CREATE TABLE PACIENTES(
id_paciente int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
rut_paciente varchar(12) NOT NULL,
nombre_paciente varchar(40) NOT NULL, 
apellido_paterno_paciente varchar(20), 
apellido_materno_paciente varchar(20), 
pronombre varchar(6),
nombre_social varchar(25),
fecha_nacimiento_paciente date NOT NULL, 
domicilio_paciente varchar(50),
telefono_paciente VARCHAR (20),
uso_droga ENUM('1','2','3') NOT NULL, 
antecedente_familires ENUM('1','2','3') NOT NULL,
fk_antecedentes_familiares INT UNIQUE, 
fk_detalles_drogas INT UNIQUE, 
fk_habitos_alimenticios INT UNIQUE ,
FOREIGN KEY (fk_antecedentes_familiares) REFERENCES ANTECEDENTES_FAMILIARES (id_antecedentes_familia),
FOREIGN KEY (fk_detalles_drogas) REFERENCES DETALLES_DROGAS (id_droga),
FOREIGN KEY (fk_habitos_alimenticios) REFERENCES HABITOS_ALIMENTICIOS (id_habito_alimenticio)
);


SELECT * FROM PACIENTES
-- habitos uso de drogas 

CREATE TABLE DETALLES_DROGAS(
id_droga INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
detalles_drogas VARCHAR(255) NOT NULL 
)

--habitos alimenticios 

CREATE TABLE HABITOS_ALIMENTICIOS(
id_habito_alimenticio INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
detalle_habito_alimenticio VARCHAR (20) NOT NULL
);

SELECT * FROM HABITOS_ALIMENTICIOS

--antecedentes clinicos familia


CREATE TABLE ANTECEDENTES_FAMILIARES(
id_antecedentes_familia INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
detalles_antecedente VARCHAR (255) NOT NULL
)


--historia identidad de genero

create table HISTORIAS_IDENTIDADES_GENEROS(
id_historia_identidad_genero int not null auto_increment primary key, 
identidad_genero varchar(15), 
orientacion_sexual varchar(15), 
inicio_transicion_sexual date not null, 
tiempo_latencia date not null, 
apoyo_nucleo_familiar ENUM('1','2','3') NOT NULL,
uso_prenda ENUM('1', '2', '3') NOT NULL, 
presencia_disforia ENUM('1','2','3') NOT NULL,
fk_detalles_disforia INT UNIQUE, 
FOREIGN KEY (fk_detalles_disforia) REFERENCES detalles_disforia (id_elemento_disforia)
)
 
 SELECT * FROM HISTORIAS_IDENTIDADES_GENEROS

CREATE TABLE SELECCION_PRENDA(
id_prenda_n_n INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
fk_historia_genero INT NOT NULL, 
fk_prenda_disconformidad INT NOT NULL, 
FOREIGN KEY(fk_historia_genero) REFERENCES  HISTORIAS_IDENTIDADES_GENEROS (id_historia_identidad_genero),
FOREIGN KEY(fk_prenda_disconformidad) REFERENCES PRENDAS_DISCONFORMIDAD(id_prenda_disconformidad)
)

SELECT * FROM seleccion_prenda

create table PRENDAS_DISCONFORMIDAD(
id_prenda_disconformidad int not null auto_increment primary key, 
nombre_prenda varchar(20) NOT NULL
)

SELECT * FROM PRENDAS_DISCONFORMIDAD
INSERT INTO prendas_disconformidad VALUES (NULL, "otras"), (NULL, "packet"), (NULL, "socket"), (NULL, "rocket")
--presencia de disforia 

create table DETALLES_DISFORIA(
id_elemento_disforia int not null auto_increment primary key, 
detalles_elemento varchar(255) NOT NULL 
)


SELECT * FROM DETALLES_DISFORIA

