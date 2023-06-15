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
exports.FichasController = void 0;
const fichas_model_1 = require("../models/classes/fichas.model");
const objFicha = new fichas_model_1.Fichas();
class FichasController {
    static fichaActiva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idFicha } = req.params;
            try {
                const fichaActiva = yield objFicha.listarFichaActiva(parseInt(idFicha));
                return res.status(201).json({
                    fichaActiva,
                });
            }
            catch (err) {
                return res.status(500).json({
                    err,
                    msj: "Error interno del servidor",
                });
            }
        });
    }
    static fichaInactiva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idPaciente } = req.params;
            try {
                const fichasInactivas = yield objFicha.listarFichasInactivas(parseInt(idPaciente));
                return res.status(201).json(fichasInactivas);
            }
            catch (err) {
                res.status(500).json({
                    err,
                    msj: "Error interno del servidor",
                });
            }
        });
    }
}
exports.FichasController = FichasController;