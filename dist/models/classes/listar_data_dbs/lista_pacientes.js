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
exports.DataPaciente = void 0;
const consultasSelect_1 = require("../../../consultas/consultasSelect");
class DataPaciente {
    constructor(idFichaTecnica) {
        this.idFichaTecnica = idFichaTecnica;
        this.idPaciente = 0;
        this.rutPaciente = "";
        this.nombrePaciente = "";
        this.apellidoPaternoPaciente = "";
        this.apellidoMaternoPaciente = "";
        this.pronombre = "";
        this.nombreSocial = "";
        this.fechaNacimientoPaciente = new Date();
        this.domicilioPaciente = "";
        this.fkHabitoAlimenticio = 0;
        this.fkUsoDroga = 0;
        this.fkPresenciaAntecedente = 0;
        this.fkHistoriaIdentidadGenero = 0;
    }
    dataPaciente() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT id_paciente, 
    rut_paciente, 
    nombre_paciente, 
    apellido_paterno_paciente, 
    apellido_materno_paciente, 
    pronombre,  
    nombre_social, 
    fecha_nacimiento_paciente, 
    domicilio_paciente,  
    fk_habito_alimenticio,
    fk_uso_droga, 
    fk_presencia_antecedente,
    fk_historia_identidad_genero FROM fichas_tecnicas ft
    JOIN pacientes AS pa ON ft.fk_paciente = pa.id_paciente
    WHERE id_ficha_tecnica = ?`;
            const data = yield (0, consultasSelect_1.consultarDatos)(query, [this.idFichaTecnica]);
            this.idPaciente = data[0].id_paciente;
            this.rutPaciente = data[0].rut_paciente;
            this.nombrePaciente = data[0].nombrePaciente;
            this.apellidoPaternoPaciente = data[0].apellido_paterno_paciente;
            this.apellidoMaternoPaciente = data[0].apellido_materno_paciente;
            this.pronombre = data[0].pronombre;
            this.nombreSocial = data[0].nombre_social;
            this.fechaNacimientoPaciente = data[0].fecha_nacimiento_paciente;
            this.domicilioPaciente = data[0].domicilio_paciente;
            this.fkHabitoAlimenticio = data[0].fk_habito_alimenticio;
            this.fkUsoDroga = data[0].fk_uso_droga;
            this.fkPresenciaAntecedente = data[0].fk_presencia_antecedente;
            this.fkHistoriaIdentidadGenero = data[0].fk_historia_identidad_genero;
        });
    }
    getIdPaciente() {
        return this.idPaciente;
    }
    getRutPaciente() {
        return this.rutPaciente;
    }
    getNombrePaciente() {
        return this.nombrePaciente;
    }
    getApellidoPaterno() {
        return this.apellidoPaternoPaciente;
    }
    getApellidoMaterno() {
        return this.apellidoMaternoPaciente;
    }
}
exports.DataPaciente = DataPaciente;
