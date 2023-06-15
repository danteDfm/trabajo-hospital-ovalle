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
const ficha_model_1 = require("../models/classes/ficha.model");
const fichas_model_1 = require("../models/classes/fichas.model");
const objFicha = new ficha_model_1.Ficha();
const objFichas = new fichas_model_1.Fichas();
class FormularioController {
    static buscarFichaPaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rutPaciente } = req.params;
                const dataFicha = yield objFichas.listarInformacionPaciente(rutPaciente);
                res.status(400).json(dataFicha);
            }
            catch (err) {
                res.status(400).json({
                    err,
                    msj: "Error interno del servidor",
                });
            }
        });
    }
    //este endpoint se ejecuta solo si crear o actualiza en el primer paso;
    static primerPasoController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario } = req.params;
            const { paciente, involucrado, acompanante, ficha } = req.body;
            let idParsUsuario = parseInt(idUsuario);
            try {
                //verifica en que nivel esta el paciente
                let rutPaciente = paciente.rutPaciente;
                yield objFicha.verificarEstado(rutPaciente);
                let fechaIngreso = (0, espesificarFecha_1.fechaExacta)();
                let nivel = 1;
                const fichaTipada = paciente;
                const primerPasoTipado = {
                    involucrado,
                    acompanante,
                };
                let objPrimerPaso = new primer_paso_model_1.FormularioPrimerPaso(primerPasoTipado, fichaTipada);
                const idPrimerPaso = yield objPrimerPaso.guardarPrimerPaso();
                const idPaciente = yield objPrimerPaso.crearPaciente();
                objFicha.constructo(fechaIngreso, nivel, idPaciente, idParsUsuario, idPrimerPaso.idInvolucrado, idPrimerPaso.idAcompanante);
                const msj = yield objFicha.crearFicha();
                return res.status(200).json(msj);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    error,
                    msj: "Error interno del servidro",
                });
            }
        });
    }
    static segundoPasoController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { genero, involucrado, acompanante, paciente, prendas, ficha } = req.body;
            const { idUsuario } = req.params;
            const { idFicha, idPaciente } = req.query;
            let fechaIngreso;
            let nivel = 2;
            let idPrimero;
            let idParsUsuario = parseInt(idUsuario);
            let idParsFicha = parseInt(idFicha);
            let idParsPaciente = parseInt(idPaciente);
            try {
                fechaIngreso = (0, espesificarFecha_1.fechaExacta)();
                const historiaGeneroTipada = genero;
                const primerPasoTipado = {
                    involucrado,
                    acompanante,
                };
                const fichaTipada = paciente;
                const objSegundoPaso = new segundo_paso_model_1.FormularioSegundoPaso(historiaGeneroTipada, primerPasoTipado, fichaTipada, prendas);
                if (idFicha && idParsPaciente > 0) {
                    yield objSegundoPaso.crearSegundoPaso(idParsPaciente);
                    objFicha.constructo(fechaIngreso, nivel);
                    const msj = yield objFicha.actualizarFicha(fechaIngreso, nivel, idParsFicha);
                    return res.status(200).send(msj);
                }
                let rutPaciente = paciente.rutPaciente;
                yield objFicha.verificarEstado(rutPaciente);
                const idPaciente = yield objSegundoPaso.crearPaciente();
                idPrimero = yield objSegundoPaso.guardarPrimerPaso();
                yield objSegundoPaso.crearSegundoPaso(idPaciente);
                objFicha.constructo(fechaIngreso, nivel, idPaciente, idParsUsuario, idPrimero.idInvolucrado, idPrimero.idAcompanante);
                const msj = yield objFicha.crearFicha();
                return res.status(200).send(msj);
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
            let fechaIngreso;
            let nivel = 3;
            const { idFicha, idPaciente } = req.query;
            const { idUsuario } = req.params;
            fechaIngreso = (0, espesificarFecha_1.fechaExacta)();
            const historiaGeneroTipada = genero;
            const areaPsiquicaTipada = areaPsiquica;
            const primerPasoTipado = {
                involucrado,
                acompanante,
            };
            const fichaTipada = paciente;
            const objTercer = new tercer_paso_model_1.FormularioTercerPaso(areaPsiquicaTipada, historialDrogas.usoDroga, historialDrogas.detallesDroga, dieta, historiaGeneroTipada, primerPasoTipado, fichaTipada, prendas);
            try {
                if (!paciente && !acompanante && !involucrado) {
                    let idPacientePars = parseInt(idPaciente);
                    objTercer.crearSegundoPaso(idPacientePars);
                    return res.status(201).json();
                }
                if (!areaPsiquica && !dieta) {
                }
                const idPacient = yield objTercer.crearPaciente();
                const idprimer = yield objTercer.guardarPrimerPaso();
                yield objTercer.crearSegundoPaso(idPacient);
                const idTercer = yield objTercer.crearTercerPaso(idPacient);
                res.status(200).json("hola mundo");
            }
            catch (err) {
                return res.status(500).json("Error interno del servidor");
            }
        });
    }
    static cuartoPasoController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pasoDinamico, idUsuario } = req.params;
            let fechaIngreso;
            let estadoFicha = 1;
            let nivel = 4;
            const { fichas, paciente, antecedentes, dieta, involucrado, acompanante, areaPsiquica, historialDrogas, genero, prendas, } = req.body;
            fechaIngreso = (0, espesificarFecha_1.fechaExacta)();
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
                const idsPaciente = yield objCuarto.crearPaciente();
                const idsPrimerPaso = yield objCuarto.guardarPrimerPaso();
                yield objCuarto.crearSegundoPaso(idsPaciente);
                const idsTercerPaso = yield objCuarto.crearTercerPaso(idsPaciente);
                const idsCuartoPaso = yield objCuarto.crearCuartoPaso();
                return res.status(200).send();
            }
            catch (err) {
                return res.status(500).json("Error interno del servidor");
            }
        });
    }
    static crearFichaTecnica(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fichas, paciente, dieta, antecedentes, involucrado, acompanante, areaPsiquica, historialDrogas, genero, prendas, } = req.body;
            const nivel = parseInt(req.query.nivel);
            const idUsuario = parseInt(req.params.idUsuario);
            let fechaIngreso;
            let estado = true;
            fechaIngreso = (0, espesificarFecha_1.fechaExacta)();
            const historiaGeneroTipada = genero;
            const areaPsiquicaTipada = areaPsiquica;
            const antecedentesTipado = antecedentes;
            const primerPasoTipado = {
                involucrado,
                acompanante,
            };
            const fichaTipada = paciente;
            const objCuarto = new cuarto_paso_model_1.FormularioCuartoPaso(antecedentesTipado, areaPsiquicaTipada, historialDrogas.usoDroga, historialDrogas.detallesDroga, dieta, historiaGeneroTipada, primerPasoTipado, fichaTipada, prendas);
            console.log(fechaIngreso);
            try {
                const idPaciente = yield objCuarto.crearPaciente();
                const idPrimerPaso = yield objCuarto.guardarPrimerPaso();
                objCuarto.crearSegundoPaso(idPaciente);
                const idTecerPaso = yield objCuarto.crearTercerPaso(idPaciente);
                const idCuartoPaso = yield objCuarto.crearCuartoPaso();
                console.log(fichas);
                const objFichas = new ficha_model_1.Ficha(fechaIngreso, nivel, fichas.apoyoEscolar, fichas.judicializacion, fichas.detallesApoyo, fichas.detallesJudicializacion, idPaciente, idUsuario, idTecerPaso.idAreaPsiquica, idCuartoPaso, idPrimerPaso.idInvolucrado, idPrimerPaso.idAcompanante);
                const msj = yield objFichas.crearFichaTecnica(true);
                res.status(201).json(msj);
            }
            catch (err) {
                res.status(201).json({
                    err,
                    msj: "Error interno del servidor"
                });
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
