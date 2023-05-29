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
exports.SessionController = void 0;
const sesion_model_1 = require("../models/classes/sesion.model");
const hash_contrasena_1 = require("../utils/bcrypt/hash.contrasena");
const generarToken_1 = require("../utils/jwt/generarToken");
const objSesion = new sesion_model_1.Sesion();
const objToken = new generarToken_1.Token();
class SessionController {
    static sesion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let tokenJwt;
                const { emailUsuario, contrasenaUsuario } = req.body;
                if (!emailUsuario || !contrasenaUsuario) {
                    throw new Error("Los datos no puede estar vacios");
                }
                objSesion.setEmail(emailUsuario);
                const dataUsuario = yield objSesion.login();
                if (!dataUsuario[0]) {
                    throw new Error("EL email no se encuentra en la base de datos");
                }
                const verificacion = yield (0, hash_contrasena_1.compararContrasena)(contrasenaUsuario, dataUsuario[0].contrasena);
                if (!verificacion) {
                    throw new Error("La contraseña es incorrecta");
                }
                objToken.formarPayload(dataUsuario[0].id_profesional_salud, dataUsuario[0].roles);
                tokenJwt = objToken.generarToken();
                res.set(`Authorization`, `Bearer ${tokenJwt}`);
                res.status(201).json("La peticion fue llevada con exito");
            }
            catch (err) {
                const error = err.message;
                console.log(error);
                res.status(500).json({
                    error: error,
                });
            }
        });
    }
}
exports.SessionController = SessionController;
