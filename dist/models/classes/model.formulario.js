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
const generaConsultas_1 = require("../../consultas/generaConsultas");
const devolucion_Id_1 = require("../../consultas/devolucion.Id");
class FormularioRegistro {
    constructor(detallesDisforia, presenciaDisforia, prendasDisconformidad, usoPrenda, historiaIdentidadGenero, antecedentesFamiliares, presenciaAntecedentes, habitosAlimenticios, habitosPaciente, usoDroga, pacientes, tiposFarmacos, usoFarmaco, areaPsiquica, apoyoEscolaridad, funcionalidadGenital, historiaClinica, personasInvolucradas, personaAcompanante, fichaTecnica) {
        this.detallesDisforia = detallesDisforia.detallesDisforia;
        this.disforia = presenciaDisforia.disforia;
        this.prenda = prendasDisconformidad.prenda;
        this.usoPrenda = usoPrenda.usoPrenda;
        this.identidadGenero = historiaIdentidadGenero.identidadGenero;
        this.orientacionSexual = historiaIdentidadGenero.orientacionSexual;
        this.inicioTransicionSexual =
            historiaIdentidadGenero.inicioTransicionSexual;
        this.tiempoLatencia = historiaIdentidadGenero.tiempoLatencia;
        this.apoyoNucleoFamilia = historiaIdentidadGenero.apoyoNucleoFamilia;
        //antecedentes Familiares
        this.detalleAntecedente = antecedentesFamiliares.detalleAntecedente;
        this.presenciaAntecedente = presenciaAntecedentes.presenciaAntecedente;
        //habitos
        this.detalleHabitoAlimenticio =
            habitosAlimenticios.detalleHabitoAlimenticio;
        this.depresoras = habitosPaciente.depresoras;
        this.alucinogenas = habitosPaciente.alucinogenas;
        this.estimulantes = habitosPaciente.estimulantes;
        this.usoDroga = usoDroga.usoDroga;
        //pacientes
        this.rutPaciente = pacientes.rutPaciente;
        this.nombrePaciente = pacientes.nombrePaciente;
        this.apellidoPaternoPaciente = pacientes.apellidoPaternoPaciente;
        this.apellidoMaternoPaciente = pacientes.apellidoMaternoPaciente;
        this.pronombre = pacientes.pronombre;
        this.nombreSocial = pacientes.nombrePaciente;
        this.fechaNacimientoPaciente = pacientes.fechaNacimientoPaciente;
        this.domicilioPaciente = pacientes.domicilioPaciente;
        //area psiquica
        this.nombreFarmaco = tiposFarmacos.nombreFarmaco;
        this.utilizacionFarmaco = usoFarmaco.utilizacionFarmaco;
        this.controlEquipoSalud = areaPsiquica.controlEquipoSalud;
        this.psicoteraia = areaPsiquica.psicoteraia;
        this.evaluacionPsiquica = areaPsiquica.evaluacionPsiquica;
        this.diagnosticoPsiquico = areaPsiquica.diagnosticoPsiquico;
        //ficha tecnica
        this.gradoEscolar = apoyoEscolaridad.gradoEscolar;
        this.gradoApoyo = apoyoEscolaridad.gradoApoyo;
        this.actorInvolucrado = apoyoEscolaridad.actorInvolucrado;
        this.detalleApoyo = apoyoEscolaridad.detalleApoyo;
        //funcionalidad genital
        this.detalleFuncionalidadGenital =
            funcionalidadGenital.detalleFuncionalidadGenital;
        //detallesClinicos Paciente
        this.detallesAntecedentesClinicos =
            historiaClinica.detallesAntecedentesClinicos;
        //involucrados
        this.rutInvolucrado = personasInvolucradas.rutInvolucrado;
        this.nombreInvolucrado = personasInvolucradas.nombreInvolucrado;
        this.apellidoPaternoInvolucrado =
            personasInvolucradas.apellidoPaternoInvolucrado;
        this.apellidoMaternoInvolucrado =
            personasInvolucradas.apellidoMaternoInvolucrado;
        this.telefonoInvolucrado = personasInvolucradas.telefonoInvolucrado;
        this.domicilioInvolucrado = personasInvolucradas.domicilioInvolucrado;
        //acompañante
        this.rutAcompanante = personaAcompanante.rutAcompanante;
        this.nombreAcompanante = personaAcompanante.nombreAcompanante;
        this.apellidoPaternoAcompanante =
            personaAcompanante.apellidoPaternoAcompanante;
        this.apellidoMaternoAcompanante =
            personaAcompanante.apellidoMaternoAcompanante;
        this.telefonoAcompanante = personaAcompanante.telefonoAcompanante;
        this.domicilioAcompanante = personaAcompanante.domicilioAcompanante;
        this.fechaIngreso = fichaTecnica.fechaIngreso;
        this.borradoLogico = fichaTecnica.borradoLogico;
    }
    detallesPaciente() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //detalles de disoforia y prendas
                const idDisforia = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("DETALLES_DISFORIA", 1, "?,"), [this.detallesDisforia], this.disforia);
                const IdPrenda = this.usoPrenda ? this.prenda : null;
                //presencia de disoforias
                const idPrensenciaDisforia = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("PRESENCIA_DISFORIA", 2, "?,"), [this.disforia, idDisforia], true);
                //uso de prendas
                const idUsoPrenda = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("USO_PRENDAS", 2, "?,"), [this.usoPrenda, IdPrenda], true);
                //sexualidad del  paciente
                const idSexualidad = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("HISTORIAS_IDENTIDADES_GENEROS", 7, "?,"), [
                    this.identidadGenero,
                    this.orientacionSexual,
                    this.inicioTransicionSexual,
                    this.tiempoLatencia,
                    this.apoyoNucleoFamilia,
                    idUsoPrenda,
                    idPrensenciaDisforia,
                ], true);
                //presencia de antecedentes familiares
                const idAntecedentesFamilia = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("ANTECEDENTES_fAMILIARES", 1, "?,"), [this.detalleAntecedente], this.presenciaAntecedente);
                const idPresenciaAntecedentes = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("PRESENCIA_ANTECEDENTES", 2, "?,"), [this.presenciaAntecedente, idAntecedentesFamilia], true);
                //habitos
                //alimeticios
                const idHabitoAlimenticio = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("HABITOS_ALIMENTICIOS", 1, "?,"), [this.detalleHabitoAlimenticio], true);
                //drogas
                const idUsoDrogas = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("USO_DROGAS", 1, "?,"), [this.usoDroga], true);
                yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("HABITOS_DROGAS", 4, "?,"), [idUsoDrogas, this.estimulantes, this.alucinogenas, this.depresoras], this.usoDroga);
                return {
                    idSexualidad,
                    idPresenciaAntecedentes,
                    idUsoDrogas,
                    idHabitoAlimenticio,
                };
            }
            catch (err) {
                return {
                    err,
                    mensaje: `ERROR EN LA CONSULTA CREAR DE LA FUNCION detallesPaciente`,
                };
            }
        });
    }
    detallesFicha(idSexualidad, idPrensenciaAntecedente, idUsoDrogas, idHabitoAlimenticio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idPaciente = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("PACIENTES", 12, "?,"), [
                    this.rutPaciente,
                    this.nombrePaciente,
                    this.apellidoPaternoPaciente,
                    this.apellidoMaternoPaciente,
                    this.pronombre,
                    this.nombreSocial,
                    this.fechaNacimientoPaciente,
                    this.domicilioPaciente,
                    idSexualidad,
                    idPrensenciaAntecedente,
                    idUsoDrogas,
                    idHabitoAlimenticio,
                ], true);
                const idUsoFarmaco = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("USO_FARMACOS", 1, "?,"), [this.utilizacionFarmaco], true);
                yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("FARMACOS", 2, "?,"), [idUsoFarmaco, this.nombreFarmaco], this.utilizacionFarmaco);
                const idAreaPsiquica = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("AREAS_PSIQUICAS", 5, "?,"), [
                    this.controlEquipoSalud,
                    this.psicoteraia,
                    this.evaluacionPsiquica,
                    this.diagnosticoPsiquico,
                    idUsoFarmaco,
                ], true);
                //apoyo escolaridad
                const idApoyoEscolar = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("APOYO_ESCOLARIDADES", 4, "?,"), [
                    this.gradoEscolar,
                    this.gradoApoyo,
                    this.actorInvolucrado,
                    this.detalleApoyo,
                ], true);
                //antecedentes funcionalidad genital
                const idFuncionalidadGenital = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("ANTECEDENTES_FUNCIONALIDADES_GENITAL", 1, "?,"), [this.detalleFuncionalidadGenital], true);
                //Historias Clinicas
                const idHistoriaClinica = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("HISTORIAS_CLINICAS", 1, "?,"), [this.detallesAntecedentesClinicos], true);
                //personas involucradas en el proceso
                const idInvolucrados = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("PERSONAS_INVOLUCRADAS_TRANSICION", 6, "?,"), [
                    this.rutInvolucrado,
                    this.nombreInvolucrado,
                    this.apellidoPaternoInvolucrado,
                    this.apellidoMaternoInvolucrado,
                    this.telefonoInvolucrado,
                    this.domicilioInvolucrado,
                ], true);
                const idAcompanante = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("PERSONAS_INVOLUCRADAS_TRANSICION", 6, "?,"), [
                    this.rutAcompanante,
                    this.nombreAcompanante,
                    this.apellidoPaternoAcompanante,
                    this.apellidoMaternoAcompanante,
                    this.telefonoAcompanante,
                    this.domicilioAcompanante,
                ], true);
                return {
                    idPaciente,
                    idAreaPsiquica,
                    idApoyoEscolar,
                    idFuncionalidadGenital,
                    idHistoriaClinica,
                    idInvolucrados,
                    idAcompanante,
                };
            }
            catch (err) {
                return {
                    err,
                    mensaje: "ERROR EN LA CONSULTA CREAR DE LA FUNCION detallesFicha",
                };
            }
        });
    }
    fichaPaciente(idPaciente, idAreaPsiquica, idApoyoEscolar, idFuncionalidadGenital, idHistoriaClinica, idInvolucrados, idAcompanante) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idFicha = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("FICHAS_TECNICAS", 9, "?,"), [
                    this.fechaIngreso,
                    this.borradoLogico,
                    idPaciente,
                    idAreaPsiquica,
                    idApoyoEscolar,
                    idFuncionalidadGenital,
                    idHistoriaClinica,
                    idInvolucrados,
                    idAcompanante,
                ], true);
                console.log(idFicha);
                return {
                    mensaje: "FICHA TECNICA CREADA",
                };
            }
            catch (err) {
                return {
                    err,
                    mensaje: "ERROR EN LA CONSULTA CREAR DE LA FUNCION idFicha",
                };
            }
        });
    }
}
exports.FormularioRegistro = FormularioRegistro;
