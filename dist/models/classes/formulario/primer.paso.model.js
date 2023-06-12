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
const Pacientes_1 = require("../entidades_dbs/Pacientes");
class FormularioPrimerPaso extends Pacientes_1.EntidadPaciente {
    constructor(primerPaso, fichaTecncica) {
        super(fichaTecncica);
        //
        this.nivel = "paso1";
        this.involucrado = {
            rutInvolucrado: primerPaso.involucrado.rutInvolucrado || null,
            nombreInvolucrado: primerPaso.involucrado.nombreInvolucrado || null,
            apellidoPInvolucrado: primerPaso.involucrado.apellidoPInvolucrado || null,
            apellidoMInvolucrado: primerPaso.involucrado.apellidoMInvolucrado || null,
            parentescoInvolucrado: primerPaso.involucrado.parentescoInvolucrado || null,
            telefonoInvolucrado: primerPaso.involucrado.telefonoInvolucrado || null,
            domicilioInvolucrado: primerPaso.involucrado.domicilioInvolucrado || null,
            fechaNacimiento: primerPaso.involucrado.fechaNacimiento || null
        };
        this.acompanante = {
            rutInvolucrado: primerPaso.acompanante.rutInvolucrado || null,
            nombreInvolucrado: primerPaso.acompanante.nombreInvolucrado || null,
            apellidoPInvolucrado: null,
            apellidoMInvolucrado: null,
            parentescoInvolucrado: primerPaso.acompanante.parentescoInvolucrado || null,
            telefonoInvolucrado: primerPaso.acompanante.telefonoInvolucrado || null,
            domicilioInvolucrado: null,
            fechaNacimiento: null
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
}
exports.FormularioPrimerPaso = FormularioPrimerPaso;
