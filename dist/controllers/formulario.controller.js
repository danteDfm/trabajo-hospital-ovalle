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
                let objFormulario;
                const { ficha, paciente, involucrado, acompanante } = req.body;
                const { paso } = req.query;
                let pacienteTipado;
                let involucradoTipado;
                let acompananteTipado;
                if (paso === "primero" && ficha.estadoFicha) {
                    //tipado de objetos
                    pacienteTipado = paciente;
                    involucradoTipado = involucrado;
                    acompananteTipado = acompanante;
                    //creacion de entidades
                    const nuevoPaciente = new paciente_1.Paciente(pacienteTipado);
                    const nuevoInvolucrado = new personasInv_1.Involucrado(involucradoTipado);
                    const nuevoAcompanante = new personasInv_1.Involucrado(acompananteTipado);
                    objFormulario = new formulario_model_1.Formulario(nuevoPaciente, nuevoInvolucrado, nuevoAcompanante);
                    const msj = yield objFormulario.crearPrimerPaso();
                    console.log(msj);
                    return res.status(200).json(msj);
                }
                res.status(200).json("Formulario completado");
            }
            catch (err) {
                res.status(400).json({
                    msj: err.message,
                });
            }
        });
    }
}
exports.FormularioController = FormularioController;
