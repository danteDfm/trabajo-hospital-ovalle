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
exports.TableController = void 0;
const dataTable_model_1 = require("../models/classes/dataTable.model");
const objDataTable = new dataTable_model_1.DataTable();
class TableController {
    static tablePacientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pacientes = yield objDataTable.pacienteCentroEspesifico("Antonio Tirado Lanas", "=");
                res.status(201).json(pacientes);
            }
            catch (err) {
                res.status(500).json({
                    err,
                    msj: "Error interno del servidor",
                });
            }
        });
    }
    static tableCentrosDiferente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pacientes = yield objDataTable.pacienteCentroEspesifico("Antonio Tirado Lanas", "!=");
                res.status(201).json(pacientes);
            }
            catch (err) {
                res.status(500).json({
                    err,
                    msj: "Error interno del servidor",
                });
            }
        });
    }
    //buscar paciente por id 
    static mostrarFicha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idFicha } = req.params;
                const dataFicha = yield objDataTable.traerDataPaciente(parseInt(idFicha));
                res.status(201).json(dataFicha);
            }
            catch (err) {
                res.status(500).json({
                    err,
                    msj: "Error interno del servidor",
                });
            }
        });
    }
    //listar fichas tecnicas totales paciente
    static fichasPacientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rutPaciente } = req.params;
                const dataFichas = yield objDataTable.listarFichasPorRut(rutPaciente);
                res.status(201).json(dataFichas);
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
exports.TableController = TableController;
