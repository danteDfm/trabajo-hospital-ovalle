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
const objPaciente = new model_paciente_1.Paciente();
class PacienteController {
    constructor() { }
    static dataPaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataPaciente = yield objPaciente.traerDataPaciente();
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
    static traerXRutController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataXrut = yield objPaciente.traerXRut(req.body.rut);
                res.status(201).json(dataXrut);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({
                    err,
                    msj: "Error interno del servidor"
                });
            }
        });
    }
}
exports.PacienteController = PacienteController;
