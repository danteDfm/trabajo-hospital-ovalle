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
exports.FormularioController = void 0;
const primer_paso_model_1 = require("../models/classes/formulario/primer.paso.model");
const espesificarFecha_1 = require("../utils/espesificarFecha");
const segundo_paso_model_1 = require("../models/classes/formulario/segundo.paso.model");
const tercer_paso_model_1 = require("../models/classes/formulario/tercer.paso.model");
const cuarto_paso_model_1 = require("../models/classes/formulario/cuarto.paso.model");
const dicQuery_1 = require("../consultas/dicQuery");
class FormularioController {
    static primerPasoController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idUsuario } = req.params;
                const { paciente, involucrado, acompanante, fichas } = req.body;
                fichas.fechaIngreso = (0, espesificarFecha_1.fechaExacta)();
                const fichaTipada = paciente;
                const primerPasoTipado = {
                    involucrado,
                    acompanante,
                };
                let objPrimerPaso = new primer_paso_model_1.FormularioPrimerPaso(primerPasoTipado, fichaTipada);
                objPrimerPaso.comprobarVariables();
                const idPrimerPaso = yield objPrimerPaso.guardarPrimerPaso();
                const idPaciente = yield objPrimerPaso.crearPaciente();
                const ficha = yield objPrimerPaso.crearFicha(dicQuery_1.primerPaso, [
                    fichas.fechaIngreso,
                    fichas.estadoFicha,
                    fichas.borradoLogico,
                    fichas.nivel,
                    idPaciente,
                    idUsuario,
                    idPrimerPaso.idInvolucrado,
                    idPrimerPaso.idAcompanante,
                ]);
                return res.status(200).json(ficha);
            }
            catch (error) {
                console.log(error);
                if (error.code == 100) {
                    return res.status(400).json(error.msj);
                }
                return res.status(500).json("Error interno del servidor");
            }
        });
    }
    static segundoPasoController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { genero, involucrado, acompanante, paciente, fichas, prendas } = req.body;
                const { idUsuario } = req.params;
                const { idPaciente, idFicha, pasoDinamico } = req.query;
                let idsPrimero;
                fichas.fechaIngreso = (0, espesificarFecha_1.fechaExacta)();
                const historiaGeneroTipada = genero;
                const primerPasoTipado = {
                    involucrado,
                    acompanante,
                };
                const fichaTipada = paciente;
                const objSegundoPaso = new segundo_paso_model_1.FormularioSegundoPaso(historiaGeneroTipada, primerPasoTipado, fichaTipada, prendas);
                switch (pasoDinamico) {
                    case "caso1":
                        //en caso de no entrar al if se crean nuevos campos
                        objSegundoPaso.comprobarVariables();
                        const idDbs = yield objSegundoPaso.crearPaciente();
                        idsPrimero = yield objSegundoPaso.guardarPrimerPaso();
                        yield objSegundoPaso.crearSegundoPaso(idDbs);
                        const msj = yield objSegundoPaso.crearFicha(dicQuery_1.diccSegundoPaso.case1, [
                            fichas.fechaIngreso,
                            fichas.estadoFicha,
                            fichas.borradoLogico,
                            fichas.nivel,
                            idDbs,
                            idUsuario,
                            idsPrimero.idInvolucrado,
                            idsPrimero.idAcompanante,
                        ]);
                        return res.status(200).send(msj);
                    case "caso2":
                        objSegundoPaso.crearSegundoPaso(parseInt(idPaciente));
                        const msj2 = yield objSegundoPaso.crearFicha(dicQuery_1.diccSegundoPaso.case2, [
                            fichas.fechaIngreso,
                            fichas.nivel,
                            idFicha,
                        ]);
                        return res.status(200).send(msj2);
                    default:
                        return res.status(200).send("no se encontraaron coincidencias");
                }
            }
            catch (error) {
                console.log(error);
                if (error.code == 100) {
                    return res.status(400).json(error.msj);
                }
                return res.status(500).json("Error interno del servidor");
            }
        });
    }
    static tercerPasoController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fichas, paciente, dieta, involucrado, acompanante, areaPsiquica, historialDrogas, genero, prendas, } = req.body;
            const { idFicha, idPaciente } = req.query;
            const { pasoDinamico } = req.params;
            const { idUsuario } = req.params;
            fichas.fechaIngreso = (0, espesificarFecha_1.fechaExacta)();
            //usar interfaces para tipar los objetos
            const historiaGeneroTipada = genero;
            const areaPsiquicaTipada = areaPsiquica;
            const primerPasoTipado = {
                involucrado,
                acompanante,
            };
            const fichaTipada = paciente;
            const objTercer = new tercer_paso_model_1.FormularioTercerPaso(areaPsiquicaTipada, historialDrogas.usoDroga, historialDrogas.detallesDroga, dieta, historiaGeneroTipada, primerPasoTipado, fichaTipada, prendas);
            try {
                switch (pasoDinamico) {
                    case "caso1":
                        objTercer.comprobarVariables();
                        const idPacient = yield objTercer.crearPaciente();
                        const idprimer = yield objTercer.guardarPrimerPaso();
                        yield objTercer.crearSegundoPaso(idPacient);
                        const idTercer = yield objTercer.crearTercerPaso(idPacient);
                        const msj1 = yield objTercer.crearFicha(dicQuery_1.diccTercerPaso.case1, [
                            fichas.fechaIngreso,
                            fichas.borradoLogico,
                            fichas.estadoFicha,
                            fichas.nivel,
                            fichas.apoyoEscolar,
                            fichas.detallesApoyo,
                            idPacient,
                            idUsuario,
                            idTercer.idAreaPsiquica,
                            idprimer.idInvolucrado,
                            idprimer.idAcompanante,
                        ]);
                        res.status(201).json(msj1);
                    case "caso2":
                        console.log("segundo caso");
                        objTercer.crearSegundoPaso(parseInt(idPaciente));
                        const idTercerPaso2 = yield objTercer.crearTercerPaso(parseInt(idPaciente));
                        const msj2 = yield objTercer.crearFicha(dicQuery_1.diccTercerPaso.case2, [
                            fichas.fechaIngreso,
                            fichas.nivel,
                            fichas.apoyoEscolar,
                            fichas.detallesApoyo,
                            idTercerPaso2.idAreaPsiquica,
                            idFicha,
                        ]);
                        return res.status(201).json(msj2);
                    case "caso3":
                        const idTercerPaso = yield objTercer.crearTercerPaso(parseInt(idPaciente));
                        const msj = yield objTercer.crearFicha(dicQuery_1.diccTercerPaso.case3, [
                            fichas.fechaIngreso,
                            fichas.nivel,
                            fichas.apoyoEscolar,
                            fichas.detallesApoyo,
                            idTercerPaso.idAreaPsiquica,
                            idFicha,
                        ]);
                        return res.status(200).json(msj);
                    default:
                        return res.status(200).send("no han habido coincidencias");
                }
            }
            catch (err) {
                return res.status(500).json("Error interno del servidor");
            }
        });
    }
    static cuartoPasoController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pasoDinamico, idUsuario } = req.params;
            const { fichas, paciente, antecedentes, dieta, involucrado, acompanante, areaPsiquica, historialDrogas, genero, prendas, } = req.body;
            fichas.fechaIngreso = (0, espesificarFecha_1.fechaExacta)();
            const historiaGeneroTipada = genero;
            const areaPsiquicaTipada = areaPsiquica;
            const antecedentesTipado = antecedentes;
            const primerPasoTipado = {
                involucrado,
                acompanante,
            };
            const fichaTipada = paciente;
            const objCuarto = new cuarto_paso_model_1.FormularioCuartoPaso(antecedentesTipado, areaPsiquicaTipada, historialDrogas.usoDroga, historialDrogas.detallesDroga, dieta, historiaGeneroTipada, primerPasoTipado, fichaTipada, prendas);
            try {
                switch (pasoDinamico) {
                    case "caso1":
                        try {
                            console.log("caso 1");
                            objCuarto.comprobarVariables();
                            const idsPaciente = yield objCuarto.crearPaciente();
                            const idsPrimerPaso = yield objCuarto.guardarPrimerPaso();
                            yield objCuarto.crearSegundoPaso(idsPaciente);
                            const idsTercerPaso = yield objCuarto.crearTercerPaso(idsPaciente);
                            const idsCuartoPaso = yield objCuarto.crearCuartoPaso();
                            const msj4 = yield objCuarto.crearFicha(dicQuery_1.diccCuartoPaso.crearPrimerPaso, [
                                fichas.fechaIngreso,
                                fichas.estadoFicha,
                                fichas.nivel,
                                fichas.apoyoEscolar,
                                fichas.judicializacion,
                                fichas.detallesApoyo,
                                fichas.detallesJudicializacion,
                                idsPaciente,
                                idUsuario,
                                idsTercerPaso.idAreaPsiquica,
                                idsCuartoPaso,
                                idsPrimerPaso.idInvolucrado,
                                idsPrimerPaso.idAcompanante,
                            ]);
                            return res.status(200).send(msj4);
                        }
                        catch (err) {
                            return res.status(400).send({
                                err,
                                msj: "Error interno del servidor",
                            });
                        }
                    default:
                        return res.status(200).send("sin coincidencias");
                }
            }
            catch (err) {
                return res.status(500).json("Error interno del servidor");
            }
        });
    }
    static actualizarForm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let objCuartoPaso;
            const { paciente, involucrado, acompanante, historiaGenero, detallesPrendas, areaPsiquica, detallesDieta, antecedentes, } = req.body;
            try {
                console.log(req.idTablas);
                const pacienteTipado = paciente;
                const primerPasoTipado = {
                    involucrado,
                    acompanante,
                };
                const generoTipado = historiaGenero;
                const areaPsiquicaTipada = areaPsiquica;
                const antecentesTipado = antecedentes;
                res.send("hola mundo");
            }
            catch (err) {
                console.log(err);
                res.status(400).json({
                    err,
                    msj: "Error interno del servidor",
                });
            }
        });
    }
}
exports.FormularioController = FormularioController;
