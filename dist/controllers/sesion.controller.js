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
const objSesion = new sesion_model_1.Sesion();
class SessionController {
    static sesion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { emailUsuario, contrasenaUsuario } = req.body;
                objSesion.setEmail(emailUsuario);
                objSesion.setContrasena(contrasenaUsuario);
                const token = yield objSesion.login();
                res.set('Content-Type', 'application/json');
                res.set(`Authorization`, `Bearer ${token}`);
                res.status(200).json("La peticion fue llevada con exito");
            }
            catch (err) {
                if (err.code == 103 || err.code == 101 || err.code == 102) {
                    return res.status(400).json(err.error);
                }
                return res.status(500).json("Error interno del servidor");
            }
        });
    }
}
exports.SessionController = SessionController;
//header 
//res.set('Content-Type', 'application/json');
//res.set(`Authorization`, `Bearer ${token}`);
