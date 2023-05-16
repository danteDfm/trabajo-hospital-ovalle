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
const data_paciente_1 = require("../../models/classes/listar_data_dbs/data.paciente");
const datos_bds_1 = require("../../models/classes/listar_data_dbs/datos.bds");
const objDataPaciente = new data_paciente_1.ListaPaciente();
class DataPacienteController {
    static listarPaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield objDataPaciente.dataPaciente();
                const paciente = objDataPaciente.getPaciente();
                res.status(201).json(paciente);
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
                const { idFicha } = req.params;
                const obj = new datos_bds_1.TraerDataDbs(parseInt(idFicha));
                yield obj.traerDataPaciente();
                const paciente = obj.getDataFicha();
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
exports.DataPacienteController = DataPacienteController;
