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
const promise_1 = __importDefault(require("mysql2/promise"));
class ConexionDatabase {
    constructor() {
        this.crearConexion();
        this.sqlConexion = this.crearConexion();
    }
    crearConexion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const objSql = yield promise_1.default.createConnection({
                    host: "127.0.0.1",
                    database: "TRANSICION_GENERO",
                    user: "root",
                    password: "dante569",
                });
                return objSql;
            }
            catch (err) {
                console.log(`ERROR DE CONEXION A LA BASE DE DATOS ---> ${err}`);
                throw new Error("LA CONEXION A LA BASE DE DATOS SE HA PERDIDO");
            }
        });
    }
    getConnection() {
        if (!this.sqlConexion) {
            throw new Error("LA CONEXION AUN NO SE HA ESTABLECIDO");
        }
        return this.sqlConexion;
    }
}
exports.default = ConexionDatabase;
