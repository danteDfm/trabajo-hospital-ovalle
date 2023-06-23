"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fichas = void 0;
const consultasGenerales_1 = require("../../consultas/consultasGenerales");
const dicQuery_1 = require("../../consultas/dicQuery");
class Fichas {
    listarFichaActiva(rutPaciente) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
    select 
    rut_paciente,
    nombre_social,
    nombre_paciente, 
    apellido_paterno_paciente, 
    apellido_materno_paciente,
    fecha_nacimiento_paciente,
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
    WHERE rut_paciente  = ? AND estado_ficha = 1

        `;
            try {
                const fichaActiva = yield (0, consultasGenerales_1.consultasGenerales)(query, [rutPaciente]);
                if (fichaActiva.length < 1)
                    return 0;
                return fichaActiva;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    listarFichasInactivas(rutPaciente) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `  select 
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
    WHERE rut_paciente = ? AND  estado_ficha = 0
    order by fecha_ingreso desc`;
            try {
                const fichasInactivas = yield (0, consultasGenerales_1.consultasGenerales)(query, [rutPaciente]);
                return fichasInactivas;
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    dataPanel(rutPaciente) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT  id_paciente, rut_paciente, nombre_paciente,  fecha_nacimiento_paciente, nombre_social, identidad_genero, fecha_ingreso,
    apellido_paterno_paciente, apellido_materno_paciente  from fichas_tecnicas as ft
    left join PACIENTES AS pa ON ft.fk_paciente = pa.id_paciente
   left join PROFESIONALES_USUARIOS_SALUD as u ON ft.fk_profesional_usuario = u.id_profesional_salud
   left join HISTORIAS_IDENTIDADES_GENEROS as hig ON  hig.fk_paciente = pa.id_paciente
   WHERE rut_paciente  = ?
   order by fecha_ingreso desc`;
            try {
                const data = yield (0, consultasGenerales_1.consultasGenerales)(query, [
                    rutPaciente
                ]);
                return data[0];
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    listarPorIdFicha(idFicha) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!idFicha)
                return 0;
            const queryFicha = `SELECT * FROM fichas_tecnicas WHERE id_ficha_tecnica = ?`;
            const queryPaciente = `SELECT * FROM PACIENTES WHERE id_paciente = ?`;
            const queryAntecedentes = `SELECT * FROM HISTORIAS_CLINICAS
    WHERE id_historia_clinica = ?`;
            const queryInvolucrada = `SELECT * FROM PERSONAS_INVOLUCRADAS_TRANSICION
    WHERE id_persona_involucrada_transicion = ?`;
            const queryPsique = `SELECT * FROM AREAS_PSIQUICAS WHERE id_area_psiquica = ?`;
            const queryDdrogas = `select id_historial_droga, uso_droga, detalles_uso_droga from HISTORIAL_DROGAS
    join pacientes as pa on fk_paciente = id_paciente
    where fk_paciente  = ? and id_historial_droga = (select max(id_historial_droga) from HISTORIAL_DROGAS
    join pacientes as pa on fk_paciente = id_paciente
    where fk_paciente  = ?);`;
            const queryDieta = `SELECT
    id_habito_alimenticio,
    detalle_habito_alimenticio FROM HABITOS_ALIMENTICIOS as ha
    join pacientes as pa on ha.fk_paciente = pa.id_paciente
    where fk_paciente  = ? and id_habito_alimenticio = (SELECT
    max(id_habito_alimenticio) FROM HABITOS_ALIMENTICIOS as ha
    join pacientes as pa on ha.fk_paciente = pa.id_paciente
    where fk_paciente  = ?)
    `;
            const queryIdentidad = `SELECT 
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
    WHERE ig.fk_paciente =  ? and  id_historia_identidad_genero = (  SELECT 
    max(id_historia_identidad_genero)
    FROM HISTORIAS_IDENTIDADES_GENEROS as ig
    join pacientes as pa on ig.fk_paciente = pa.id_paciente
    JOIN fichas_tecnicas AS ft ON ft.fk_paciente = pa.id_paciente
    WHERE ig.fk_paciente =  ?)`;
            const queryPrenda = `select 
    fk_prenda_disconformidad,
    id_prenda_n_n 
    from SELECCION_PRENDA as sp
    left join HISTORIAS_IDENTIDADES_GENEROS as hg on sp.fk_historia_genero  = hg.id_historia_identidad_genero
    WHERE id_historia_identidad_genero = ?`;
            let idHistoria;
            let dataAntecedentes;
            let dataInvolucrado;
            let dataAcompanante;
            let dataPsique;
            let dataDroga;
            let dataDieta;
            let dataHistoria;
            let dataPrenda;
            try {
                const dataFicha = yield (0, consultasGenerales_1.consultasGenerales)(queryFicha, [idFicha]);
                const idPaciente = dataFicha[0].fk_paciente;
                const idpsiquica = dataFicha[0].fk_area_psiquica;
                const idHistoriaClinica = dataFicha[0].fk_historia_clinica;
                const idInvolucrado = dataFicha[0].fk_persona_involucrada_encargada;
                const idAcompanante = dataFicha[0].fk_persona_involucrada_acompanante;
                const dataPaciente = yield (0, consultasGenerales_1.consultasGenerales)(queryPaciente, [
                    idPaciente,
                ]);
                dataAntecedentes = yield (0, consultasGenerales_1.consultasGenerales)(queryAntecedentes, [
                    idHistoriaClinica,
                ]);
                dataInvolucrado = yield (0, consultasGenerales_1.consultasGenerales)(queryInvolucrada, [
                    idInvolucrado,
                ]);
                dataAcompanante = yield (0, consultasGenerales_1.consultasGenerales)(queryInvolucrada, [
                    idAcompanante,
                ]);
                dataPsique = yield (0, consultasGenerales_1.consultasGenerales)(queryPsique, [idpsiquica]);
                dataDroga = yield (0, consultasGenerales_1.consultasGenerales)(queryDdrogas, [idPaciente, idPaciente]);
                dataDieta = yield (0, consultasGenerales_1.consultasGenerales)(queryDieta, [idPaciente, idPaciente]);
                dataHistoria = yield (0, consultasGenerales_1.consultasGenerales)(queryIdentidad, [idPaciente, idPaciente]);
                idHistoria = yield dataHistoria[0].id_historia_identidad_genero;
                console.log(dataHistoria);
                dataPrenda = yield (0, consultasGenerales_1.consultasGenerales)(queryPrenda, [idHistoria]);
                return {
                    paciente: dataPaciente[0],
                    ficha: dataFicha[0],
                    antecedentes: dataAntecedentes[0],
                    involucrado: dataInvolucrado[0],
                    acompanante: dataAcompanante[0],
                    areaPsiquica: dataPsique[0],
                    historialDrogas: dataDroga[0],
                    habitosAlimenticios: dataDieta[0],
                    historiaGenero: dataHistoria[0],
                    dataPrenda,
                };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    listarInformacionPaciente(rutPaciente) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryAntecedentes = `SELECT * FROM HISTORIAS_CLINICAS
    WHERE id_historia_clinica = ?`;
            const queryInvolucrada = `SELECT * FROM PERSONAS_INVOLUCRADAS_TRANSICION
    WHERE id_persona_involucrada_transicion = ?`;
            const queryPsique = `SELECT * FROM AREAS_PSIQUICAS WHERE id_area_psiquica = ?`;
            const queryDdrogas = `select * from HISTORIAL_DROGAS
    where fk_paciente  = ? and id_historial_droga = (select max(id_historial_droga) from HISTORIAL_DROGAS WHERE fk_paciente  = ?)`;
            const queryDieta = `SELECT * FROM HABITOS_ALIMENTICIOS
    where fk_paciente  = ? and id_habito_alimenticio = (SELECT MAX(id_habito_alimenticio) FROM HABITOS_ALIMENTICIOS
    where fk_paciente = ?) `;
            const queryIdentidad = `SELECT * FROM HISTORIAS_IDENTIDADES_GENEROS
    WHERE fk_paciente = ? and id_historia_identidad_genero = (SELECT max(id_historia_identidad_genero) FROM HISTORIAS_IDENTIDADES_GENEROS
    WHERE fk_paciente = ?)`;
            const queryPrenda = `select 
    fk_prenda_disconformidad,
    id_prenda_n_n
    from SELECCION_PRENDA where fk_historia_genero = ?`;
            let idPaciente;
            let idFichaTecnica;
            let idHistoria;
            let fkAreaPsiquica;
            let fkHistoriaClinica;
            let fkEncargada;
            let fkAcompanante;
            let dataAntecedentes;
            let dataInvolucrado;
            let dataAcompanante;
            let dataPsique;
            let dataDroga;
            let dataDieta;
            let dataHistoria;
            let dataPrenda;
            try {
                const dataPaciente = yield (0, consultasGenerales_1.consultasGenerales)(dicQuery_1.diccionarioConsultas.paciente, [rutPaciente, rutPaciente]);
                const dataFicha = yield (0, consultasGenerales_1.consultasGenerales)(dicQuery_1.diccionarioConsultas.ficha, [
                    rutPaciente,
                    rutPaciente,
                ]);
                idPaciente = dataPaciente[0].id_paciente;
                fkAreaPsiquica = dataFicha[0].fk_area_psiquica;
                fkHistoriaClinica = dataFicha[0].fk_historia_clinica;
                fkEncargada = dataFicha[0].fk_persona_involucrada_encargada;
                fkAcompanante = dataFicha[0].fk_persona_involucrada_acompanante;
                delete dataFicha[0].fk_profesional_usuario;
                delete dataFicha[0].fk_paciente;
                delete dataFicha[0].fk_area_psiquica;
                delete dataFicha[0].fk_historia_clinica;
                delete dataFicha[0].fk_persona_involucrada_acompanante;
                delete dataFicha[0].fk_persona_involucrada_encargada;
                dataAntecedentes = yield (0, consultasGenerales_1.consultasGenerales)(queryAntecedentes, [
                    fkHistoriaClinica,
                ]);
                dataInvolucrado = yield (0, consultasGenerales_1.consultasGenerales)(queryInvolucrada, [
                    fkEncargada,
                ]);
                dataAcompanante = yield (0, consultasGenerales_1.consultasGenerales)(queryInvolucrada, [
                    fkAcompanante,
                ]);
                dataPsique = yield (0, consultasGenerales_1.consultasGenerales)(queryPsique, [fkAreaPsiquica]);
                dataDroga = yield (0, consultasGenerales_1.consultasGenerales)(queryDdrogas, [
                    idPaciente,
                    idPaciente,
                ]);
                dataDieta = yield (0, consultasGenerales_1.consultasGenerales)(queryDieta, [
                    idPaciente,
                    idPaciente,
                ]);
                dataHistoria = yield (0, consultasGenerales_1.consultasGenerales)(queryIdentidad, [
                    idPaciente,
                    idPaciente,
                ]);
                idHistoria = dataHistoria[0].id_historia_identidad_genero;
                dataPrenda = yield (0, consultasGenerales_1.consultasGenerales)(queryPrenda, [idHistoria]);
                return {
                    paciente: dataPaciente[0],
                    ficha: dataFicha[0],
                    antecedentes: dataAntecedentes[0],
                    involucrado: dataInvolucrado[0],
                    acompanante: dataAcompanante[0],
                    areaPsiquica: dataPsique[0],
                    historialDrogas: dataDroga[0],
                    habitosAlimenticios: dataDieta[0],
                    historiaGenero: dataHistoria[0],
                    dataPrenda,
                };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
}
exports.Fichas = Fichas;
