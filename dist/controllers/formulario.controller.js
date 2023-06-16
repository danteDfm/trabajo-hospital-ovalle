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
const espesificarFecha_1 = require("../utils/espesificarFecha");
const cuarto_paso_model_1 = require("../models/classes/formulario/cuarto.paso.model");
const ficha_model_1 = require("../models/classes/ficha.model");
const historial_fichas_model_1 = require("../models/classes/historial.fichas.model");
const objFichas = new historial_fichas_model_1.Fichas();
class FormularioController {
    static buscarFichaPaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rutPaciente } = req.params;
                const dataFicha = yield objFichas.listarInformacionPaciente(rutPaciente);
                res.status(400).json(dataFicha);
            }
            catch (err) {
                res.status(400).json({
                    err,
                    msj: "Error interno del servidor",
                });
            }
        });
    }
    static crearFichaTecnica(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fichas, paciente, habitos, antecedentes, involucrado, acompanante, areaPsiquica, historialDrogas, genero, prendas, } = req.body;
            const nivel = parseInt(req.query.nivel);
            const idUsuario = parseInt(req.params.idUsuario);
            let fechaIngreso;
            let estado = true;
            fechaIngreso = (0, espesificarFecha_1.fechaExacta)();
            const historiaGeneroTipada = genero;
            const areaPsiquicaTipada = areaPsiquica;
            const antecedentesTipado = antecedentes;
            const primerPasoTipado = {
                involucrado,
                acompanante,
            };
            const fichaTipada = paciente;
            const objCuarto = new cuarto_paso_model_1.FormularioCuartoPaso(antecedentesTipado, areaPsiquicaTipada, historialDrogas.usoDrogas, historialDrogas.detallesDrogas, habitos.dieta, historiaGeneroTipada, primerPasoTipado, fichaTipada, prendas.prenda);
            try {
                const verificacionFicha = yield ficha_model_1.Ficha.estatusFicha(paciente.rutPaciente);
                //update en caso de existir el paciente
                if (verificacionFicha) {
                    objCuarto.actulizarPaciente(paciente.idPaciente);
                    objCuarto.actualizarprimerPaso(involucrado.idInvolucrado, acompanante.idAcompanante);
                    objCuarto.actualizarSegundoPaso(genero.idGenero);
                    objCuarto.actulizarTercerPaso(areaPsiquica.idAreaPsiquica, habitos.idDieta);
                    objCuarto.actualizarCuartoPaso(antecedentes.idAntecedente);
                    const objFichas = new ficha_model_1.Ficha(fechaIngreso, estado, nivel, fichas.apoyoEscolar, fichas.judicializacion, fichas.detallesApoyo, fichas.detallesJudicializacion);
                    const msj = yield objFichas.actulizarFicha(fichas.idFicha);
                    return res.status(201).json(msj);
                }
                const idPaciente = yield objCuarto.crearPaciente();
                const idPrimerPaso = yield objCuarto.guardarPrimerPaso();
                objCuarto.crearSegundoPaso(idPaciente);
                const idTecerPaso = yield objCuarto.crearTercerPaso(idPaciente);
                const idCuartoPaso = yield objCuarto.crearCuartoPaso();
                const objFichas = new ficha_model_1.Ficha(fechaIngreso, estado, nivel, fichas.apoyoEscolar, fichas.judicializacion, fichas.detallesApoyo, fichas.detallesJudicializacion, idPaciente, idUsuario, idTecerPaso.idAreaPsiquica, idCuartoPaso, idPrimerPaso.idInvolucrado, idPrimerPaso.idAcompanante);
                const msj = yield objFichas.crearFichaTecnica();
                res.status(201).json(msj);
            }
            catch (err) {
                res.status(201).json({
                    err,
                    msj: "Error interno del servidor"
                });
            }
        });
    }
}
exports.FormularioController = FormularioController;
