"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vericarDataUsuario = void 0;
function vericarDataUsuario(req, res, next) {
    let { rutProfesional, nombreProfesional, cargoProfesional, contrasenaProfesional, emailProfesional, centroProfesional, rolProfesional, } = req.body;
    try {
        if (!rutProfesional || !emailProfesional || !contrasenaProfesional || !nombreProfesional || !centroProfesional || !cargoProfesional || !rolProfesional) {
            throw ({
                msj: 'Los datos no deben estar vacios'
            });
        }
        next();
    }
    catch (err) {
        res.status(400).json(err.msj);
    }
}
exports.vericarDataUsuario = vericarDataUsuario;
