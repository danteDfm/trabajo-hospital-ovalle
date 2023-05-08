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
const model_formulario_1 = require("../models/classes/crear_ficha/model.formulario");
const dataPaciente = new model_formulario_1.FormularioRegistro;
class CrearFichaTecnica {
    constructor() { }
    static crearFicha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            dataPaciente.informacionPaciente.dataPaciente = Object.assign({}, body.dataPaciente);
            dataPaciente.informacionPaciente.dataInvolucrados.dataInvolucrado = Object.assign({}, body.dataInvolucrados);
            dataPaciente.informacionPaciente.dataInvolucrados.dataAcompanante = Object.assign({}, body.dataAcompanante);
            dataPaciente.indentidadGenero.historiaIdentidadGenero.historiaGenero = Object.assign({}, body.historiaIdentidadGenero.historiaGenero);
            dataPaciente.indentidadGenero.historiaIdentidadGenero.prendasDisconformidadGenero = Object.assign({}, body.historiaIdentidadGenero.prendasDisconformidadGenero);
            dataPaciente.entornoPaciente.entornoPaciente.escolaridad = Object.assign({}, body.entornoPaciente.escolaridad);
            dataPaciente.entornoPaciente.entornoPaciente.antecedentesFamiliares = Object.assign({}, body.entornoPaciente.antecedentesFamiliares);
            dataPaciente.areaPsiquica.datosPsiquicos.datosPsiquicos = Object.assign({}, body.areaPsiquica.datosPsiquicos);
            dataPaciente.areaPsiquica.datosPsiquicos.usofarmacos = Object.assign({}, body.areaPsiquica.usoFarmaco);
            dataPaciente.areaPsiquica.datosPsiquicos.disforia = Object.assign({}, body.areaPsiquica.disforia);
            dataPaciente.areaPsiquica.datosPsiquicos.habitos = Object.assign({}, body.areaPsiquica.habitos);
            dataPaciente.antecedentesClinicosPaciente.antecedentesClinicos = Object.assign({}, body.antecedentesClinicos);
            const idDataTablasTerciarias = yield dataPaciente.crearTablasTerciarias();
            const idTablasSecundarias = yield dataPaciente.crearTablasSecundarias(idDataTablasTerciarias.idUsoPrenda, idDataTablasTerciarias.idPresenciaDisforia, idDataTablasTerciarias.idPresenciaAntecedentesFamiliares, idDataTablasTerciarias.idUsoDrogas, idDataTablasTerciarias.idUsoFarmaco, idDataTablasTerciarias.idHabitosAlimenticios);
            dataPaciente.crearTablaPrimaria(body.fechaIngreso, body.borradoLogico, 1, idTablasSecundarias.idPaciente, idTablasSecundarias.idApoyoEscolaridad, idTablasSecundarias.idAreaPsiquica, idTablasSecundarias.idFuncionalidadGenital, idTablasSecundarias.idHistoriasClinicas, idTablasSecundarias.idPersonaAcompanante, idTablasSecundarias.idPersonaInvolucrada);
            res.status(201).send(dataPaciente);
        });
    }
}
exports.CrearFichaTecnica = CrearFichaTecnica;
