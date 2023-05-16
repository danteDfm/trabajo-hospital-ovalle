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
exports.CrearFichaTecnica = void 0;
const model_formulario_1 = require("../../models/classes/crear_ficha/model.formulario");
const dataPaciente = new model_formulario_1.FormularioRegistro;
class CrearFichaTecnica {
    constructor() { }
    static crearFicha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const { idUsuarioProfesional } = req.params;
                dataPaciente.informacionPaciente.dataPaciente = Object.assign({}, body.dataPaciente);
                dataPaciente.informacionPaciente.dataInvolucrados = Object.assign({}, body.dataInvolucrados);
                dataPaciente.indentidadGenero.historiaIdentidadGenero = Object.assign({}, body.historiaIdentidadGenero);
                dataPaciente.entornoPaciente.entornoPaciente = Object.assign({}, body.entornoPaciente);
                dataPaciente.areaPsiquica.datosPsiquicos = Object.assign({}, body.areaPsiquica);
                dataPaciente.antecedentesClinicosPaciente.antecedentesClinicos = Object.assign({}, body.antecedentesClinicos);
                const idDataTablasTerciarias = yield dataPaciente.crearTablasTerciarias();
                const idTablasSecundarias = yield dataPaciente.crearTablasSecundarias(idDataTablasTerciarias.idUsoPrenda, idDataTablasTerciarias.idPresenciaDisforia, idDataTablasTerciarias.idPresenciaAntecedentesFamiliares, idDataTablasTerciarias.idUsoDrogas, idDataTablasTerciarias.idUsoFarmaco, idDataTablasTerciarias.idHabitosAlimenticios);
                dataPaciente.crearTablaPrimaria(parseInt(idUsuarioProfesional), body.fechaIngreso, body.borradoLogico, idTablasSecundarias.idPaciente, idTablasSecundarias.idApoyoEscolaridad, idTablasSecundarias.idAreaPsiquica, idTablasSecundarias.idFuncionalidadGenital, idTablasSecundarias.idHistoriasClinicas, idTablasSecundarias.idPersonaAcompanante, idTablasSecundarias.idPersonaInvolucrada, idDataTablasTerciarias.idJudicializaciones);
                res.status(201).send("los datos del paciente han sido creados");
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
exports.CrearFichaTecnica = CrearFichaTecnica;
