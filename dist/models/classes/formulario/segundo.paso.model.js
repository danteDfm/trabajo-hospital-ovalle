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
class FormularioSegundoPaso extends primer_paso_model_1.FormularioPrimerPaso {
    constructor(genero, primerPaso, pacientes, prendas) {
        super(primerPaso, pacientes);
        (this.identidadGenero = genero.identidadGenero || null),
            (this.orientacionSexual = genero.orientacionSexual || null),
            (this.inicioTransicioSexual = genero.inicioTransicioSexual || null),
            (this.tiempoLatencia = genero.tiempoLatencia || null),
            (this.apoyoFamiliar = genero.apoyoFamiliar || null),
            (this.usoPrenda = genero.usoPrenda || null),
            (this.presenciaDisforia = genero.presenciaDisforia || null),
            (this.detallesDiforia = genero.detallesDiforia || null);
        this.autoPercepcion = genero.autoPercepcion || null;
        this.tipoPrenda = prendas || null;
    }
    crearSegundoPaso(idPaciente) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const conexion = yield __1.mysqlConnexion;
            const query = "INSERT INTO HISTORIAS_IDENTIDADES_GENEROS VALUES (NULL, ?,?,?,?,?,?,?,?,?, ?)";
            const query1 = "INSERT INTO SELECCION_PRENDA VALUES (null, ?,?)";
            try {
                yield (conexion === null || conexion === void 0 ? void 0 : conexion.beginTransaction());
                const [setHeaderHgenero] = yield (conexion === null || conexion === void 0 ? void 0 : conexion.query(query, [
                    this.identidadGenero,
                    this.orientacionSexual,
                    this.inicioTransicioSexual,
                    this.tiempoLatencia,
                    this.apoyoFamiliar,
                    this.usoPrenda,
                    this.presenciaDisforia,
                    this.detallesDiforia,
                    idPaciente,
                    this.autoPercepcion
                ]));
                const idHgenero = setHeaderHgenero.insertId;
                (_a = this.tipoPrenda) === null || _a === void 0 ? void 0 : _a.map((prendas) => __awaiter(this, void 0, void 0, function* () {
                    yield (conexion === null || conexion === void 0 ? void 0 : conexion.query(query1, [idHgenero, prendas]));
                }));
                yield (conexion === null || conexion === void 0 ? void 0 : conexion.commit());
                return 0;
            }
            catch (err) {
                console.log(err);
                yield (conexion === null || conexion === void 0 ? void 0 : conexion.rollback());
                if (err == 101) {
                    throw {
                        code: err,
                        status: "failure",
                        msj: "Error, el id no debe venir vacio",
                    };
                }
                throw {
                    status: "failure",
                    msj: "Error al crear el segundo paso",
                };
            }
        });
    }
}
exports.FormularioSegundoPaso = FormularioSegundoPaso;
