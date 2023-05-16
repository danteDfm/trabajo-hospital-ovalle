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
class FichaController {
    static crearFicha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const { idPaciente } = req.params;
                const objGenero = new model_i_genero_1.IdentidadGenero(Object.assign({}, body.identidadGenero));
                const objPaciente = new model_paciente_1.Paciente();
                const idDisforia = yield objGenero.crearDisforia(body.disforia);
                const idGenero = yield objGenero.crearIdentidadGenero(idDisforia);
                yield objGenero.seleccinarPrenda(idGenero, body.prenda);
                yield objPaciente.crearDetallesPaciente(Object.assign({}, body.detallesPaciente), parseInt(idPaciente));
                const idDetalleFicha = yield model_ficha_1.Ficha.detallesFicha(body.detalleApoyo, body.funcionalidadGenital, body.detalleJuicio, body.detalleFarmaco);
                const idAreaPsiquica = yield model_ficha_1.Ficha.areasPsiquicas(Object.assign({}, body.psique), idDetalleFicha.idFarmacos);
                const idEncargada = yield model_ficha_1.Ficha.personaEncargadas(Object.assign({}, body.encargada));
                const idHistorialClinico = yield model_ficha_1.Ficha.historiasClinicas(Object.assign({}, body.antecedentes));
                const objFicha = new model_ficha_1.Ficha(body.apoyoEscolar, body.judicializacion, 1, parseInt(idPaciente), idDetalleFicha.idDetalleApoyo, idDetalleFicha.idDetalleJuicio, idAreaPsiquica, idDetalleFicha.idIndGenital, idHistorialClinico, idEncargada, idEncargada, body.date, body.borrado);
                const idFicha = yield objFicha.crearFicha();
                res.status(201).json({
                    msj: "Ficha tecnica creada",
                    idFicha: idFicha
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
