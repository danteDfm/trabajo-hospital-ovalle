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
exports.FormularioTercerPaso = void 0;
const segundo_paso_model_1 = require("./segundo.paso.model");
const __1 = require("../../..");
class FormularioTercerPaso extends segundo_paso_model_1.FormularioSegundoPaso {
    constructor(areaPsiquica, dieta, genero, primerPaso, pacientes, prendas) {
        super(genero, primerPaso, pacientes, prendas);
        (this.controlEquipoSaludMental = areaPsiquica.controlEquipoSaludMental),
            (this.psicoterapia = areaPsiquica.psicoterapia),
            (this.evaluacionPsiquica = areaPsiquica.evaluacionPsiquica),
            (this.diagnosticoPsiquiatrico = areaPsiquica.diagnosticoPsiquiatrico),
            (this.utilizacionFarmaco = areaPsiquica.utilizacionFarmaco),
            (this.detallesFarmacos = areaPsiquica.detallesFarmacos);
        this.dieta = dieta;
    }
    crearTercerPaso(idPaciente) {
        return __awaiter(this, void 0, void 0, function* () {
            const conexion = yield __1.mysqlConnexion;
            const query = "INSERT INTO AREAS_PSIQUICAS VALUES (NULL, ?,?,?,?,?,?)";
            const query1 = "INSERT INTO HABITOS_ALIMENTICIOS VALUES (NULL, ?,?)";
            try {
                yield (conexion === null || conexion === void 0 ? void 0 : conexion.beginTransaction());
                const [headDataPsico] = yield (conexion === null || conexion === void 0 ? void 0 : conexion.query(query, [
                    this.controlEquipoSaludMental,
                    this.psicoterapia,
                    this.evaluacionPsiquica,
                    this.diagnosticoPsiquiatrico,
                    this.utilizacionFarmaco,
                    this.detallesFarmacos,
                ]));
                const [headDataDieta] = yield (conexion === null || conexion === void 0 ? void 0 : conexion.query(query1, [
                    this.dieta,
                    idPaciente,
                ]));
                const idAreaPsiquica = headDataPsico.insertId;
                const idDieta = headDataDieta.insertId;
                yield (conexion === null || conexion === void 0 ? void 0 : conexion.commit());
                return {
                    idAreaPsiquica,
                    idDieta,
                };
            }
            catch (err) {
                yield (conexion === null || conexion === void 0 ? void 0 : conexion.rollback());
                console.log(err);
                throw "Error de consulta";
            }
        });
    }
}
exports.FormularioTercerPaso = FormularioTercerPaso;
