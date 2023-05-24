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
exports.Sesion = void 0;
const consultasGenerales_1 = require("../../consultas/consultasGenerales");
class Sesion {
    constructor(email, contrasena) {
        this.email = email;
        this.contrasena = contrasena;
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
            SELECT email_profesional_salud, contrasena FROM profesionales_usuarios_salud
            WHERE email_profesional_salud = ?`;
                const result = yield (0, consultasGenerales_1.consultasGenerales)(query, [this.email]);
                return result;
            }
            catch (err) {
                console.log(err);
                throw new Error("Error en la consulta");
            }
        });
    }
    setEmail(email) {
        this.email = email;
    }
    setContrasena(contrasena) {
        this.contrasena = contrasena;
    }
}
exports.Sesion = Sesion;