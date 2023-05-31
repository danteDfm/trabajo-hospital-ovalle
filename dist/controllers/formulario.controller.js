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
const formulario_model_1 = require("../models/classes/formulario.model");
const paciente_1 = require("../models/classes/entidades_dbs/paciente");
class FormularioController {
    static guardarFichaTecnica(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { paciente } = req.body;
                const pacienteTipado = paciente;
                const nuevoPaciente = new paciente_1.Paciente(pacienteTipado);
                console.log(nuevoPaciente);
                const objForm = new formulario_model_1.Formulario(nuevoPaciente);
                console.log(objForm.paciente);
                res.json("hola");
            }
            catch (err) {
                res.json(err);
            }
        });
    }
}
exports.FormularioController = FormularioController;
