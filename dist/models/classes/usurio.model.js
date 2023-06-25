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
const consultasGenerales_1 = require("../../consultas/consultasGenerales");
class Usuario {
    //admin
    //commonUser
    constructor(rutProfesional, nombreProfesional, contrasenaProfesional, cargoProfesional, rolProfesional, centroProfesional) {
        this.rutProfesional = rutProfesional;
        this.nombreProfesional = nombreProfesional;
        this.contrasenaProfesional = contrasenaProfesional;
        this.cargoProfesional = cargoProfesional;
        this.rolProfesional = rolProfesional;
        this.centroProfesional = centroProfesional;
    }
    ingresarUsuario() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `INSERT INTO PROFESIONALES_USUARIOS_SALUD VALUES (NULL,?,?,?,?,?,?)`;
                yield (0, consultasGenerales_1.consultasGenerales)(query, [
                    this.rutProfesional,
                    this.nombreProfesional,
                    this.contrasenaProfesional,
                    this.cargoProfesional,
                    this.rolProfesional,
                    this.centroProfesional
                ]);
                return "Usuario ha sido creado";
            }
            catch (err) {
                console.log(err);
                throw "Error al crear el usuario";
            }
        });
    }
    actualizarUsuario(idProfesionalSalud) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
      UPDATE PROFESIONALES_USUARIOS_SALUD SET
      rut_profesional_salud = ?, 
      nombre_usuario = ?,
      contrasena = ?,
      cargo_profesional_salud  = ?,
      fk_centro_salud = ?
      WHERE id_profesional_salud = ?`;
                (0, consultasGenerales_1.consultasGenerales)(query, [
                    this.rutProfesional,
                    this.nombreProfesional,
                    this.contrasenaProfesional,
                    this.cargoProfesional,
                    this.centroProfesional,
                    idProfesionalSalud,
                ]);
                return "Los cambios se han guardado correctamente";
            }
            catch (err) {
                console.log(err);
                throw "Error al actualizar usuario";
            }
        });
    }
    listarUsuarios(nombreCentro) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
      SELECT
      id_profesional_salud,
      rut_profesional_salud,
      nombre_usuario,
      cargo_profesional_salud, 
      roles,
      nombre_centro_salud 
      FROM PROFESIONALES_USUARIOS_SALUD as ps
      join CENTROS_SALUD as cs ON ps.fk_centro_salud = cs.id_centro_salud where roles = "commonUser"
      AND  nombre_centro_salud  = ?
      `;
                const listUsuarios = yield (0, consultasGenerales_1.consultasGenerales)(query, [nombreCentro]);
                return listUsuarios;
            }
            catch (err) {
                console.log(err);
                throw "Error consulta listar usuario";
            }
        });
    }
    exitenciaUsuario(rutProfesional) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT EXISTS (SELECT 1 FROM PROFESIONALES_USUARIOS_SALUD WHERE rut_profesional_salud = ?) AS existe_registro;";
                const existe = yield (0, consultasGenerales_1.consultasGenerales)(query, [rutProfesional]);
                return existe[0].existe_registro;
            }
            catch (err) {
                console.log(err);
                throw "Error en la cosulta, existencia usuario";
            }
        });
    }
    setRutProfesional(rutProfesional) {
        this.rutProfesional = rutProfesional;
    }
    setNombreProfesional(nombreProfesional) {
        this.nombreProfesional = nombreProfesional;
    }
    setCargoProfesional(cargoProfesional) {
        this.cargoProfesional = cargoProfesional;
    }
    setContrasenaProfesional(contrasenaProfesional) {
        this.contrasenaProfesional = contrasenaProfesional;
    }
    setCentroProfesional(centroProfesional) {
        this.centroProfesional = centroProfesional;
    }
    setRolProfesional(rolProfesional) {
        this.rolProfesional = rolProfesional;
    }
}
exports.Usuario = Usuario;
