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
    listarFichaActiva(idFicha) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
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
        WHERE  estado_ficha = 1 and id_ficha_tecnica = ?
        `;
            try {
                const fichaActiva = yield (0, consultasGenerales_1.consultasGenerales)(query, [idFicha]);
                return fichaActiva;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    listarFichasInactivas(idPaciente) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `select 
    nombre_paciente, 
    apellido_paterno_paciente, 
    id_ficha_tecnica, 
    fecha_ingreso,
    fecha_finalizacion, 
    estado_ficha, 
    nivelFormulario
    from fichas_tecnicas as ft
    join PACIENTES AS pa ON ft.fk_paciente = pa.id_paciente
    WHERE fk_paciente = 1 
    order by fecha_ingreso desc `;
            try {
                const fichasInactivas = (0, consultasGenerales_1.consultasGenerales)(query, [idPaciente]);
                return fichasInactivas;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    listarInformacionPaciente(rutPaciente) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryAntecedentes = `SELECT * FROM HISTORIAS_CLINICAS
    WHERE id_historia_clinica = ?`;
            const queryInvolucrada = `SELECT * FROM PERSONAS_INVOLUCRADAS_TRANSICION
    WHERE id_persona_involucrada_transicion = ?
    `;
            const queryPsique = `SELECT * FROM AREAS_PSIQUICAS WHERE id_area_psiquica = ?`;
            const queryDdrogas = `select * from HISTORIAL_DROGAS
    where fk_paciente  = ? and id_historial_droga = (select max(id_historial_droga) from HISTORIAL_DROGAS WHERE fk_paciente  = ?)
    `;
            const queryDieta = `SELECT * FROM HABITOS_ALIMENTICIOS
    where fk_paciente  = ? and id_habito_alimenticio = (SELECT MAX(id_habito_alimenticio) FROM HABITOS_ALIMENTICIOS
    where fk_paciente = ?)
    `;
            const queryIdentidad = `SELECT * FROM HISTORIAS_IDENTIDADES_GENEROS
    WHERE fk_paciente = ? and id_historia_identidad_genero = (SELECT max(id_historia_identidad_genero) FROM HISTORIAS_IDENTIDADES_GENEROS
    WHERE fk_paciente = ?)`;
            const queryPrenda = `select * from SELECCION_PRENDA where fk_historia_genero = ?`;
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
                const dataPaciente = yield (0, consultasGenerales_1.consultasGenerales)(dicQuery_1.diccionarioConsultas.paciente, [
                    rutPaciente,
                    rutPaciente,
                ]);
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
