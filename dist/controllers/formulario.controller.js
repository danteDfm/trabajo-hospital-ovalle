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
//clase principal
const formulario_model_1 = require("../models/classes/formulario.model");
//clases
const paciente_1 = require("../models/classes/entidades_dbs/paciente");
const personasInv_1 = require("../models/classes/entidades_dbs/personasInv");
class FormularioController {
    static guardarFichaTecnica(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { paciente, involucrado, acompanante } = req.body;
                const { paso } = req.query;
                //tipado de objetos
                const pacienteTipado = paciente;
                const involucradoTipado = involucrado;
                const acompananteTipado = acompanante;
                const nuevoPaciente = new paciente_1.Paciente(pacienteTipado);
                const nuevoInvolucrado = new personasInv_1.Involucrado(involucradoTipado);
                const nuevoAcompanante = new personasInv_1.Involucrado(acompananteTipado);
                const objFormulario = new formulario_model_1.Formulario(nuevoPaciente, nuevoInvolucrado, nuevoAcompanante);
                objFormulario.crearPrimerPaso();
                if (paso === "primero")
                    return res.status(200).json("primer paso completado");
                res.status(200).json("Formulario completado");
            }
            catch (err) {
                res.json(err);
            }
        });
    }
}
exports.FormularioController = FormularioController;
