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
exports.Ficha = void 0;
const consultasGenerales_1 = require("../../consultas/consultasGenerales");
class Ficha {
    constructor(fechaIngreso, nivelFormulario, apoyoEscolar, judicializacion, detallesApoyo, detallesJudicializacion, fkPaciente, fkUsuario, fkAreaPsiquica, fkHistoria, fkeEncargada, fkAcompanante) {
        this.fechaIngreso = fechaIngreso;
        this.nivelFormulario = nivelFormulario;
        this.apoyoEscolar = apoyoEscolar;
        this.judicializacion = judicializacion;
        this.detallesApoyo = detallesApoyo;
        this.detallesJudicializacion = detallesJudicializacion;
        this.fkPaciente = fkPaciente;
        this.fkUsuario = fkUsuario;
        this.fkAreaPsiquica = fkAreaPsiquica;
        this.fkHistoria = fkHistoria;
        this.fkeEncargada = fkeEncargada;
        this.fkAcompanante = fkAcompanante;
    }
    constructo(fechaIngreso, nivelFormulario, fkPaciente, fkUsuario, fkeEncargada, fkAcompanante) {
        this.fechaIngreso = fechaIngreso;
        this.nivelFormulario = nivelFormulario;
        this.fkPaciente = fkPaciente;
        this.fkUsuario = fkUsuario;
        this.fkeEncargada = fkeEncargada;
        this.fkAcompanante = fkAcompanante;
    }
    crearFicha() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
        insert into fichas_tecnicas
        (fecha_ingreso,
        nivelFormulario,
        fk_paciente,
        fk_profesional_usuario,
        fk_persona_involucrada_encargada,
        fk_persona_involucrada_acompanante)
        VALUES (?,?,?,?,?,?)`;
            try {
                yield (0, consultasGenerales_1.consultasGenerales)(query, [
                    this.fechaIngreso,
                    this.nivelFormulario,
                    this.fkPaciente,
                    this.fkUsuario,
                    this.fkeEncargada,
                    this.fkAcompanante,
                ]);
                return `Ficha ha sido creada correctamente`;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    actualizarFicha(fechaIngreso, nivel, idFicha) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `UPDATE fichas_tecnicas 
    SET fecha_ingreso = ?, nivelFormulario = ? 
    WHERE  id_ficha_tecnica = ?
    `;
            try {
                yield (0, consultasGenerales_1.consultasGenerales)(query, [fechaIngreso, nivel, idFicha]);
                return "La ficha ha sido actulizada con los nuevos datos correctamente";
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    crearFichaTecnica(estado) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `INSERT INTO fichas_tecnicas(
        fecha_ingreso,
        estado_ficha,
        nivelFormulario, 
        apoyo_escolar,
        judicializacion,
        detalles_apoyo_es,
        detalles_judicializacion,
        fk_paciente,
        fk_profesional_usuario,
        fk_area_psiquica,
        fk_historia_clinica,
        fk_persona_involucrada_encargada,
        fk_persona_involucrada_acompanante)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            try {
                yield (0, consultasGenerales_1.consultasGenerales)(query, [
                    this.fechaIngreso,
                    estado,
                    this.nivelFormulario,
                    this.apoyoEscolar,
                    this.judicializacion,
                    this.detallesApoyo,
                    this.detallesJudicializacion,
                    this.fkPaciente,
                    this.fkUsuario,
                    this.fkAreaPsiquica,
                    this.fkHistoria,
                    this.fkeEncargada,
                    this.fkAcompanante,
                ]);
                return `Los datos han sido creado correctamente`;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    verificarEstado(rutPaciente) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `select estado_ficha, id_ficha_tecnica from fichas_tecnicas as ft
    left join PACIENTES as pa on ft.fk_paciente = pa.id_paciente
    where rut_paciente  = ?  AND estado_ficha = 1
    `;
            const queryUpdate = `update fichas_tecnicas set estado_ficha = 0,
    nivelFormulario  = 0
    where id_ficha_tecnica = ?`;
            let estado;
            let idFicha;
            let idPaciente;
            console.log(idFicha);
            try {
                let estadioFicha = yield (0, consultasGenerales_1.consultasGenerales)(query, [rutPaciente]);
                if (!estadioFicha[0])
                    return 0;
                estado = estadioFicha[0].estado_ficha;
                idFicha = estadioFicha[0].id_ficha_tecnica;
                idPaciente = estadioFicha[0].id_paciente;
                if (estado == 1) {
                    console.log(idFicha);
                    (0, consultasGenerales_1.consultasGenerales)(queryUpdate, [idFicha]);
                    return idPaciente;
                }
                return 0;
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
}
exports.Ficha = Ficha;
