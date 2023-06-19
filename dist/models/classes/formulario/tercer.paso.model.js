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
    constructor(areaPsiquica, usoDroga, detallesDroga, dieta, genero, primerPaso, pacientes, prendas) {
        super(genero, primerPaso, pacientes, prendas);
        (this.controlEquipoSaludMental =
            areaPsiquica.controlEquipoSaludMental),
            (this.psicoterapia = areaPsiquica.psicoterapia),
            (this.evaluacionPsiquica = areaPsiquica.evaluacionPsiquica),
            (this.diagnosticoPsiquiatrico =
                areaPsiquica.diagnosticoPsiquiatrico),
            (this.utilizacionFarmaco = areaPsiquica.utilizacionFarmaco),
            (this.detallesFarmacos = areaPsiquica.detallesFarmacos || null);
        this.usoDroga = usoDroga;
        this.detallesDroga = detallesDroga || null;
        this.dieta = dieta || null;
    }
    crearTercerPaso(idPaciente) {
        return __awaiter(this, void 0, void 0, function* () {
            const conexion = yield __1.mysqlConnexion;
            const query = "INSERT INTO AREAS_PSIQUICAS VALUES (NULL, ?,?,?,?,?,?)";
            const query1 = "INSERT INTO HABITOS_ALIMENTICIOS VALUES (NULL, ?,?)";
            const query3 = "INSERT INTO HISTORIAL_DROGAS VALUES (NULL, ?,?,?)";
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
                const [headDataDrogas] = yield (conexion === null || conexion === void 0 ? void 0 : conexion.query(query3, [
                    this.usoDroga,
                    this.detallesDroga,
                    idPaciente,
                ]));
                const idAreaPsiquica = headDataPsico.insertId;
                const idDieta = headDataDieta.insertId;
                const idDrogas = headDataDrogas.insertId;
                yield (conexion === null || conexion === void 0 ? void 0 : conexion.commit());
                return {
                    idAreaPsiquica,
                    idDieta,
                    idDrogas,
                };
            }
            catch (err) {
                yield (conexion === null || conexion === void 0 ? void 0 : conexion.rollback());
                console.log(err);
                throw "Error de consulta";
            }
        });
    }
    actulizarTercerPaso(idAreaPsiquica, idDieta, idDrogas) {
        return __awaiter(this, void 0, void 0, function* () {
            const objConexion = yield __1.mysqlConnexion;
            const queryAreaPsique = `UPDATE AREAS_PSIQUICAS SET
    control_equipo_salud_mental = ?, psicoterapia  = ?,
    evaluacion_psiquica= ?,  diagnostico_psiquiatrico = ?, utilizacion_farmaco = ?, detalles_farmacos = ? WHERE id_area_psiquica = ?`;
            const queryHabitos = `UPDATE HABITOS_ALIMENTICIOS SET detalle_habito_alimenticio = ? WHERE id_habito_alimenticio = ?`;
            const queryDrogas = `UPDATE HISTORIAL_DROGAS
    SET uso_droga = ?, 
    detalles_uso_droga = ?
    WHERE id_historial_droga = ?
    `;
            try {
                if (!idAreaPsiquica)
                    return 0;
                yield (objConexion === null || objConexion === void 0 ? void 0 : objConexion.query(queryAreaPsique, [
                    this.controlEquipoSaludMental,
                    this.psicoterapia,
                    this.evaluacionPsiquica,
                    this.diagnosticoPsiquiatrico,
                    this.utilizacionFarmaco,
                    this.detallesFarmacos,
                    idAreaPsiquica
                ]));
                if (!idDieta)
                    return 0;
                yield (objConexion === null || objConexion === void 0 ? void 0 : objConexion.query(queryHabitos, [this.dieta, idDieta]));
                if (!idDrogas)
                    return 0;
                yield (objConexion === null || objConexion === void 0 ? void 0 : objConexion.query(queryDrogas, [
                    this.usoDroga,
                    this.detallesDroga,
                    idDrogas
                ]));
                return "Los datos han sido actualizados: tercer paso";
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.FormularioTercerPaso = FormularioTercerPaso;
