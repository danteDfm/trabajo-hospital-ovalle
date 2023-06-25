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
const usurio_model_1 = require("../models/classes/usurio.model");
const hash_contrasena_1 = require("../utils/bcrypt/hash.contrasena");
let objUsuario = new usurio_model_1.Usuario();
class UsuarioController {
    static crearUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let existenciaUser;
                let contrasenaHasheada;
                let { rutProfesional, nombreProfesional, contrasenaProfesional, cargoProfesional, centroProfesional, rolProfesional, } = req.body;
                existenciaUser = yield objUsuario.exitenciaUsuario(rutProfesional);
                if (existenciaUser)
                    throw "Usuario ya existe en la base de datos";
                contrasenaHasheada = yield (0, hash_contrasena_1.hashContrasena)(contrasenaProfesional);
                objUsuario.setRutProfesional(rutProfesional);
                objUsuario.setNombreProfesional(nombreProfesional);
                objUsuario.setCargoProfesional(cargoProfesional);
                objUsuario.setContrasenaProfesional(contrasenaHasheada);
                objUsuario.setCentroProfesional(centroProfesional);
                objUsuario.setRolProfesional(rolProfesional);
                const msjCrearUser = yield objUsuario.ingresarUsuario();
                res.status(201).json(msjCrearUser);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({
                    err,
                    msj: "Error interno del servidor",
                });
            }
        });
    }
    static listaUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombreCentro } = req.params;
            try {
                console.log(nombreCentro);
                const resultListar = yield objUsuario.listarUsuarios(nombreCentro);
                res.status(201).json(resultListar);
            }
            catch (err) {
                res.status(500).json({
                    err,
                    mjs: "Error interno del servidor",
                });
            }
        });
    }
    static actualizarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idUsuario } = req.params;
                let contrasenaHasheada;
                const { rutProfesional, nombreProfesional, cargoProfesional, contrasenaProfesional, emailProfesional, centroProfesional, } = req.body;
                contrasenaHasheada = yield (0, hash_contrasena_1.hashContrasena)(contrasenaProfesional);
                objUsuario.setRutProfesional(rutProfesional);
                objUsuario.setNombreProfesional(nombreProfesional);
                objUsuario.setCargoProfesional(cargoProfesional);
                objUsuario.setContrasenaProfesional(contrasenaHasheada);
                objUsuario.setCentroProfesional(centroProfesional);
                const msjActualizarUsuario = yield objUsuario.actualizarUsuario(parseInt(idUsuario));
                res.status(201).json(msjActualizarUsuario);
            }
            catch (err) {
                res.status(500).json({
                    err,
                    msj: "Error interno del servidor",
                });
            }
        });
    }
}
exports.UsuarioController = UsuarioController;
