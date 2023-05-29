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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormularioController = void 0;
const formulario_model_1 = require("../models/classes/formulario.model");
const paciente_1 = require("../models/classes/entidades_dbs/paciente");
const ficha_1 = require("../models/classes/entidades_dbs/ficha");
const prendas_1 = require("../models/classes/entidades_dbs/prendas");
const historiaGenero_1 = require("../models/classes/entidades_dbs/historiaGenero");
const areaPsiquica_1 = require("../models/classes/entidades_dbs/areaPsiquica");
const personasInv_1 = require("../models/classes/entidades_dbs/personasInv");
const antecedentesCli_1 = require("../models/classes/entidades_dbs/antecedentesCli");
const revertirFecha_1 = require("../utils/revertirFecha");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
class FormularioController {
    static crearFormulario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { ficha, antecedentesClinicos, personasInv, personasAcom, AreaPsiquica, paciente, historiaGenero, prendaYdieta, } = req.body;
                const { idUsuario } = req.params;
                let nuevoFormatoFechas;
                const date = new Date();
                const zona = 'America/santiago';
                const hora = (0, moment_timezone_1.default)().tz(zona).format('HH:mm:ss');
                nuevoFormatoFechas = (0, revertirFecha_1.revertirFecha)([paciente.fechaNacimientoPa, historiaGenero.inicioTransicioSexual, historiaGenero.tiempoLatencia]);
                paciente.fechaNacimientoPa = nuevoFormatoFechas[0];
                historiaGenero.inicioTransicioSexual = [1];
                historiaGenero.tiempoLatencia = [2];
                const fecha = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${hora}`;
                ficha.fechaIngreso = fecha;
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
                let crearFormulario = new formulario_model_1.Formulario(dataPaciente, dataFicha, dataPrenda, dataHistoriaGen, dataAreaPsiquica, dataEncargado, datainvolucrado, dataAntecedentes);
                const msjCrearFicha = yield crearFormulario.crearFicha(parseInt(idUsuario));
                res.status(201).json(msjCrearFicha);
            }
            catch (err) {
                res.status(500).json({
                    err,
                    msj: "Error interno del servidro",
                });
            }
        });
    }
    static mostrarPacienteController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rutPaciente } = req.params;
                const paciente = yield formulario_model_1.Formulario.buscarPaciente(rutPaciente);
                res.status(201).json(paciente);
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
exports.FormularioController = FormularioController;
