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
exports.verficarSesion = void 0;
const consultasGenerales_1 = require("../consultas/consultasGenerales");
const hash_contrasena_1 = require("../utils/bcrypt/hash.contrasena");
function verficarSesion(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
    SELECT nombre_usuario, contrasena, id_profesional_salud, roles FROM profesionales_usuarios_salud
    WHERE nombre_usuario = ?`;
        const { emailUsuario, contrasenaUsuario } = req.body;
        try {
            if (!emailUsuario || !contrasenaUsuario) {
                throw ("Los datos no puede estar vacios");
            }
            const result = yield (0, consultasGenerales_1.consultasGenerales)(query, [emailUsuario]);
            if (!result[0]) {
                throw ("EL usuario no se encuentra en la base de datos");
            }
            const verificacion = yield (0, hash_contrasena_1.compararContrasena)(contrasenaUsuario, result[0].contrasena);
            if (!verificacion) {
                throw ("Contraseña es invalida");
            }
            req.dataUsuario = {
                idProfesional: result[0].id_profesional_salud,
                rol: result[0].roles,
            };
            next();
        }
        catch (err) {
            return res.status(400).json(err);
        }
    });
}
exports.verficarSesion = verficarSesion;
