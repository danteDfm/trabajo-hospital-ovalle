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
exports.Usuario = void 0;
const consultasGenerales_1 = require("../../../consultas/consultasGenerales");
class Usuario {
    constructor(profesional) {
        this.rutProfesionalSalud = profesional === null || profesional === void 0 ? void 0 : profesional.rutProfesional;
        this.nombreProfesionalSalud = profesional === null || profesional === void 0 ? void 0 : profesional.nombreProfesional;
        this.emailProfesionalSalud = profesional === null || profesional === void 0 ? void 0 : profesional.nombreProfesional;
        this.contrasena = profesional === null || profesional === void 0 ? void 0 : profesional.contrasena;
        this.cargoProfesionalSalud = profesional === null || profesional === void 0 ? void 0 : profesional.cargoProfesional;
        this.centroSalud = profesional === null || profesional === void 0 ? void 0 : profesional.centroSalud;
    }
    crearProfesional() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `INSERT INTO  PROFESIONALES_USUARIOS_SALUD
      VALUES (NULL, ?,?  ,? ,? ,? ,?)`;
                const objqueryCrear = yield (0, consultasGenerales_1.consultasGenerales)(query, [
                    this.rutProfesionalSalud,
                    this.nombreProfesionalSalud,
                    this.emailProfesionalSalud,
                    this.cargoProfesionalSalud,
                    this.centroSalud,
                    this.contrasena,
                ]);
                console.log(objqueryCrear);
            }
            catch (err) {
                throw (err);
            }
        });
    }
    listarProfesional(id) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT * FROM PROFESIONALES_USUARIOS_SALUD WHERE id_profesional_salud = ?";
                const dataProfesional = yield (0, consultasGenerales_1.consultasGenerales)(query, [id]);
                this.rutProfesionalSalud = yield ((_a = dataProfesional[0]) === null || _a === void 0 ? void 0 : _a.rut_profesional_salud);
                this.nombreProfesionalSalud = yield ((_b = dataProfesional[0]) === null || _b === void 0 ? void 0 : _b.nombre_profesional_salud);
                this.emailProfesionalSalud = yield ((_c = dataProfesional[0]) === null || _c === void 0 ? void 0 : _c.email_profesional_salud);
                this.cargoProfesionalSalud = yield ((_d = dataProfesional[0]) === null || _d === void 0 ? void 0 : _d.cargo_profesional_salud);
                this.centroSalud = yield ((_e = dataProfesional[0]) === null || _e === void 0 ? void 0 : _e.fk_centro_salud);
                this.contrasena = yield ((_f = dataProfesional[0]) === null || _f === void 0 ? void 0 : _f.constrasena);
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    actualizarProfesional() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `UPDATE PROFESIONALES_USUARIOS_SALUD SET email_profesional_salud = ?,
      cargo_profesional_salud = ?,
      fk_centro_salud = ?,
      contrasena = ? 
      WHERE rut_profesional = ?
    `;
                const dataProfesional = yield (0, consultasGenerales_1.consultasGenerales)(query, [
                    this.emailProfesionalSalud,
                    this.cargoProfesionalSalud,
                    this.centroSalud,
                    this.contrasena,
                    this.rutProfesionalSalud,
                ]);
                return dataProfesional;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    getNombre() {
        return this.nombreProfesionalSalud;
    }
    getRut() {
        return this.rutProfesionalSalud;
    }
    getEmail() {
        return this.emailProfesionalSalud;
    }
    getContrasena() {
        return this.contrasena;
    }
    getCargo() {
        return this.cargoProfesionalSalud;
    }
    getCentro() {
        return this.centroSalud;
    }
}
exports.Usuario = Usuario;
