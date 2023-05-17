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
exports.IdentidadGenero = void 0;
const consultasGenerales_1 = require("../../../consultas/consultasGenerales");
class IdentidadGenero {
    crearIdentidadGenero(IdenGenero, fkDetallesDisforia) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "INSERT INTO HISTORIAS_IDENTIDADES_GENEROS VALUES (NULL, ?,?,?,?,?,?,?,?)";
                const { insertId: idGenero } = yield (0, consultasGenerales_1.consultasGenerales)(query, [
                    IdenGenero.identidadGenero,
                    IdenGenero.orientacionSexual,
                    IdenGenero.inicioTransicion,
                    IdenGenero.tiempoLatencia,
                    IdenGenero.apoyoFamilia,
                    IdenGenero.usoPrenda,
                    IdenGenero.presenciaDisforia,
                    fkDetallesDisforia,
                ]);
                return idGenero;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    crearDisforia(detallesDisforia) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "INSERT INTO DETALLES_DISFORIA VALUES (NULL, ?)";
                const { insertId: idDisforia } = yield (0, consultasGenerales_1.returnNull)(query, detallesDisforia);
                return idDisforia;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    seleccinarPrenda(fkHG, seleccionPrenda) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `INSERT INTO  SELECCION_PRENDA VALUES (NULL, ${fkHG}, ?)`;
                seleccionPrenda === null || seleccionPrenda === void 0 ? void 0 : seleccionPrenda.map((prenda) => __awaiter(this, void 0, void 0, function* () {
                    yield (0, consultasGenerales_1.returnNull)(query, prenda);
                }));
                return 0;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
}
exports.IdentidadGenero = IdentidadGenero;
