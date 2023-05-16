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
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idDetallesDisforia = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`DETALLES_DISFORIA`, 1), [this.areaPsiquica.datosPsiquicos.disforia.detallesDisforia], this.areaPsiquica.datosPsiquicos.disforia.presenciaDisforia);
                const idPresenciaDisforia = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`PRESENCIA_DISFORIA`, 2), [
                    this.areaPsiquica.datosPsiquicos.disforia.presenciaDisforia,
                    idDetallesDisforia,
                ], true);
                const idUsoPrenda = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`USO_PRENDAS`, 1), [
                    this.indentidadGenero.historiaIdentidadGenero
                        .prendasDisconformidadGenero.usoPrenda,
                ], true);
                (_a = this.indentidadGenero.historiaIdentidadGenero.prendasDisconformidadGenero.prendas) === null || _a === void 0 ? void 0 : _a.map((prendas) => __awaiter(this, void 0, void 0, function* () {
                    (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`SELECCION_PRENDA`, 2), [idUsoPrenda, prendas], this.indentidadGenero.historiaIdentidadGenero
                        .prendasDisconformidadGenero.usoPrenda);
                }));
                const idAntecedentesFamilia = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`ANTECEDENTES_FAMILIARES`, 1), [
                    this.entornoPaciente.entornoPaciente.antecedentesFamiliares
                        .detallesAntecedentes,
                ], this.entornoPaciente.entornoPaciente.antecedentesFamiliares
                    .presenciaAntecedentes);
                const idPresenciaAntecedentesFamiliares = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`PRESENCIA_ANTECEDENTES`, 2), [
                    this.entornoPaciente.entornoPaciente.antecedentesFamiliares
                        .presenciaAntecedentes,
                    idAntecedentesFamilia,
                ], true);
                const idDrogas = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`DROGAS`, 1), [this.areaPsiquica.datosPsiquicos.habitos.drogas], this.areaPsiquica.datosPsiquicos.habitos.usoDrogas);
                const idUsoDrogas = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`USO_DROGAS`, 2), [this.areaPsiquica.datosPsiquicos.habitos.usoDrogas, idDrogas], true);
                const idDetallesFarmaco = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`TIPOS_FARMACOS`, 1), [this.areaPsiquica.datosPsiquicos.usoFarmacos.tipoFarmaco], this.areaPsiquica.datosPsiquicos.usoFarmacos.usoFarmaco);
                const idUsoFarmaco = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`USO_FARMACOS`, 2), [
                    this.areaPsiquica.datosPsiquicos.usoFarmacos.usoFarmaco,
                    idDetallesFarmaco,
                ], true);
                const idHabitosAlimenticios = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`HABITOS_ALIMENTICIOS`, 1), [this.areaPsiquica.datosPsiquicos.habitos.alimenticios], true);
                const idDetallesJuicio = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`DETALLES_JUICIO`, 1), [this.entornoPaciente.entornoPaciente.judicializaciones.dataTribunal], this.entornoPaciente.entornoPaciente.judicializaciones.juicio);
                const idJudicializaciones = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`JUDICIALIZACIONES`, 2), [
                    this.entornoPaciente.entornoPaciente.judicializaciones.juicio,
                    idDetallesJuicio,
                ], true);
                return {
                    idUsoPrenda,
                    idPresenciaDisforia,
                    idPresenciaAntecedentesFamiliares,
                    idUsoDrogas,
                    idUsoFarmaco,
                    idHabitosAlimenticios,
                    idJudicializaciones,
                };
            }
            catch (err) {
                console.log(err);
                throw new Error();
            }
        });
    }
    crearTablasSecundarias(idUsoPrenda, idPresenciaDisforia, idPresenciaAntecedentesFamiliares, idUsoDrogas, idUsoFarmaco, idHabitosAlimenticios) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idHistoriaIdentidadGenero = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`HISTORIAS_IDENTIDADES_GENEROS`, 7), [
                    this.indentidadGenero.historiaIdentidadGenero.historiaGenero
                        .identidadGenero,
                    this.indentidadGenero.historiaIdentidadGenero.historiaGenero
                        .orientacionSexual,
                    this.indentidadGenero.historiaIdentidadGenero.historiaGenero
                        .inicioTransicion,
                    this.indentidadGenero.historiaIdentidadGenero.historiaGenero
                        .tiempoLatencia,
                    this.indentidadGenero.historiaIdentidadGenero.historiaGenero
                        .apoyoNucleoFamiliar,
                    idPresenciaDisforia,
                    idUsoPrenda,
                ], true);
                const idPaciente = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`PACIENTES`, 12), [
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
                const idAreaPsiquica = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`AREAS_PSIQUICAS`, 5), [
                    this.areaPsiquica.datosPsiquicos.datosPsiquicos
                        .controlEquipoSaludMental,
                    this.areaPsiquica.datosPsiquicos.datosPsiquicos.psicoterapia,
                    this.areaPsiquica.datosPsiquicos.datosPsiquicos.evaluacionPsiquica,
                    this.areaPsiquica.datosPsiquicos.datosPsiquicos
                        .diagnosticoPsiquiatrico,
                    idUsoFarmaco,
                ], true);
                const idDetallesApoyoEscolar = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`DETALLES_APOYO`, 1), [this.entornoPaciente.entornoPaciente.escolaridad.detallesApoyo], this.entornoPaciente.entornoPaciente.escolaridad.apoyoEscolar);
                const idApoyoEscolaridad = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`APOYO_ESCOLARIDADES`, 2), [
                    this.entornoPaciente.entornoPaciente.escolaridad.apoyoEscolar,
                    idDetallesApoyoEscolar,
                ], true);
                const idFuncionalidadGenital = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`ANTECEDENTES_FUNCIONALIDADES_GENITAL`, 1), [
                    this.antecedentesClinicosPaciente.antecedentesClinicos
                        .detallesAntecedentesGenitales,
                ], true);
                const idPersonaAcompanante = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`PERSONAS_ACOMPANANTE`, 4), [
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
            }
            catch (err) {
                console.log(err);
                throw new Error();
            }
        });
    }
    crearTablaPrimaria(idUsuarioProfesional, fechaIngreso, borradoLogico, idPaciente, idApoyoEscolaridad, idAreaPsiquica, idFuncionalidadGenital, idHistoriasClinicas, idPersonaAcompanante, idPersonaInvolucrada, idJudicializaciones) {
        try {
            (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)(`FICHAS_TECNICAS`, 11), [
                fechaIngreso,
                borradoLogico,
                idUsuarioProfesional,
                idPaciente,
                idApoyoEscolaridad,
                idAreaPsiquica,
                idFuncionalidadGenital,
                idHistoriasClinicas,
                idPersonaAcompanante,
                idPersonaInvolucrada,
                idJudicializaciones,
            ], true);
        }
        catch (err) {
            console.log(err);
            throw new Error();
        }
    }
}
exports.FormularioRegistro = FormularioRegistro;
