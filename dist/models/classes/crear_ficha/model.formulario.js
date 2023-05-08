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
exports.FormularioRegistro = void 0;
const devolucion_Id_1 = require("../../../consultas/devolucion.Id");
const generaConsultas_1 = require("../../../utils/generaConsultas");
const ficha_pasos_1 = require("./ficha.pasos");
class FormularioRegistro {
    constructor() {
        this.informacionPaciente = new ficha_pasos_1.InformacionPaciente();
        this.indentidadGenero = new ficha_pasos_1.IdentidadGenero();
        this.entornoPaciente = new ficha_pasos_1.EntornoPaciente();
        this.areaPsiquica = new ficha_pasos_1.AreaPsiquica();
        this.antecedentesClinicosPaciente = new ficha_pasos_1.AntecedentesClinicosPaciente();
    }
    crearTablasTerciarias() {
        return __awaiter(this, void 0, void 0, function* () {
            const idPresenciaDisforia = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`PRESENCIA_DISFORIA`, 1), [this.areaPsiquica.datosPsiquicos.disforia.presenciaDisforia], true);
            (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`DETALLES_DISFORIA`, 2), [
                this.areaPsiquica.datosPsiquicos.disforia.detallesDisforia,
                idPresenciaDisforia,
            ], this.areaPsiquica.datosPsiquicos.disforia.presenciaDisforia);
            const idUsoPrenda = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`USO_PRENDAS`, 1), [
                this.indentidadGenero.historiaIdentidadGenero
                    .prendasDisconformidadGenero.usoPrenda,
            ], true);
            (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`SELECCION_PRENDA`, 1), [
                idUsoPrenda,
                this.indentidadGenero.historiaIdentidadGenero
                    .prendasDisconformidadGenero,
            ], this.indentidadGenero.historiaIdentidadGenero.prendasDisconformidadGenero
                .usoPrenda);
            const idPresenciaAntecedentesFamiliares = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`PRESENCIA_ANTECEDENTES`, 1), [
                this.entornoPaciente.entornoPaciente.antecedentesFamiliares
                    .presenciaAntecedentes,
            ], true);
            const idUsoDrogas = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`USO_DROGAS`, 1), [this.areaPsiquica.datosPsiquicos.habitos.usoDrogas], true);
            (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`DROGAS`, 2), [this.areaPsiquica.datosPsiquicos.habitos.drogas, idUsoDrogas], this.areaPsiquica.datosPsiquicos.habitos.usoDrogas);
            const idUsoFarmaco = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`USO_FARMACO`, 1), [this.areaPsiquica.datosPsiquicos.habitos.alimenticios], true);
            (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`TIPOS_FARMACOS`, 2), [this.areaPsiquica.datosPsiquicos.usofarmacos.tipoFarmaco, idUsoFarmaco], this.areaPsiquica.datosPsiquicos.usofarmacos.usoFarmaco);
            const idHabitosAlimenticios = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`HABITOS_ALIMENTICIOS`, 1), [this.areaPsiquica.datosPsiquicos.habitos.alimenticios], true);
            return {
                idUsoPrenda,
                idPresenciaDisforia,
                idPresenciaAntecedentesFamiliares,
                idUsoDrogas,
                idUsoFarmaco,
                idHabitosAlimenticios,
            };
        });
    }
    crearTablasSecundarias(idUsoPrenda, idPresenciaDisforia, idPresenciaAntecedentesFamiliares, idUsoDrogas, idUsoFarmaco, idHabitosAlimenticios) {
        return __awaiter(this, void 0, void 0, function* () {
            const idHistoriaIdentidadGenero = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`HISTORIAS_IDENTIDADES_GENEROS`, 7), [
                this.indentidadGenero.historiaIdentidadGenero.historiaGenero
                    .identidadGenero,
                this.indentidadGenero.historiaIdentidadGenero.historiaGenero
                    .orientacionSexual,
                this.indentidadGenero.historiaIdentidadGenero.historiaGenero
                    .inicioTransicion,
                this.indentidadGenero.historiaIdentidadGenero.historiaGenero
                    .tiempoLtencia,
                this.indentidadGenero.historiaIdentidadGenero.historiaGenero
                    .apoyoNucleoFamiliar,
                idPresenciaDisforia,
                idUsoPrenda,
            ], true);
            (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`ANTECEDENTES_FAMILIARES`, 2), [
                this.entornoPaciente.entornoPaciente.antecedentesFamiliares
                    .detallesAntecedentes,
                idPresenciaAntecedentesFamiliares,
            ], this.entornoPaciente.entornoPaciente.antecedentesFamiliares
                .presenciaAntecedentes);
            const idPaciente = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`PACIENTES`, 11), [
                this.informacionPaciente.dataPaciente.rutPaciente,
                this.informacionPaciente.dataPaciente.nombrePaciente,
                this.informacionPaciente.dataPaciente.apellidoPaternoPaciente,
                this.informacionPaciente.dataPaciente.apellidoMaternoPaciente,
                this.informacionPaciente.dataPaciente.pronombre,
                this.informacionPaciente.dataPaciente.nombreSocial,
                this.informacionPaciente.dataPaciente.fechaNacimiento,
                this.informacionPaciente.dataPaciente.domicilioPaciente,
                idHabitosAlimenticios,
                idUsoDrogas,
                idPresenciaAntecedentesFamiliares,
                idHistoriaIdentidadGenero,
            ], true);
            const idAreaPsiquica = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`AREAS_PSIQUICAS`, 2), [
                this.areaPsiquica.datosPsiquicos.datosPsiquicos
                    .controlEquipoSaludMental,
                this.areaPsiquica.datosPsiquicos.datosPsiquicos.psicoterapia,
                this.areaPsiquica.datosPsiquicos.datosPsiquicos.evaluacionPsiquica,
                this.areaPsiquica.datosPsiquicos.datosPsiquicos.diagnosicoPsiquiatrico,
                idUsoFarmaco,
            ], true);
            const idApoyoEscolaridad = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`APOYO_ESCOLARIDADES`, 4), [
                this.entornoPaciente.entornoPaciente.escolaridad.gradoEscolar,
                this.entornoPaciente.entornoPaciente.escolaridad.gradoDeApoyo,
                this.entornoPaciente.entornoPaciente.escolaridad.actorInvolucrado,
                this.entornoPaciente.entornoPaciente.escolaridad.detallesApoyo,
            ], true);
            const idFuncionalidadGenital = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`ANTECEDENTES_FUNCIONALIDADES_GENITAL`, 1), [
                this.antecedentesClinicosPaciente.antecedentesClinicos
                    .detallesAntecedentesGenitales,
            ], true);
            const idPersonaAcompanante = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`PERSONAS_ACOMPANANTES`, 4), [
                this.informacionPaciente.dataInvolucrados.dataAcompanante
                    .nombreCompletoAcompanante,
                this.informacionPaciente.dataInvolucrados.dataAcompanante
                    .rutAcompanante,
                this.informacionPaciente.dataInvolucrados.dataAcompanante
                    .parentescoAcompanante,
                this.informacionPaciente.dataInvolucrados.dataAcompanante
                    .telefonoAcompanante,
            ], true);
            const idPersonaInvolucrada = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`PERSONAS_INVOLUCRADAS_TRANSICION`, 7), [
                this.informacionPaciente.dataInvolucrados.dataInvolucrado
                    .rutPersonaInvolucrada,
                this.informacionPaciente.dataInvolucrados.dataInvolucrado
                    .nombresPersonaInvolucrada,
                this.informacionPaciente.dataInvolucrados.dataInvolucrado
                    .apellidoPaternoInvolucrado,
                this.informacionPaciente.dataInvolucrados.dataInvolucrado
                    .apellidoMaternoInvolucrado,
                this.informacionPaciente.dataInvolucrados.dataInvolucrado
                    .parentescoPersonaInvolucrada,
                this.informacionPaciente.dataInvolucrados.dataInvolucrado
                    .telefonoPersonaInvolucrada,
                this.informacionPaciente.dataInvolucrados.dataInvolucrado
                    .domicilioPersonaInvolucrada,
            ], true);
            const idHistoriasClinicas = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`HISTORIAS_CLINICAS`, 5), [
                this.antecedentesClinicosPaciente.antecedentesClinicos
                    .detallesAntecedentesPerinatales,
                this.antecedentesClinicosPaciente.antecedentesClinicos
                    .detallesAntecedentesHospitalizaciones,
                this.antecedentesClinicosPaciente.antecedentesClinicos
                    .detallesAntecedentesQuirurgicos,
                this.antecedentesClinicosPaciente.antecedentesClinicos
                    .detallesAntecedentesAlergicos,
                this.antecedentesClinicosPaciente.antecedentesClinicos
                    .detallesAntecedentesPni,
            ], true);
            return {
                idPaciente,
                idApoyoEscolaridad,
                idAreaPsiquica,
                idFuncionalidadGenital,
                idHistoriasClinicas,
                idPersonaAcompanante,
                idPersonaInvolucrada,
            };
        });
    }
    crearTablaPrimaria(fechaIngreso, borradoLogico, idUser, idPaciente, idApoyoEscolaridad, idAreaPsiquica, idFuncionalidadGenital, idHistoriasClinicas, idPersonaAcompanante, idPersonaInvolucrada) {
        (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`FICHAS_TECNICAS`, 10), [
            fechaIngreso,
            borradoLogico,
            idUser,
            idPaciente,
            idApoyoEscolaridad,
            idAreaPsiquica,
            idFuncionalidadGenital,
            idHistoriasClinicas,
            idPersonaAcompanante,
            idPersonaInvolucrada,
        ], true);
    }
}
exports.FormularioRegistro = FormularioRegistro;
