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
exports.DataPacienteController = void 0;
const lista_pacientes_1 = require("../models/classes/listar_data_dbs/lista_pacientes");
const datos_bds_1 = require("../models/classes/listar_data_dbs/datos.bds");
let datosPaciente = new lista_pacientes_1.DatosPaciente();
class DataPacienteController {
    static listarPaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataPaciente = yield datosPaciente.traerDataPaciente();
                res.status(201).json({ dataPaciente });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({
                    err,
                    msj: "Error interno del Servidor",
                });
            }
        });
    }
    static listarPacientesDetalles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idFicha = req.params.idFicha;
                const objTraerData = new datos_bds_1.TraerDataDbs(parseInt(idFicha));
                const detallesPaciente = yield objTraerData.dataFicha();
                const dataDetallesFarmaco = yield objTraerData.detalleFarmaco();
                const apoyoEscolar = yield objTraerData.detalleApoyoEscolar();
                const detallesJuicio = yield objTraerData.detalleJudicialiazcion();
                const detallesDrogas = yield objTraerData.detallesDrogas();
                const detallesAntecedentesFamilia = yield objTraerData.antecedentesFamiliares();
                const generalidadesDisforia = yield objTraerData.detallesDisforia();
                const generalidadesPrenda = yield objTraerData.detallesPrenda();
                res.status(201).json({
                    detallesPaciente,
                    apoyoEscolar,
                    dataDetallesFarmaco,
                    detallesJuicio,
                    detallesDrogas,
                    detallesAntecedentesFamilia,
                    generalidadesDisforia,
                    generalidadesPrenda
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
}
exports.DataPacienteController = DataPacienteController;
