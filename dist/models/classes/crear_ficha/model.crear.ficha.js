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
exports.CrearFormulario = void 0;
const generaConsultas_1 = require("../../../utils/generaConsultas");
const devolucion_Id_1 = require("../../../consultas/devolucion.Id");
const model_formulario_1 = require("./model.formulario");
class CrearFormulario extends model_formulario_1.FormularioRegistro {
    constructor() {
        super();
    }
    static objClassTablas() {
        return new CrearFormulario();
    }
    //tablas cardinalidad muchos a muchos 
    crearPrenda(prendas) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idUsoPrenda = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("USO_PRENDAS", 1), [this.usoPrenda], true);
                prendas.map((data) => __awaiter(this, void 0, void 0, function* () {
                    yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("SELECCION_PRENDA", 2), [idUsoPrenda, data], this.usoPrenda);
                }));
                return idUsoPrenda;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    usoDrogas(drogas) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idUsoDrogas = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("USO_DROGAS", 1), [this.usoDroga], true);
                //tipo de droga
                for (let i = 0; i < 3; i++) {
                    yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("HABITOS_DROGAS", 4), [
                        idUsoDrogas,
                        drogas.estimulantes[i],
                        drogas.alucinogenas[i],
                        drogas.depresoras[i],
                    ], this.usoDroga);
                }
                return idUsoDrogas;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    usoFarmacos(farmacos) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //uso de farmacos
                const idUsoFarmaco = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("USO_FARMACOS", 1), [this.utilizacionFarmaco], true);
                //tipo de farmacos
                farmacos.map((data) => __awaiter(this, void 0, void 0, function* () {
                    yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("FARMACOS", 2), [idUsoFarmaco, data], this.utilizacionFarmaco);
                }));
                return idUsoFarmaco;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    //tablas opcionales y que llevan datos o null
    crearTablasTerciarias(disforia) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //tabla detalles disforia
                const idDisforia = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("DETALLES_DISFORIA", 1), [disforia], this.disforia);
                //antecedentes clinicos familiares
                const idAntecedentesFamilia = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("ANTECEDENTES_fAMILIARES", 1), [this.detalleAntecedente], this.presenciaAntecedente);
                return {
                    idDisforia,
                    idAntecedentesFamilia,
                };
            }
            catch (err) {
                console.log(`ERROR EN LA CONSULTAS TERCIARIAS ${err}`);
                throw err;
            }
        });
    }
    //tablas que se deberian registrar si o si 
    crearTablasSecundarias(idUsoPrenda, idUsoFarmaco, idAntecedentesFamilia, idDisforia) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //presencia de disoforias
                const idPrensenciaDisforia = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("PRESENCIA_DISFORIA", 2), [this.disforia, idDisforia], true);
                //presencia de antecedentes familiares
                const idPresenciaAntecedentes = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("PRESENCIA_ANTECEDENTES", 2), [this.presenciaAntecedente, idAntecedentesFamilia], true);
                //habitos alimenticios segura
                const idHabitoAlimenticio = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("HABITOS_ALIMENTICIOS", 1), [this.detalleHabitoAlimenticio], true);
                //sexualidad del  paciente
                const idSexualidad = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("HISTORIAS_IDENTIDADES_GENEROS", 7), [
                    this.identidadGenero,
                    this.orientacionSexual,
                    this.inicioTransicionSexual,
                    this.tiempoLatencia,
                    this.apoyoNucleoFamilia,
                    idUsoPrenda,
                    idPrensenciaDisforia,
                ], true);
                //personas involucradas en el proceso
                const idInvolucrados = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("PERSONAS_INVOLUCRADAS_TRANSICION", 6), [
                    this.rutInvolucrado,
                    this.nombreInvolucrado,
                    this.apellidoPaternoInvolucrado,
                    this.apellidoMaternoInvolucrado,
                    this.telefonoInvolucrado,
                    this.domicilioInvolucrado,
                ], true);
                //personas involucradas en la transicion
                const idAcompanante = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("PERSONAS_ACOMPANANTES", 2), [this.rutAcompanante, this.nombreAcompanante], true);
                //detalles del estado mental del paciente
                const idAreaPsiquica = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("AREAS_PSIQUICAS", 5), [
                    this.controlEquipoSalud,
                    this.psicoteraia,
                    this.evaluacionPsiquica,
                    this.diagnosticoPsiquico,
                    idUsoFarmaco,
                ], true);
                //apoyo del colegio u entorno escolar
                const idApoyoEscolar = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("APOYO_ESCOLARIDADES", 4), [
                    this.gradoEscolar,
                    this.gradoApoyo,
                    this.actorInvolucrado,
                    this.detalleApoyo,
                ], true);
                //antecedentes funcionalidad genital
                const idFuncionalidadGenital = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("ANTECEDENTES_FUNCIONALIDADES_GENITAL", 1), [this.detalleFuncionalidadGenital], true);
                //Historias Clinicas
                const idHistoriaClinica = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("HISTORIAS_CLINICAS", 1), [this.detallesAntecedentesClinicos], true);
                return {
                    idSexualidad,
                    idInvolucrados,
                    idHistoriaClinica,
                    idFuncionalidadGenital,
                    idApoyoEscolar,
                    idAreaPsiquica,
                    idAcompanante,
                    idHabitoAlimenticio,
                    idPresenciaAntecedentes,
                };
            }
            catch (err) {
                console.log(`ERROR EN LA CONSULTAS SECUNDARIAS ${err}`);
                throw err;
            }
        });
    }
    //tablas mas fuertes de la base de datos
    crearTablasPrimaria(idSexualidad, idPrensenciaAntecedente, idUsoDrogas, idHabitoAlimenticio, idAreaPsiquica, idApoyoEscolar, idFuncionalidadGenital, idHistoriaClinica, idInvolucrados, idAcompanante) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idPaciente = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("PACIENTES", 12), [
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
                const idFicha = yield (0, devolucion_Id_1.devolucionId)((0, generaConsultas_1.generadorConsultas)("FICHAS_TECNICAS", 10), [
                    this.fechaIngreso,
                    this.borradoLogico,
                    2,
                    idPaciente,
                    idApoyoEscolar,
                    idAreaPsiquica,
                    idFuncionalidadGenital,
                    idHistoriaClinica,
                    idAcompanante,
                    idInvolucrados,
                ], true);
            }
            catch (err) {
                console.log(`ERROR EN LA CONSULTAS PRIMARIAS ${err}`);
                throw err;
            }
        });
    }
}
exports.CrearFormulario = CrearFormulario;
