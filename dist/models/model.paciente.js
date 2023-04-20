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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormularioRegistro = void 0;
const conexion_database_1 = __importDefault(require("../database/conexion.database"));
const objDatabase = new conexion_database_1.default();
class FormularioRegistro {
    constructor() {
        //conexion
        this.poolConexion = objDatabase.getConnection();
    }
    crearFichaTecnica() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (yield this.poolConexion).query("SELETC * FROM DETALLES_DISFORIA");
                console.log(result);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.FormularioRegistro = FormularioRegistro;
