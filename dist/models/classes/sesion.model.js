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
const hash_contrasena_1 = require("../../utils/bcrypt/hash.contrasena");
const generarToken_1 = require("../../utils/jwt/generarToken");
class Sesion {
    constructor(email, contrasena) {
        this.email = email;
        this.contrasena = contrasena;
        this.objToken = new generarToken_1.Token();
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
    SELECT email_profesional_salud, contrasena, id_profesional_salud, roles FROM profesionales_usuarios_salud
    WHERE email_profesional_salud = ?`;
            try {
                if (!this.email || !this.contrasena) {
                    throw {
                        error: "Los datos no puede estar vacios",
                        code: 101,
                    };
                }
                const result = yield (0, consultasGenerales_1.consultasGenerales)(query, [this.email]);
                if (!result[0]) {
                    throw {
                        error: "EL email no se encuentra en la base de datos",
                        code: 102,
                    };
                }
                const verificacion = yield (0, hash_contrasena_1.compararContrasena)(this.contrasena, result[0].contrasena);
                if (!verificacion) {
                    throw {
                        error: "Contraseña es invalida",
                        code: 103,
                    };
                }
                this.objToken.formarPayload(result[0].id_profesional_salud, result[0].roles);
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
