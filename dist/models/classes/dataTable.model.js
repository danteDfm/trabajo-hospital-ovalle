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
exports.DataTable = void 0;
const consultasGenerales_1 = require("../../consultas/consultasGenerales");
const dicQuery_1 = require("../../consultas/dicQuery");
class DataTable {
    constructor() { }
    //listar pacientes por centro
    pacienteCentroEspesifico(centro, condicion) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT  DISTINCT (rut_paciente), id_paciente,pa.nombre_paciente, pa.apellido_paterno_paciente, pa.apellido_materno_paciente,nombre_centro_salud FROM fichas_tecnicas AS ft
        JOIN pacientes AS pa ON ft.fk_paciente = pa.id_paciente
        JOIN profesionales_usuarios_salud AS pu ON pu.id_profesional_salud = ft.fk_profesional_usuario
        JOIN centros_salud AS cs ON pu.fk_centro_salud = cs.id_centro_salud
        WHERE nombre_centro_salud ` + condicion + ` ?
        ORDER BY id_paciente DESC  
      `;
                const data = yield (0, consultasGenerales_1.consultasGenerales)(query, [centro]);
                return data;
            }
            catch (err) {
                console.log(err);
                throw ("Error en la consulta");
            }
        });
    }
    //buscar paciente por id 
    traerDataPaciente(idFicha) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataFicha = yield (0, consultasGenerales_1.consultasGenerales)(dicQuery_1.diccionarioSelect.ficha, [idFicha]);
                const dataPaciente = yield (0, consultasGenerales_1.consultasGenerales)(dicQuery_1.diccionarioSelect.paciente, [dataFicha[0].fk_paciente]);
                const dataHistoria = yield (0, consultasGenerales_1.consultasGenerales)(dicQuery_1.diccionarioSelect.HistoriaGenero, [dataPaciente[0].fk_historia_genero]);
                const dataDieta = yield (0, consultasGenerales_1.consultasGenerales)(dicQuery_1.diccionarioSelect.dieta, [dataPaciente[0].fk_habitos_alimenticios]);
                const dataPrenda = yield (0, consultasGenerales_1.consultasGenerales)(dicQuery_1.diccionarioSelect.prenda, [dataHistoria[0].id_historia_identidad_genero]);
                const dataAntecedentes = yield (0, consultasGenerales_1.consultasGenerales)(dicQuery_1.diccionarioSelect.antecedentes, [dataFicha[0].fk_historia_clinica]);
                const involucrados = yield (0, consultasGenerales_1.consultasGenerales)(dicQuery_1.diccionarioSelect.involucrados, [dataFicha[0].fk_persona_involucrada_encargada]);
                const acompanantes = yield (0, consultasGenerales_1.consultasGenerales)(dicQuery_1.diccionarioSelect.involucrados, [dataFicha[0].fk_persona_involucrada_acompanante]);
                const dataPsique = yield (0, consultasGenerales_1.consultasGenerales)(dicQuery_1.diccionarioSelect.psique, [dataFicha[0].fk_area_psiquica]);
                dataFicha.push(dataAntecedentes[0]);
                dataFicha.push(dataPsique[0]);
                dataFicha.push(dataPaciente[0]);
                dataFicha.push(dataHistoria[0]);
                dataFicha.push(dataDieta[0]);
                dataFicha.push(dataPrenda[0]);
                dataFicha.push(involucrados[0]);
                dataFicha.push(acompanantes[0]);
                return dataFicha;
            }
            catch (err) {
                console.log(err);
                throw ("Error de consulta");
            }
        });
    }
    listarFichasPorRut(rutPaciente) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT rut_paciente,id_ficha_tecnica FROM fichas_tecnicas AS ft
      JOIN pacientes AS pa ON  ft.fk_paciente = pa.id_paciente
      WHERE rut_paciente = ?
      order by  id_ficha_tecnica desc
    `;
                const query2 = `SELECT fecha_ingreso, nombre_paciente,apellido_paterno_paciente , apellido_materno_paciente,rut_paciente, nombre_social, identidad_genero, fecha_nacimiento_paciente FROM fichas_tecnicas AS ft
      JOIN pacientes AS pa ON ft.fk_paciente = pa.id_paciente
      JOIN historias_identidades_generos AS hg ON pa.fk_historia_genero = hg.id_historia_identidad_genero
      WHERE rut_paciente = ? AND fecha_ingreso = (SELECT max(fecha_ingreso) FROM fichas_tecnicas AS ft
      JOIN pacientes AS pa ON ft.fk_paciente = pa.id_paciente
      JOIN historias_identidades_generos AS hg ON pa.fk_historia_genero = hg.id_historia_identidad_genero
      WHERE rut_paciente = ?)`;
                const fichas = yield (0, consultasGenerales_1.consultasGenerales)(query, [rutPaciente]);
                const dataEspesifica = yield (0, consultasGenerales_1.consultasGenerales)(query2, [rutPaciente, rutPaciente]);
                fichas.unshift(dataEspesifica[0]);
                return fichas;
            }
            catch (err) {
                console.log(err);
                throw new Error("Error en la consulta Listar fichas");
            }
        });
    }
    static buscarSoloRut(rutPaciente) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT id_paciente FROM PACIENTES WHERE rut_paciente = ?";
                let dataPaciente = yield (0, consultasGenerales_1.consultasGenerales)(query, [rutPaciente]);
                return dataPaciente;
            }
            catch (err) {
                console.log(err);
                throw new Error("Error listar por rut");
            }
        });
    }
}
exports.DataTable = DataTable;
