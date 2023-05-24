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
const objSesion = new sesion_model_1.Sesion;
class SessionController {
    static sesion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { emailUsuario, contrasenaUsuario } = req.body;
            objSesion.setEmail(emailUsuario);
            const result = yield objSesion.login();
            console.log(contrasenaUsuario);
            console.log(result[0].contrasena);
            const re = yield (0, hash_contrasena_1.compararContrasena)(result[0].contrasena, contrasenaUsuario);
            console.log(re);
            res.send(result[0]);
        });
    }
}
exports.SessionController = SessionController;
