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
exports.PacienteController = void 0;
const model_paciente_1 = require("../models/classes/entidades_database/model.paciente");
class PacienteController {
    constructor() { }
    static crearPaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const objPaciente = new model_paciente_1.Paciente(body.paciente);
                yield objPaciente.crearPaciente();
                res.status(201).json({
                    msj: "Usuario creado correctamente",
                });
            }
            catch (err) {
                res.status(500).json({
                    err,
                    msj: "Error interno del servidor"
                });
            }
        });
    }
    static dataPaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataPaciente = yield model_paciente_1.Paciente.traerDataPaciente();
                res.status(201).json(dataPaciente);
            }
            catch (err) {
                res.status(500).json({
                    err,
                    msj: "Error interno del servidor"
                });
            }
        });
    }
}
exports.PacienteController = PacienteController;
