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
exports.Paciente = void 0;
const consultasGenerales_1 = require("../../../consultas/consultasGenerales");
const generaConsultas_1 = require("../../../utils/generaConsultas");
const dicQuery_1 = require("../../../consultas/dicQuery");
class Paciente {
    constructor() { }
    crearPaciente(fkHistoriaGenero, fkAntecedentesFamilia, fkDetallesDrogas, fkHabitosAlimenticios, paciente) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { insertId: idPaciente } = yield (0, consultasGenerales_1.consultasGenerales)(`INSERT INTO PACIENTES VALUES (null, ${(0, generaConsultas_1.repetir)(16)})`, [paciente.rutPaciente,
                    paciente.pasaportePaciente,
                    paciente.nombrePaciente, paciente === null || paciente === void 0 ? void 0 : paciente.apellidoPaternoPaciente, paciente === null || paciente === void 0 ? void 0 : paciente.apellidoMaternoPaciente, paciente === null || paciente === void 0 ? void 0 : paciente.pronombre, paciente === null || paciente === void 0 ? void 0 : paciente.nombreSocial, paciente === null || paciente === void 0 ? void 0 : paciente.fechaNacimientoPaciente, paciente === null || paciente === void 0 ? void 0 : paciente.domicilioPaciente, paciente.telefono, paciente === null || paciente === void 0 ? void 0 : paciente.usoDroga, paciente === null || paciente === void 0 ? void 0 : paciente.antecedenteFamiliares, fkHistoriaGenero,
                    fkAntecedentesFamilia,
                    fkDetallesDrogas,
                    fkHabitosAlimenticios]);
                return idPaciente;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    traerDataPaciente() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataPaciente = yield (0, consultasGenerales_1.consultasGenerales)(` 
        SELECT  id_paciente, pa.rut_paciente,
        pa.nombre_paciente, pa.apellido_paterno_paciente,
        pa.apellido_materno_paciente
        FROM PACIENTES AS pa
        `);
                return dataPaciente;
            }
            catch (err) {
                console.log(err);
                throw new Error();
            }
        });
    }
    traerXRut(rut) {
        return __awaiter(this, void 0, void 0, function* () {
            if (rut.length < 10 || rut.length > 10) {
                return 0;
            }
            const query = `SELECT * FROM pacientes AS pa WHERE pa.rut_paciente LIKE "%${rut}%"`;
            const dataXRut = yield (0, consultasGenerales_1.consultasGenerales)(query);
            return dataXRut;
        });
    }
    crearDetallesPaciente(detallesPaciente) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consultas = {
                    drogas: "INSERT INTO DETALLES_DROGAS VALUES (NULL, ?)",
                    alimenticio: "INSERT INTO HABITOS_ALIMENTICIOS VALUES (NULL, ?)",
                    antecedentesFamilia: "INSERT INTO ANTECEDENTES_FAMILIARES VALUES (NULL, ?)",
                };
                const { insertId: idDrogas } = yield (0, consultasGenerales_1.returnNull)(consultas.drogas, detallesPaciente.detallesDrogas);
                const { insertId: idAlimenticio } = yield (0, consultasGenerales_1.returnNull)(consultas.alimenticio, detallesPaciente.detallesAlimenticios);
                const { insertId: idAFamilia } = yield (0, consultasGenerales_1.returnNull)(consultas.antecedentesFamilia, detallesPaciente.detallesAntecedentes);
                return {
                    idDrogas: idDrogas,
                    idAlimenticio,
                    idAFamilia,
                };
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    mostrarPacienteFicha(rutPaciente) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!rutPaciente || rutPaciente.length < 9 || rutPaciente.length > 9) {
                    return "sin resultdos";
                }
                const paciente = yield (0, consultasGenerales_1.consultasGenerales)(dicQuery_1.dicQuerys.paciente, [
                    parseInt(rutPaciente),
                ]);
                const idPaciente = paciente[0].id_paciente;
                const detalles = yield (0, consultasGenerales_1.consultasGenerales)(dicQuery_1.dicQuerys.detallesPaciente, [idPaciente,]);
                let prenda = yield (0, consultasGenerales_1.consultasGenerales)(dicQuery_1.dicQuerys.seleccionPrenda, [idPaciente]);
                //convertir los valores en arrelgos 
                prenda = prenda.map((result) => { return Object.values(result); });
                const hClinicas = yield (0, consultasGenerales_1.consultasGenerales)(dicQuery_1.dicQuerys.historiasClinicas, [idPaciente]);
                const aFamilia = yield (0, consultasGenerales_1.consultasGenerales)(dicQuery_1.dicQuerys.apoyoFamilia, [idPaciente]);
                const fGenital = yield (0, consultasGenerales_1.consultasGenerales)(dicQuery_1.dicQuerys.funcionalidadGenital, [idPaciente]);
                const juicio = yield (0, consultasGenerales_1.consultasGenerales)(dicQuery_1.dicQuerys.detallesJuicio, [idPaciente]);
                const encargado = yield (0, consultasGenerales_1.consultasGenerales)(dicQuery_1.dicQuerys.encargado, [idPaciente]);
                const acompanante = yield (0, consultasGenerales_1.consultasGenerales)(dicQuery_1.dicQuerys.acompanante, [idPaciente]);
                const areaPsique = yield (0, consultasGenerales_1.consultasGenerales)(dicQuery_1.dicQuerys.areaPsicologica, [idPaciente]);
                const ficha = yield (0, consultasGenerales_1.consultasGenerales)(dicQuery_1.dicQuerys.ficha, [idPaciente]);
                return {
                    paciente: paciente[0],
                    detalles: detalles[0],
                    prenda: prenda,
                    hClinicas: hClinicas[0],
                    aFamilia: aFamilia[0],
                    fGenital: fGenital[0],
                    juicio: juicio[0],
                    encargado: encargado[0],
                    acompanante: acompanante[0],
                    areaPsique: areaPsique[0],
                    ficha: ficha[0],
                };
            }
            catch (err) {
                throw (err);
            }
        });
    }
}
exports.Paciente = Paciente;
