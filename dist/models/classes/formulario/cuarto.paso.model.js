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
exports.FormularioCuartoPaso = void 0;
const __1 = require("../../..");
const tercer_paso_model_1 = require("./tercer.paso.model");
class FormularioCuartoPaso extends tercer_paso_model_1.FormularioTercerPaso {
    constructor(antecedentes, areaPsiquica, usoDroga, detallesDroga, dieta, genero, primerPaso, pacientes, prendas) {
        super(areaPsiquica, usoDroga, detallesDroga, dieta, genero, primerPaso, pacientes, prendas);
        this.antecedentePerinatales = antecedentes.antecedentePerinatales;
        this.antecedenteHospitalizaciones = antecedentes.antecedenteHospitalizaciones;
        this.antecedentesQuirurgicos = antecedentes.antecedentesQuirurgicos;
        this.antecedentesAlergicos = antecedentes.antecedentesAlergicos;
        this.antecedentesPni = antecedentes.antecedentesPni;
        this.funcionalidadGenital = antecedentes.funcionalidadGenital;
        this.antecedentesFamilia = antecedentes.antecedentesFamilia;
    }
    crearCuartoPaso() {
        return __awaiter(this, void 0, void 0, function* () {
            const conexion = yield __1.mysqlConnexion;
            const query = `INSERT INTO HISTORIAS_CLINICAS VALUES (NULL, ?,?,?,?,?,?,?)`;
            try {
                const [setHeaderAntecedente] = yield (conexion === null || conexion === void 0 ? void 0 : conexion.query(query, [
                    this.antecedentePerinatales,
                    this.antecedenteHospitalizaciones,
                    this.antecedentesQuirurgicos,
                    this.antecedentesAlergicos,
                    this.antecedentesPni,
                    this.funcionalidadGenital,
                    this.antecedentesFamilia,
                ]));
                const idAntecedentes = setHeaderAntecedente.insertId;
                return idAntecedentes;
            }
            catch (err) {
                console.log(err);
                throw "Error al ejecutar la consulta";
            }
        });
    }
    actualizarCuartoPaso(idAntecedentes) {
        return __awaiter(this, void 0, void 0, function* () {
            const conexion = yield __1.mysqlConnexion;
            const query = `UPDATE HISTORIAS_CLINICAS
    SET  detalles_antecedente_perinatales = ?, detalles_antecedentes_hospitalizaciones  = ?,
    detalles_antecedentes_quirurgicos =?,
    detalles_antecedentes_alergicos = ?,
    detalles_antecedentes_pni =  ?,
    detalles_funcionalidad_genital = ?
    WHERE id_historia_clinica = ? `;
            try {
                console.log(idAntecedentes);
                yield (conexion === null || conexion === void 0 ? void 0 : conexion.query(query, [
                    this.antecedentePerinatales,
                    this.antecedenteHospitalizaciones,
                    this.antecedentesQuirurgicos,
                    this.antecedentesAlergicos,
                    this.antecedentesPni,
                    this.funcionalidadGenital,
                    idAntecedentes
                ]));
                return "Los datos han sido actualizados: cuarto paso";
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.FormularioCuartoPaso = FormularioCuartoPaso;
