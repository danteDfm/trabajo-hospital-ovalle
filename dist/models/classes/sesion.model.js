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
const generarToken_1 = require("../../utils/jwt/generarToken");
class Sesion {
    constructor(email, contrasena) {
        this.email = email;
        this.contrasena = contrasena;
        this.objToken = new generarToken_1.Token();
    }
    login(idProfesional, rol) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.objToken.formarPayload(idProfesional, rol);
                const tokenJwt = this.objToken.generarToken();
                return tokenJwt;
            }
            catch (err) {
                throw err;
            }
        });
    }
    verificarToken(token) {
        var _a;
        try {
            const tokenFormat = (_a = token.split(" ").pop()) === null || _a === void 0 ? void 0 : _a.toString();
            if (!tokenFormat)
                throw { ok: false };
            const data = this.objToken.verificarToken(tokenFormat);
            return data;
        }
        catch (err) {
            throw err;
        }
    }
    seleccionarUsuario(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
    select id_profesional_salud, nombre_profesional_salud, cargo_profesional_salud,
    roles, comuna_centro_atencion, nombre_centro_salud ,logo  from PROFESIONALES_USUARIOS_SALUD as ps
    left join CENTROS_SALUD as cs on ps.fk_centro_salud = cs.id_centro_salud
    where id_profesional_salud  = ?;
    `;
            try {
                if (!idUser)
                    throw "id vacio";
                const dataUsuario = yield (0, consultasGenerales_1.consultasGenerales)(query, [idUser]);
                return dataUsuario[0];
            }
            catch (err) {
                console.log(err);
                throw new Error("Error en la solicitud");
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
