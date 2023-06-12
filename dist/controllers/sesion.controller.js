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
                res.set("Content-Type", "application/json");
                res.setHeader("Authorization", `Bearer ${token}`);
                res.status(200).json({ message: "peticion llevada a cabo" });
            }
            catch (err) {
                if (err.code == 103 || err.code == 101 || err.code == 102) {
                    return res.status(400).json(err.error);
                }
                console.log(err);
                return res.status(500).json("Error interno del servidor");
            }
        });
    }
    static verificarToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const header = req.headers;
            try {
                if (header.authorization == "Bearer null")
                    throw { ok: false };
                const data = objSesion.verificarToken(header.authorization);
                const resultData = yield objSesion.seleccionarUsuario(data.sub);
                res.status(200).json({
                    ok: true,
                    resultData,
                });
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    }
}
exports.SessionController = SessionController;
