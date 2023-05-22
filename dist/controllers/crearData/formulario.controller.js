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
const formulario_1 = require("../../models/classes/entidades/formulario");
const paciente_1 = require("../../models/classes/entidades/models_dbs/paciente");
const ficha_1 = require("../../models/classes/entidades/models_dbs/ficha");
const prendas_1 = require("../../models/classes/entidades/models_dbs/prendas");
const historiaGenero_1 = require("../../models/classes/entidades/models_dbs/historiaGenero");
const areaPsiquica_1 = require("../../models/classes/entidades/models_dbs/areaPsiquica");
const personasInv_1 = require("../../models/classes/entidades/models_dbs/personasInv");
const antecedentesCli_1 = require("../../models/classes/entidades/models_dbs/antecedentesCli");
class FormularioController {
    static crearFormulario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { ficha, antecedentesClinicos, personasInv, personasAcom, AreaPsiquica, paciente, historiaGenero, prendaYdieta, } = req.body;
                const { idUsuario } = req.params;
                const pacienteTipado = paciente;
                const fichaTipada = ficha;
                const PrendaTipada = prendaYdieta;
                const GeneroTipado = historiaGenero;
                const psiqueTipado = AreaPsiquica;
                const encargado = personasInv;
                const acompanante = personasAcom;
                const antecedentes = antecedentesClinicos;
                let dataPaciente = new paciente_1.Paciente(pacienteTipado);
                let dataFicha = new ficha_1.Ficha(fichaTipada);
                let dataPrenda = new prendas_1.PrendaDieta(PrendaTipada);
                let dataHistoriaGen = new historiaGenero_1.HistoriaGenero(GeneroTipado);
                let dataAreaPsiquica = new areaPsiquica_1.AreaPsique(psiqueTipado);
                let dataEncargado = new personasInv_1.Involucrados(encargado);
                let datainvolucrado = new personasInv_1.Involucrados(acompanante);
                let dataAntecedentes = new antecedentesCli_1.AntecedentesCli(antecedentes);
                console.log(datainvolucrado);
                let crearFormulario = new formulario_1.Formulario(dataPaciente, dataFicha, dataPrenda, dataHistoriaGen, dataAreaPsiquica, dataEncargado, datainvolucrado, dataAntecedentes);
                crearFormulario.crearFicha(parseInt(idUsuario));
                res.status(201).json("hola mundo");
            }
            catch (err) {
                res.status(500).json({
                    err,
                    msj: "Error interno del servidro",
                });
            }
        });
    }
}
exports.FormularioController = FormularioController;
