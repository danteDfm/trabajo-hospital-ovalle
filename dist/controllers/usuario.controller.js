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
exports.UsuarioController = void 0;
const crearUsuario_1 = require("../models/classes/crearUsuario");
const hash_contrasena_1 = require("../utils/bcrypt/hash.contrasena");
class UsuarioController {
    constructor() { }
    static listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idProfesional } = req.params;
                const userObj = new crearUsuario_1.Usuario();
                yield userObj.listarProfesional(parseInt(idProfesional));
                res.send({
                    nombre: userObj.getNombre(),
                    rut: userObj.getRut(),
                    email: userObj.getEmail(),
                    cargo: userObj.getCargo(),
                    centro: userObj.getCentro(),
                });
            }
            catch (err) {
                res.status(500).json({
                    err,
                    msj: "Error interno del Servidor",
                });
            }
        });
    }
    static crearUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const hash = yield (0, hash_contrasena_1.hashContrasena)(body.contrasena);
                const userObj = new crearUsuario_1.Usuario({
                    rutProfesional: body.rutProfesional,
                    nombreProfesional: body.nombreProfesional,
                    emailProfesional: body.emailProfesional,
                    contrasena: hash,
                    cargoProfesional: body.cargoProfesional,
                    centroSalud: body.centroSalud,
                });
                const msj = yield userObj.crearProfesional();
                res.status(201).json({
                    msj
                });
            }
            catch (err) {
                res.status(500).json({
                    msj: "Error al crear usuario",
                });
            }
        });
    }
}
exports.UsuarioController = UsuarioController;
