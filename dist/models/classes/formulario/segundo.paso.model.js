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
exports.FormularioSegundoPaso = void 0;
const primer_paso_model_1 = require("./primer.paso.model");
const __1 = require("../../..");
const consultasGenerales_1 = require("../../../consultas/consultasGenerales");
class FormularioSegundoPaso extends primer_paso_model_1.FormularioPrimerPaso {
    constructor(genero, primerPaso, pacientes, prendas) {
        super(primerPaso, pacientes);
        (this.identidadGenero = genero.identidadGenero || null),
            (this.orientacionSexual = genero.orientacionSexual || null),
            (this.autoPercepcion = genero.autoPercepcion || null);
        (this.inicioTransicioSexual = genero.inicioTransicioSexual || null),
            (this.tiempoLatencia = genero.tiempoLatencia || null),
            (this.apoyoFamiliar = genero.apoyoFamiliar),
            (this.usoPrenda = genero.usoPrenda),
            (this.presenciaDisforia = genero.presenciaDisforia),
            (this.detallesDiforia = genero.detallesDiforia || null);
        this.tipoPrenda = prendas || null;
    }
    crearSegundoPaso(idPaciente) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const query = "INSERT INTO HISTORIAS_IDENTIDADES_GENEROS VALUES (NULL, ?,?,?,?,?,?,?,?,?, ?)";
            const query1 = "INSERT INTO SELECCION_PRENDA VALUES (null, ?,?)";
            try {
                const setHeaderHgenero = yield (0, consultasGenerales_1.consultasGenerales)(query, [
                    this.identidadGenero,
                    this.orientacionSexual,
                    this.autoPercepcion,
                    this.inicioTransicioSexual,
                    this.tiempoLatencia,
                    this.apoyoFamiliar,
                    this.usoPrenda,
                    this.presenciaDisforia,
                    this.detallesDiforia,
                    idPaciente,
                ]);
                const idHgenero = setHeaderHgenero.insertId;
                console.log();
                for (let i = 0; i < 5; i++) {
                    if (i > this.tipoPrenda.length - 1) {
                        this.tipoPrenda[i] = null;
                    }
                }
                (_a = this.tipoPrenda) === null || _a === void 0 ? void 0 : _a.map((data) => __awaiter(this, void 0, void 0, function* () {
                    yield (0, consultasGenerales_1.consultasGenerales)(query1, [idHgenero, data]);
                }));
                return 0;
            }
            catch (err) {
                console.log(err);
                throw {
                    status: "failure",
                    msj: "Error al crear el segundo paso",
                };
            }
        });
    }
    actualizarSegundoPaso(idHistoria, idPrenda) {
        return __awaiter(this, void 0, void 0, function* () {
            let cont = 0;
            const objConexion = yield __1.mysqlConnexion;
            const queryHistoria = `UPDATE HISTORIAS_IDENTIDADES_GENEROS
    SET identidad_genero  = ?, orientacion_sexual= ?, autopercepcion = ? , inicio_transicion_sexual = ?,tiempo_latencia  = ?,apoyo_nucleo_familiar= ?, uso_prenda  = ?, presencia_disforia = ?, detalles_diforia = ? WHERE id_historia_identidad_genero = ?`;
            const queryPrenda = `UPDATE SELECCION_PRENDA SET fk_prenda_disconformidad  =  ? WHERE id_prenda_n_n = ?`;
            try {
                if (!idHistoria)
                    return 0;
                yield (objConexion === null || objConexion === void 0 ? void 0 : objConexion.query(queryHistoria, [
                    this.identidadGenero,
                    this.orientacionSexual,
                    this.autoPercepcion,
                    this.inicioTransicioSexual,
                    this.tiempoLatencia,
                    this.apoyoFamiliar,
                    this.usoPrenda,
                    this.presenciaDisforia,
                    this.detallesDiforia,
                    idHistoria,
                ]));
                idPrenda.map((data) => {
                    (0, consultasGenerales_1.consultasGenerales)(queryPrenda, [
                        this.tipoPrenda[cont],
                        data
                    ]);
                    cont += 1;
                });
                return "Los datos han sido actualizados: segundo paso";
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.FormularioSegundoPaso = FormularioSegundoPaso;
