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
exports.RouterCrudFichaTecnica = void 0;
const model_formulario_1 = require("../models/classes/model.formulario");
class RouterCrudFichaTecnica {
    static crearFichaTecnica(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                //presencia de disforia
                const detallesDisforia = {
                    detallesDisforia: body.detallesDisforia,
                };
                const presenciaDisforia = {
                    disforia: body.disforia,
                };
                //uso de prendas
                const prendas = {
                    prenda: body.prenda,
                };
                const usoPrenda = {
                    usoPrenda: body.usoPrenda,
                };
                //identidad sexual
                const identidadSexual = {
                    identidadGenero: body.identidadGenero,
                    orientacionSexual: body.orientacionSexual,
                    inicioTransicionSexual: body.inicioTransicionSexual,
                    tiempoLatencia: body.tiempoLatencia,
                    apoyoNucleoFamilia: body.apoyoNucleoFamilia,
                };
                //antecedentes familiares
                const antecedentesFamiliares = {
                    detalleAntecedente: body.detallesAntecedentes,
                };
                const presenciaAntecedente = {
                    presenciaAntecedente: body.presenciaAntecedentes,
                };
                //habitos Alimenticios
                const habitosAlimenticios = {
                    detalleHabitoAlimenticio: body.detalleHabitoAlimenticio,
                };
                //drogas
                const habitosPaciente = {
                    depresoras: body.depresoras,
                    alucinogenas: body.alucinogenas,
                    estimulantes: body.estimulantes,
                };
                const usoDroga = {
                    usoDroga: body.usoDroga,
                };
                const pacientes = {
                    rutPaciente: body.rutPaciente,
                    nombrePaciente: body.nombrePaciente,
                    apellidoPaternoPaciente: body.apellidoPaternoPaciente,
                    apellidoMaternoPaciente: body.apellidoMaternoPaciente,
                    pronombre: body.pronombre,
                    nombreSocial: body.nombreSocial,
                    fechaNacimientoPaciente: body.fechaNacimientoPaciente,
                    domicilioPaciente: body.domicilioPaciente,
                };
                //area psiquica
                const tiposFarmacos = {
                    nombreFarmaco: body.nombreFarmaco,
                };
                const usoFarmaco = {
                    utilizacionFarmaco: body.utilizacionFarmaco,
                };
                const areaPsiquica = {
                    controlEquipoSalud: body.controlEquipoSalud,
                    psicoteraia: body.psicoteraia,
                    evaluacionPsiquica: body.evaluacionPsiquica,
                    diagnosticoPsiquico: body.diagnosticoPsiquico,
                };
                const apoyoEscolaridad = {
                    gradoEscolar: body.gradoEscolar,
                    gradoApoyo: body.gradoApoyo,
                    actorInvolucrado: body.actorInvolucrado,
                    detalleApoyo: body.detalleApoyo
                };
                const funcionalidadGenital = {
                    detalleFuncionalidadGenital: body.funcionGenital
                };
                const historiaClinica = {
                    detallesAntecedentesClinicos: body.historiaClinicaP
                };
                const personaInvolucrada = {
                    rutInvolucrado: body.rutInvolucrado,
                    nombreInvolucrado: body.nombreInvolucrado,
                    apellidoPaternoInvolucrado: body.apellidoPInvolucrado,
                    apellidoMaternoInvolucrado: body.apellidoMInvolucrado,
                    telefonoInvolucrado: body.telefonoInvolucrado,
                    domicilioInvolucrado: body.domicilioInvolucrado
                };
                const personaAcompanante = {
                    rutAcompanante: body.rutAcompanante,
                    nombreAcompanante: body.nombreAcompanante,
                    apellidoPaternoAcompanante: body.apellidoPAcompanante,
                    apellidoMaternoAcompanante: body.apellidoMAcompanante,
                    telefonoAcompanante: body.telefonoAcompanante,
                    domicilioAcompanante: body.domicilioAcompanante
                };
                const fichaTecnica = {
                    fechaIngreso: body.fechaIngreso,
                    borradoLogico: body.borradoLogico
                };
                const objFormulario = new model_formulario_1.FormularioRegistro(detallesDisforia, presenciaDisforia, prendas, usoPrenda, identidadSexual, antecedentesFamiliares, presenciaAntecedente, habitosAlimenticios, habitosPaciente, usoDroga, pacientes, tiposFarmacos, usoFarmaco, areaPsiquica, apoyoEscolaridad, funcionalidadGenital, historiaClinica, personaInvolucrada, personaAcompanante, fichaTecnica);
                const idsPaciente = yield objFormulario.detallesPaciente();
                const objFicha = yield objFormulario.detallesFicha(idsPaciente.idSexualidad, idsPaciente.idPresenciaAntecedentes, idsPaciente.idUsoDrogas, idsPaciente.idHabitoAlimenticio);
                const mensaje = yield objFormulario.fichaPaciente(objFicha.idPaciente, objFicha.idApoyoEscolar, objFicha.idAreaPsiquica, objFicha.idFuncionalidadGenital, objFicha.idHistoriaClinica, objFicha.idInvolucrados, objFicha.idAcompanante);
                res.json({
                    mensaje: mensaje,
                });
            }
            catch (err) {
                res.json({
                    error: err,
                    mensaje: "LOS DATOS NO HAN SIDO CREADOS",
                });
            }
        });
    }
}
exports.RouterCrudFichaTecnica = RouterCrudFichaTecnica;
