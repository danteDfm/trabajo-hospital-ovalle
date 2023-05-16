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
const consultasGenerales_1 = require("../../../consultas/consultasGenerales");
class Ficha {
    constructor(apoyoEscolar, judicializacion, fkUsuario, fkPaciente, fkApoyo, fkJuicio, fkAreaPsiquica, fkFuncionalidadG, fkHistoriasClinicas, fkPersonaEncargada, fkPersonaAcompanante, fechaIngreso, borrado) {
        this.apoyoEscolar = apoyoEscolar;
        this.judicializacion = judicializacion;
        this.fkUsuario = fkUsuario;
        this.fkPaciente = fkPaciente;
        this.fkApoyo = fkApoyo;
        this.fkJuicio = fkJuicio;
        this.fkAreaPsiquica = fkAreaPsiquica;
        this.fkFuncionalidadG = fkFuncionalidadG;
        this.fkHistoriasClinicas = fkHistoriasClinicas;
        this.fkPersonaEncargada = fkPersonaEncargada;
        this.fkPersonaAcompanante = fkPersonaAcompanante;
        this.fechaIngreso = fechaIngreso;
        this.borrado = borrado;
    }
    crearFicha() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("?,".repeat(13).slice(0, -1));
                const query = `INSERT INTO FICHAS_TECNICAS VALUES (null, ${"?,".repeat(13).slice(0, -1)})`;
                const { insertId: idFicha } = yield (0, consultasGenerales_1.consultasGenerales)(query, [
                    this.fechaIngreso,
                    this.borrado,
                    this.apoyoEscolar,
                    this.judicializacion,
                    this.fkUsuario,
                    this.fkPaciente,
                    this.fkApoyo,
                    this.fkJuicio,
                    this.fkAreaPsiquica,
                    this.fkFuncionalidadG,
                    this.fkHistoriasClinicas,
                    this.fkPersonaEncargada,
                    this.fkPersonaAcompanante,
                ]);
                return idFicha;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    static historiasClinicas(antecedentes) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "INSERT INTO HISTORIAS_CLINICAS VALUES (NULL, ?,?,?,?,?)";
                const { insertId: idAntecedentes } = yield (0, consultasGenerales_1.consultasGenerales)(query, [
                    antecedentes.perinatales,
                    antecedentes.hospitalizaciones,
                    antecedentes.quirurgicos,
                    antecedentes.alergicos,
                    antecedentes.pni,
                ]);
                return idAntecedentes;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    static personaEncargadas(encargada) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "INSERT INTO PERSONAS_INVOLUCRADAS_TRANSICION VALUES (NULL, ?,?,?,?,?,?,?,?)";
                const { insertId: idInvolucrado } = yield (0, consultasGenerales_1.consultasGenerales)(query, [
                    encargada.rutInvolucrada,
                    encargada.nombresInvolucrada,
                    encargada.apellidoPInvolucrada,
                    encargada.apellidoMInvolucrada,
                    encargada.parentescoInvolucrada,
                    encargada.responsabilidadInvolucrada,
                    encargada.telefonoInvolucrada,
                    encargada.domicilioInvolucrada,
                ]);
                return idInvolucrado;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    static detallesFicha(detalleApoyo, aGenital, detalleJuicio, detallesFarmacos) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "INSERT INTO ANTECEDENTES_FUNCIONALIDADES_GENITAL VALUES (null, ?)";
                const queryA = "INSERT INTO DETALLES_APOYO VALUES (NULL, ?)";
                const queryJ = "INSERT INTO  DETALLES_JUICIO VALUES (NULL, ?)";
                const queryF = "INSERT INTO  TIPOS_FARMACOS VALUES (NULL, ?)";
                const { insertId: idIndGenital } = yield (0, consultasGenerales_1.consultasGenerales)(query, [aGenital]);
                const { insertId: idDetalleApoyo } = yield (0, consultasGenerales_1.returnNull)(queryA, detalleApoyo);
                const { insertId: idDetalleJuicio } = yield (0, consultasGenerales_1.returnNull)(queryJ, detalleJuicio);
                const { insertId: idFarmacos } = yield (0, consultasGenerales_1.returnNull)(queryF, detallesFarmacos);
                return {
                    idIndGenital,
                    idDetalleApoyo,
                    idDetalleJuicio,
                    idFarmacos,
                };
            }
            catch (err) {
                console.log(err);
                throw (err);
            }
        });
    }
    static areasPsiquicas(psique, idFarmacos) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "INSERT INTO AREAS_PSIQUICAS VALUES (NULL, ?,?,?,?,?,?)";
                const { insertId: idAreapsiquica } = yield (0, consultasGenerales_1.consultasGenerales)(query, [
                    psique.controlEquipo,
                    psique.psicoterapia,
                    psique.evolucionPsiquica,
                    psique.diagnosticoPsiquiatrico,
                    psique.utilizacionFarmaco,
                    idFarmacos,
                ]);
                return idAreapsiquica;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
}
exports.Ficha = Ficha;
