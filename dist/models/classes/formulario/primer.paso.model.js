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
exports.FormularioPrimerPaso = void 0;
const __1 = require("../../..");
const pacientes_1 = require("../pacientes");
const consultasGenerales_1 = require("../../../consultas/consultasGenerales");
class FormularioPrimerPaso extends pacientes_1.EntidadPaciente {
    constructor(primerPaso, fichaTecncica) {
        super(fichaTecncica);
        //
        this.nivel = "paso1";
        this.involucrado = {
            rutInvolucrado: primerPaso.involucrado.rutInvolucrado || null,
            nombreInvolucrado: primerPaso.involucrado.nombreInvolucrado || null,
            apellidoPInvolucrado: primerPaso.involucrado.apellidoPInvolucrado || null,
            apellidoMInvolucrado: primerPaso.involucrado.apellidoMInvolucrado || null,
            fechaNacimiento: primerPaso.involucrado.fechaNacimiento || null,
            parentescoInvolucrado: primerPaso.involucrado.parentescoInvolucrado || null,
            telefonoInvolucrado: primerPaso.involucrado.telefonoInvolucrado || null,
            domicilioInvolucrado: primerPaso.involucrado.domicilioInvolucrado || null,
        };
        this.acompanante = {
            rutInvolucrado: primerPaso.acompanante.rutInvolucrado || null,
            nombreInvolucrado: primerPaso.acompanante.nombreInvolucrado || null,
            apellidoPInvolucrado: null,
            apellidoMInvolucrado: null,
            fechaNacimiento: null,
            parentescoInvolucrado: primerPaso.acompanante.parentescoInvolucrado || null,
            telefonoInvolucrado: primerPaso.acompanante.telefonoInvolucrado || null,
            domicilioInvolucrado: null,
        };
    }
    guardarPrimerPaso() {
        return __awaiter(this, void 0, void 0, function* () {
            const objConexion = yield __1.mysqlConnexion;
            const arregloInvolucrado = Object.values(this.involucrado);
            const arregloAcompanante = Object.values(this.acompanante);
            const query2 = "INSERT INTO  PERSONAS_INVOLUCRADAS_TRANSICION VALUES (null, ?,?,?,?,?,?,?,?)";
            try {
                const [setHeaderInvolucrado] = yield (objConexion === null || objConexion === void 0 ? void 0 : objConexion.query(query2, arregloInvolucrado));
                const [setHeaderAcompanante] = yield (objConexion === null || objConexion === void 0 ? void 0 : objConexion.query(query2, arregloAcompanante));
                const idInvolucrado = setHeaderInvolucrado.insertId;
                const idAcompanante = setHeaderAcompanante.insertId;
                return {
                    idInvolucrado,
                    idAcompanante,
                };
            }
            catch (err) {
                console.log(err);
                throw {
                    status: "failure",
                    msj: "Error en consulta",
                };
            }
        });
    }
    actualizarprimerPaso(idPeronsaInvo, idPersonaAcom) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `UPDATE PERSONAS_INVOLUCRADAS_TRANSICION 
    SET nombres_persona_involucrada = ?, apellido_paterno_persona_involucrada  = ?, apellido_materno_persona_involucrada = ?, 
    parentesco_persona_involucrada = ?,
    telefono_persona_involucrada = ?, 
    domicilio_persona_involucrada  = ?
    WHERE id_persona_involucrada_transicion  = ?
    `;
            try {
                if (!idPeronsaInvo)
                    return 0;
                yield (0, consultasGenerales_1.consultasGenerales)(query, [
                    this.involucrado.nombreInvolucrado,
                    this.involucrado.apellidoPInvolucrado,
                    this.involucrado.apellidoMInvolucrado,
                    this.involucrado.parentescoInvolucrado,
                    this.involucrado.telefonoInvolucrado,
                    this.involucrado.domicilioInvolucrado,
                    idPeronsaInvo
                ]);
                if (!idPersonaAcom)
                    return 0;
                yield (0, consultasGenerales_1.consultasGenerales)(query, [
                    this.acompanante.nombreInvolucrado,
                    this.acompanante.apellidoPInvolucrado,
                    this.acompanante.apellidoMInvolucrado,
                    this.acompanante.parentescoInvolucrado,
                    this.acompanante.telefonoInvolucrado,
                    this.acompanante.domicilioInvolucrado,
                    idPersonaAcom
                ]);
                return "Los datos han sido actualizados: primer paso";
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.FormularioPrimerPaso = FormularioPrimerPaso;
