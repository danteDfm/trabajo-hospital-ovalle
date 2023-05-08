"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlConnexion = void 0;
const model_servidor_1 = require("./models/classes/model.servidor");
const objServidor = new model_servidor_1.Server();
objServidor.iniciarServidor();
const mysqlConnexion = objServidor.conexionDatabase();
exports.mysqlConnexion = mysqlConnexion;
