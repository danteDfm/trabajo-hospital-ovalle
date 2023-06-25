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
exports.PaginaPrincipal = void 0;
const consultasGenerales_1 = require("../../consultas/consultasGenerales");
class PaginaPrincipal {
    TotalPacientes() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalPacientes = yield (0, consultasGenerales_1.consultasGenerales)(`SELECT COUNT(id_paciente) AS "paciente" FROM pacientes`);
            return totalPacientes[0];
        });
    }
    cantidadGeneros(genero) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield (0, consultasGenerales_1.consultasGenerales)(`SELECT count(identidad_genero) AS "generos" FROM historias_identidades_generos
        WHERE identidad_genero = ?`, [genero]);
            return result.generos;
        });
    }
    ingresosDelDia() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT count(id_ficha_tecnica) as ingresosDia FROM fichas_tecnicas WHERE DATE(fecha_ingreso) = CURDATE();`;
            const result = yield (0, consultasGenerales_1.consultasGenerales)(query);
            return result[0];
        });
    }
    estadisticaAreaPsiquica() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
        select 
        control_equipo_salud_mental
        from AREAS_PSIQUICAS where control_equipo_salud_mental = 1 `;
            const total = `
        select 
        control_equipo_salud_mental
        from AREAS_PSIQUICAS`;
            const dataAreaPsiquica = yield (0, consultasGenerales_1.consultasGenerales)(query);
            //personas que usan drogas/total de personas
        });
    }
    estadisticasDisforia() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `select presencia_disforia  from HISTORIAS_IDENTIDADES_GENEROS`;
            try {
                let porcentajeDis;
                let personasConDisforia = [];
                const resultado = yield (0, consultasGenerales_1.consultasGenerales)(query);
                for (let i = 0; i < resultado.length; i++) {
                    if (resultado[i].presencia_disforia == 1) {
                        personasConDisforia.push(resultado[i].presencia_disforia);
                    }
                }
                porcentajeDis = (personasConDisforia.length / resultado.length) * 100;
                porcentajeDis = porcentajeDis.toFixed(2);
                return parseFloat(porcentajeDis);
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    estadisticasApoyo() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `select apoyo_nucleo_familiar from HISTORIAS_IDENTIDADES_GENEROS`;
            try {
                let porcentajeapoyo;
                let apoyo = [];
                const resultado = yield (0, consultasGenerales_1.consultasGenerales)(query);
                for (let i = 0; i < resultado.length; i++) {
                    if (resultado[i].apoyo_nucleo_familiar == 1) {
                        apoyo.push(resultado[i].apoyo_nucleo_familiar);
                    }
                }
                porcentajeapoyo = (apoyo.length / resultado.length) * 100;
                porcentajeapoyo = porcentajeapoyo.toFixed(2);
                return parseFloat(porcentajeapoyo);
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    estadisticasDrogas() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT uso_droga FROM  HISTORIAL_DROGAS`;
            try {
                let porcentajeDrogas;
                let siUsa = [];
                const resultado = yield (0, consultasGenerales_1.consultasGenerales)(query);
                for (let i = 0; i < resultado.length; i++) {
                    if (resultado[i].uso_droga == 1) {
                        siUsa.push(resultado[i].uso_droga);
                    }
                }
                porcentajeDrogas = (siUsa.length / resultado.length) * 100;
                porcentajeDrogas = porcentajeDrogas.toFixed(2);
                return parseFloat(porcentajeDrogas);
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    estadisticasFarmacos() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `select utilizacion_farmaco from AREAS_PSIQUICAS`;
            try {
                let porcentajeFarmacos;
                let siUsa = [];
                const resultado = yield (0, consultasGenerales_1.consultasGenerales)(query);
                for (let i = 0; i < resultado.length; i++) {
                    if (resultado[i].utilizacion_farmaco == 1) {
                        siUsa.push(resultado[i].utilizacion_farmaco);
                    }
                }
                porcentajeFarmacos = (siUsa.length / resultado.length) * 100;
                porcentajeFarmacos = porcentajeFarmacos.toFixed(2);
                return parseFloat(porcentajeFarmacos);
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    areapsiquica() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `select 
    control_equipo_salud_mental,
    psicoterapia,
    evaluacion_psiquica,
    diagnostico_psiquiatrico
    from AREAS_PSIQUICAS`;
            let ControlEquipo = [];
            let psicoterapia = [];
            let psiquica = [];
            let psiquiatrica = [];
            try {
                let dataTotal = yield (0, consultasGenerales_1.consultasGenerales)(query);
                let pacientesEnControl = [];
                let pacientesEnpsico = [];
                let pacientesEvaluacionPsiquica = [];
                let conDiagnosticoPsiquiatrico = [];
                for (let i = 0; i < dataTotal.length; i++) {
                    if (dataTotal[i].control_equipo_salud_mental) {
                        ControlEquipo.push(dataTotal[i].control_equipo_salud_mental);
                    }
                    if (dataTotal[i].psicoterapia) {
                        psicoterapia.push(dataTotal[i].psicoterapia);
                    }
                    if (dataTotal[i].evaluacion_psiquica) {
                        psiquica.push(dataTotal[i].evaluacion_psiquica);
                    }
                    if (dataTotal[i].diagnostico_psiquiatrico) {
                        psiquiatrica.push(dataTotal[i].diagnostico_psiquiatrico);
                    }
                }
                const totalEnControl = ControlEquipo.length;
                const totalEnpsico = psicoterapia.length;
                const totalEnEvalu = psiquica.length;
                const totalPsiquiatrica = psiquiatrica.length;
                return {
                    totalEnControl,
                    totalEnpsico,
                    totalEnEvalu,
                    totalPsiquiatrica
                };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.PaginaPrincipal = PaginaPrincipal;
