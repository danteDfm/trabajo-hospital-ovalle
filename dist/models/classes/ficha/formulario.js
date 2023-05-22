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
exports.Formulario = void 0;
const __1 = require("../../..");
class Formulario {
    constructor(paciente, ficha) {
        this.paciente = paciente;
        this.ficha = ficha;
    }
    crearFicha() {
        return __awaiter(this, void 0, void 0, function* () {
            const paciente = Object.values(this.paciente);
            const conexion = yield __1.mysqlConnexion;
            try {
                yield (conexion === null || conexion === void 0 ? void 0 : conexion.beginTransaction());
                yield (conexion === null || conexion === void 0 ? void 0 : conexion.commit());
                yield (conexion === null || conexion === void 0 ? void 0 : conexion.end());
            }
            catch (err) {
                conexion === null || conexion === void 0 ? void 0 : conexion.rollback();
                console.log(err);
                throw (err);
            }
        });
    }
}
exports.Formulario = Formulario;
