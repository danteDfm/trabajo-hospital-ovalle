"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuario = void 0;
const consultasGenerales_1 = require("../../consultas/consultasGenerales");
class usuario {
    //admin 
    //commonUser
    constructor(rutProfesional, nombreProfesional, cargoProfesional, contrasenaProfesional, emailProfesional, centroProfesional, rolProfesional) {
        this.rutProfesional = rutProfesional;
        this.nombreProfesional = nombreProfesional;
        this.emailProfesional = cargoProfesional;
        this.cargoProfesional = contrasenaProfesional;
        this.contrasenaProfesional = emailProfesional;
        this.centroProfesional = centroProfesional;
        this.rolProfesional = rolProfesional;
    }
    ingresarUsuario() {
        try {
            const query = `
            INSERT INTO PROFESIONALES_USUARIOS_SALUD VALUES (NULL, ?,?,?,?,?,?,?)`;
            (0, consultasGenerales_1.consultasGenerales)(query, [
                this.rutProfesional,
                this.nombreProfesional,
                this.emailProfesional,
                this.cargoProfesional,
                this.contrasenaProfesional,
                this.centroProfesional,
                this.rolProfesional
            ]);
        }
        catch (err) {
            console.log(err);
            throw new Error("Erro al crear el usuario");
        }
    }
}
exports.usuario = usuario;
