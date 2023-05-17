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
exports.FichaController = void 0;
const model_paciente_1 = require("../models/classes/entidades_database/model.paciente");
const model_i_genero_1 = require("../models/classes/entidades_database/model.i.genero");
const model_ficha_1 = require("../models/classes/entidades_database/model.ficha");
const objFicha = new model_ficha_1.Ficha();
const objGenero = new model_i_genero_1.IdentidadGenero();
const objPaciente = new model_paciente_1.Paciente();
class FichaController {
    static fichaPaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataFicha = yield objPaciente.mostrarPacienteFicha(req.params.rutPaciente);
                res.status(200).json(dataFicha);
            }
            catch (err) {
                res.status(500).json({
                    err,
                    msj: "Error interno del servidor"
                });
            }
        });
    }
    static crearDetallesPaciente(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const idDisforia = yield objGenero.crearDisforia(body.disforia);
                const idGenero = yield objGenero.crearIdentidadGenero(Object.assign({}, body.identidadGenero), idDisforia);
                yield objGenero.seleccinarPrenda(idGenero, body.prenda);
                const idDetPaciente = yield objPaciente.crearDetallesPaciente(Object.assign({}, body.detallesPaciente));
                const idPaciente = yield objPaciente.crearPaciente(idGenero, idDetPaciente.idAFamilia, idDetPaciente.idDrogas, idDetPaciente.idAlimenticio, body.paciente);
                req.idPaciente = idPaciente;
                req.saludo = "hola mundo";
                next();
            }
            catch (err) {
                res.status(500).json({
                    err,
                    msj: "Error interno del servidor",
                });
            }
        });
    }
    static crearDetallesFicha(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const idDetalleFicha = yield model_ficha_1.Ficha.detallesFicha(body.detalleApoyo, body.funcionalidadGenital, body.detalleJuicio, body.detalleFarmaco);
                const idAreaPsiquica = yield model_ficha_1.Ficha.areasPsiquicas(Object.assign({}, body.psique), idDetalleFicha.idFarmacos);
                const idEncargada = yield model_ficha_1.Ficha.personaEncargadas(Object.assign({}, body.encargada));
                const idAcompanante = yield model_ficha_1.Ficha.personaEncargadas(Object.assign({}, body.acompanante));
                const idHistorialClinico = yield model_ficha_1.Ficha.historiasClinicas(Object.assign({}, body.antecedentes));
                req.idDetallesFicha = {
                    idDetalleFicha,
                    idAreaPsiquica,
                    idEncargada,
                    idHistorialClinico,
                    idAcompanante
                };
                next();
            }
            catch (err) {
                res.status(500).json({
                    err,
                    msj: "Error interno del servidor",
                });
            }
        });
    }
    static crearFicha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const { idUsuario } = req.params;
                const idPaciente = req.idPaciente;
                const idDetallesFicha = req.idDetallesFicha;
                const idFicha = yield objFicha.crearFicha(body.apoyoEscolar, body.judicializacion, parseInt(idUsuario), parseInt(idPaciente), idDetallesFicha.idDetalleFicha.idDetalleApoyo, idDetallesFicha.idDetalleFicha.idDetalleJuicio, idDetallesFicha.idAreaPsiquica, idDetallesFicha.idDetalleFicha.idIndGenital, idDetallesFicha.idHistorialClinico, idDetallesFicha.idEncargada, idDetallesFicha.idAcompanante, body.date, body.borrado);
                res.status(201).send({
                    msj: "Ficha tecnica creada",
                    idFicha: idFicha,
                });
            }
            catch (err) {
                res.status(201).json({
                    err,
                    msj: "Error interno del servidor",
                });
            }
        });
    }
}
exports.FichaController = FichaController;
