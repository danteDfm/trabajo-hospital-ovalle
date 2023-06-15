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
    constructor(fechaIngreso, fechaFinalizacion, estadoFicha, nivelFormulario, apoyoEscolar, judicializacion, detallesApoyo, detallesJudicializacion, fkPaciente, fkUsuario, fkAreaPsiquica, fkHistoria, fkeEncargada, fkAcompanante) {
        this.fechaIngreso = fechaIngreso;
        this.fechaFinalizacion = fechaFinalizacion;
        this.estadoFicha = estadoFicha;
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
    verificarEstado(rutPaciente) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `select estado_ficha, id_ficha_tecnica from fichas_tecnicas as ft
    left join PACIENTES as pa on ft.fk_paciente = pa.id_paciente
    where rut_paciente  = ?  AND estado_ficha = 1
    `;
            const queryUpdate = `update fichas_tecnicas set estado_ficha = 0
    where id_ficha_tecnica = ?`;
            let estado;
            let idFicha;
            try {
                let estadioFicha = yield (0, consultasGenerales_1.consultasGenerales)(query, [rutPaciente]);
                if (!estadioFicha[0])
                    return 0;
                estado = estadioFicha[0].estado_ficha;
                idFicha = estadioFicha[0].id_ficha_tecnica;
                if (estado == 1) {
                    console.log(idFicha);
                    (0, consultasGenerales_1.consultasGenerales)(queryUpdate, [idFicha]);
                }
                return 0;
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
            ;
        });
    }
}
exports.Ficha = Ficha;
