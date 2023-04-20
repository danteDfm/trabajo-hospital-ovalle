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
        this.poolConexion = null;
        this.crearConexion();
    }
    crearConexion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const objDbs = yield promise_1.default.createPool({
                    host: 'localhost',
                    database: 'hospital',
                    user: 'root',
                    password: 'dante569',
                });
                this.poolConexion = objDbs;
            }
            catch (err) {
                console.log(`ERROR DE CONEXION A LA BASE DE DATOS ---> ${err}`);
            }
        });
    }
    getConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.poolConexion) {
                throw new Error('LA CONEXION AUN NO SE HA ESTABLECIDO');
            }
            return this.poolConexion;
        });
    }
    closeConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.poolConexion) {
                yield this.poolConexion.end();
                this.poolConexion = null;
            }
        });
    }
}
exports.default = ConexionDatabase;
