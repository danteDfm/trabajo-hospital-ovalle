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
exports.consultarDatos = void 0;
const __1 = require("..");
function consultarDatos(query, formato) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conexion = yield __1.mysqlConnexion;
            const [dataDbs] = yield conexion.query(query, formato);
            return dataDbs;
        }
        catch (err) {
            console.log(err);
            throw new Error();
        }
    });
}
exports.consultarDatos = consultarDatos;
