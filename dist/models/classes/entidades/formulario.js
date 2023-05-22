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
exports.Formulario = void 0;
const __1 = require("../../..");
class Formulario {
    constructor(paciente, ficha, prenda, historiGen, areaPsiquica, encargada, acompanante, antecedentes) {
        this.paciente = paciente;
        this.ficha = ficha;
        this.prenda = prenda;
        this.historiaGen = historiGen;
        this.areaPsiquica = areaPsiquica;
        this.encargada = encargada;
        this.acompanante = acompanante;
        this.antecedentes = antecedentes;
    }
    crearFicha(idUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const genero = Object.values(this.historiaGen);
            const prendaYdieta = Object.values(this.prenda);
            const areaPsiquica = Object.values(this.areaPsiquica);
            const encargada = Object.values(this.encargada);
            const acompanante = Object.values(this.acompanante);
            const antecedentes = Object.values(this.antecedentes);
            const paciente = Object.values(this.paciente);
            const ficha = Object.values(this.ficha);
            const prenda = prendaYdieta[1];
            const dieta = prendaYdieta[0];
            const conexion = yield __1.mysqlConnexion;
            try {
                yield (conexion === null || conexion === void 0 ? void 0 : conexion.beginTransaction());
                const [dataGen] = yield (conexion === null || conexion === void 0 ? void 0 : conexion.query("INSERT INTO HISTORIAS_IDENTIDADES_GENEROS VALUES(NULL, ?,?,?,?,?,?,?,?)", genero));
                const idHistoriGen = dataGen.insertId;
                prenda.map((data) => __awaiter(this, void 0, void 0, function* () {
                    yield (conexion === null || conexion === void 0 ? void 0 : conexion.query(`INSERT INTO SELECCION_PRENDA VALUES (NULL, ${idHistoriGen}, ?)`, data));
                }));
                const [dataDieta] = yield (conexion === null || conexion === void 0 ? void 0 : conexion.query("INSERT INTO HABITOS_ALIMENTICIOS VALUES (NULL, ?)", [dieta]));
                const idDieta = dataDieta.insertId;
                paciente.push(idHistoriGen);
                paciente.push(idDieta);
                const [dataPaciente] = yield (conexion === null || conexion === void 0 ? void 0 : conexion.query(`INSERT INTO PACIENTES VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, paciente));
                const [dataAreaPsiquica] = yield (conexion === null || conexion === void 0 ? void 0 : conexion.query("INSERT INTO AREAS_PSIQUICAS VALUES (NULL, ?,?,?,?,?,?)", areaPsiquica));
                const [dataEncargada] = yield (conexion === null || conexion === void 0 ? void 0 : conexion.query("INSERT INTO PERSONAS_INVOLUCRADAS_TRANSICION VALUES (NULL, ?,?,?,?,?,?,?,?)", encargada));
                const [dataAcompanante] = yield (conexion === null || conexion === void 0 ? void 0 : conexion.query("INSERT INTO PERSONAS_INVOLUCRADAS_TRANSICION VALUES (NULL, ?,?,?,?,?,?,?,?)", acompanante));
                const [dataAntecedentes] = yield (conexion === null || conexion === void 0 ? void 0 : conexion.query("INSERT INTO HISTORIAS_CLINICAS VALUES (NULL, ?,?,?,?,?,?)", antecedentes));
                const idPaciente = dataPaciente.insertId;
                const idPsique = dataAreaPsiquica.insertId;
                const idAntecedente = dataAntecedentes.insertId;
                const idEncargada = dataEncargada.insertId;
                const idAcompanante = dataAcompanante.insertId;
                ficha.push(idUsuario);
                ficha.push(idPaciente);
                ficha.push(idPsique);
                ficha.push(idAntecedente);
                ficha.push(idEncargada);
                ficha.push(idAcompanante);
                const [dataForm] = yield (conexion === null || conexion === void 0 ? void 0 : conexion.query("INSERT INTO fichas_tecnicas VALUES (NULL, ?,?,?,?,?,?,?,?,?,?,?,?)", ficha));
                const idFicha = dataForm.insertId;
                yield (conexion === null || conexion === void 0 ? void 0 : conexion.commit());
                return idFicha;
            }
            catch (err) {
                conexion === null || conexion === void 0 ? void 0 : conexion.rollback();
                console.log(err);
                throw err;
            }
        });
    }
}
exports.Formulario = Formulario;
