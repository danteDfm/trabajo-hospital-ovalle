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
exports.FormularioController = void 0;
const primer_paso_model_1 = require("../models/classes/formulario/primer.paso.model");
const espesificarFecha_1 = require("../utils/espesificarFecha");
const segundo_paso_model_1 = require("../models/classes/formulario/segundo.paso.model");
const tercer_paso_model_1 = require("../models/classes/formulario/tercer.paso.model");
const cuarto_paso_model_1 = require("../models/classes/formulario/cuarto.paso.model");
const dicQuery_1 = require("../consultas/dicQuery");
class FormularioController {
    static primerPasoController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `INSERT INTO FICHAS_TECNICAS (fecha_ingreso, estado_ficha, borrado_logico,nivelFormulario ,fk_paciente, fk_profesional_usuario, fk_persona_involucrada_encargada, fk_persona_involucrada_acompanante) VALUES (?,?,?,?,?,?, ?,?)`;
                const { idUsuario } = req.params;
                const { paciente, involucrado, acompanante, fichas } = req.body;
                fichas.fechaIngreso = (0, espesificarFecha_1.fechaExacta)();
                const fichaTipada = {
                    paciente,
                };
                const primerPasoTipado = {
                    involucrado,
                    acompanante,
                };
                let objPrimerPaso = new primer_paso_model_1.FormularioPrimerPaso(primerPasoTipado, fichaTipada);
                objPrimerPaso.comprobarVariables();
                const idPrimerPaso = yield objPrimerPaso.guardarPrimerPaso();
                const idPaciente = yield objPrimerPaso.crearPaciente();
                const ficha = yield objPrimerPaso.crearFicha(query, [
                    fichas.fechaIngreso,
                    fichas.estadoFicha,
                    fichas.borradoLogico,
                    fichas.nivel,
                    idPaciente,
                    idUsuario,
                    idPrimerPaso.idInvolucrado,
                    idPrimerPaso.idAcompanante,
                ]);
                return res.status(200).json(ficha);
            }
            catch (error) {
                console.log(error);
                if (error.code == 100) {
                    return res.status(400).json(error.msj);
                }
                return res.status(500).json("Error interno del servidor");
            }
        });
    }
    static segundoPasoController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { genero, involucrado, acompanante, paciente, fichas, prendas } = req.body;
                const { idUsuario } = req.params;
                const { idPaciente, idFicha } = req.query;
                let idsPrimero;
                fichas.fechaIngreso = (0, espesificarFecha_1.fechaExacta)();
                const historiaGeneroTipada = genero;
                const primerPasoTipado = {
                    involucrado,
                    acompanante,
                };
                const fichaTipada = {
                    paciente,
                };
                const objSegundoPaso = new segundo_paso_model_1.FormularioSegundoPaso(historiaGeneroTipada, primerPasoTipado, fichaTipada, prendas);
                //si los campos viene con noplica significa que existen campos en el paso uno y se esta siguiendo un formulario anterior
                //para este paso necesitamos tanto id de usuario como de la ficha
                if (primerPasoTipado.involucrado.rutInvolucrado == "no aplica" &&
                    primerPasoTipado.acompanante.rutInvolucrado == "no aplica" &&
                    fichaTipada.paciente.rutPaciente == "no aplica") {
                    //necessitamos verificar que el id no sea undefined para hacer un parseo y asi mandar un numero para crear las tablas segundo paso
                    if (idPaciente != undefined) {
                        let idParseado = parseInt(idPaciente, 10);
                        objSegundoPaso.crearSegundoPaso(idParseado);
                    }
                    //se actualiza la tabla ficha con la hora, el nivel, para eso necesitamos el id de la ficha
                    const msj = yield objSegundoPaso.crearFicha(`UPDATE  fichas_tecnicas SET fecha_ingreso = ?, nivelFormulario = ?
         where id_ficha_tecnica =  ?`, [fichas.fechaIngreso, fichas.nivel, idFicha]);
                    return res.status(200).send(msj);
                }
                //en caso de no entrar al if se crean nuevos campos
                objSegundoPaso.comprobarVariables();
                const idDbs = yield objSegundoPaso.crearPaciente();
                idsPrimero = yield objSegundoPaso.guardarPrimerPaso();
                yield objSegundoPaso.crearSegundoPaso(idDbs);
                const msj = yield objSegundoPaso.crearFicha(`INSERT INTO FICHAS_TECNICAS (fecha_ingreso, estado_ficha, borrado_logico,nivelFormulario ,fk_paciente, fk_profesional_usuario, fk_persona_involucrada_encargada, fk_persona_involucrada_acompanante) VALUES (?,?,?,?,?,?,?,?)`, [
                    fichas.fechaIngreso,
                    fichas.estadoFicha,
                    fichas.borradoLogico,
                    fichas.nivel,
                    idDbs,
                    idUsuario,
                    idsPrimero.idInvolucrado,
                    idsPrimero.idAcompanante,
                ]);
                return res.status(200).send(msj);
            }
            catch (error) {
                console.log(error);
                if (error.code == 100) {
                    return res.status(400).json(error.msj);
                }
                return res.status(500).json("Error interno del servidor");
            }
        });
    }
    static tercerPasoController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fichas, paciente, dieta, involucrado, acompanante, areaPsiquica, historialDrogas, genero, prendas, } = req.body;
            const { idPaciente } = req.query;
            const { idFicha } = req.query;
            const { idUsuario } = req.params;
            fichas.fechaIngreso = (0, espesificarFecha_1.fechaExacta)();
            //usar interfaces para tipar los objetos
            const historiaGeneroTipada = genero;
            const areaPsiquicaTipada = areaPsiquica;
            const primerPasoTipado = {
                involucrado,
                acompanante,
            };
            const fichaTipada = {
                paciente,
            };
            try {
                const objTercer = new tercer_paso_model_1.FormularioTercerPaso(areaPsiquicaTipada, historialDrogas.usoDroga, historialDrogas.detallesDroga, dieta, historiaGeneroTipada, primerPasoTipado, fichaTipada, prendas);
                if (idPaciente != undefined &&
                    genero.identidadGenero == "noaplica" &&
                    involucrado.rutInvolucrado == "noaplica" &&
                    acompanante.rutInvolucrado == "noaplica" &&
                    idFicha != undefined) {
                    console.log("primer caso");
                    const idTercerPaso = yield objTercer.crearTercerPaso(parseInt(idPaciente));
                    const msj = yield objTercer.crearFicha(`
        UPDATE fichas_tecnicas SET fecha_ingreso = ?,
        nivelFormulario = ?, apoyo_escolar = ?, detalles_apoyo_es = ?, fk_area_psiquica=? WHERE id_ficha_tecnica = ? `, [
                        fichas.fechaIngreso,
                        fichas.nivel,
                        fichas.apoyoEscolar,
                        fichas.detallesApoyo,
                        idTercerPaso.idAreaPsiquica,
                        idFicha,
                    ]);
                    return res.status(200).send(msj);
                }
                if (idPaciente != undefined &&
                    idFicha != undefined &&
                    paciente.rutPaciente == "noaplica" &&
                    involucrado.rutInvolucrado == "noaplica" &&
                    acompanante.rutInvolucrado == "noaplica") {
                    console.log("segundo caso");
                    objTercer.crearSegundoPaso(parseInt(idPaciente));
                    const idTercerPaso = yield objTercer.crearTercerPaso(parseInt(idPaciente));
                    const msj = yield objTercer.crearFicha(`
      UPDATE fichas_tecnicas SET
      fecha_ingreso = ?,
      nivelFormulario = ?,
      apoyo_escolar = ?,
      detalles_apoyo_es = ?,
      fk_area_psiquica = ?
      WHERE id_ficha_tecnica = ?`, [
                        fichas.fechaIngreso,
                        fichas.nivel,
                        fichas.apoyoEscolar,
                        fichas.detallesApoyo,
                        idTercerPaso.idAreaPsiquica,
                        idFicha,
                    ]);
                    return res.send(msj);
                }
                objTercer.comprobarVariables();
                const idPacient = yield objTercer.crearPaciente();
                const idprimer = yield objTercer.guardarPrimerPaso();
                yield objTercer.crearSegundoPaso(idPacient);
                const idTercer = yield objTercer.crearTercerPaso(idPacient);
                const msj = yield objTercer.crearFicha(`INSERT INTO fichas_tecnicas (fecha_ingreso, 
        borrado_logico,
        estado_ficha,
        nivelFormulario,
        apoyo_escolar,
        detalles_apoyo_es, 
        fk_paciente,
        fk_profesional_usuario,
        fk_area_psiquica,
        fk_persona_involucrada_encargada,
        fk_persona_involucrada_acompanante) VALUES (?,?,?,?,?,?,?,?,?,?,?)`, [
                    fichas.fechaIngreso,
                    fichas.borradoLogico,
                    fichas.estadoFicha,
                    fichas.nivel,
                    fichas.apoyoEscolar,
                    fichas.detallesApoyo,
                    idPacient,
                    idUsuario,
                    idTercer.idAreaPsiquica,
                    idprimer.idInvolucrado,
                    idprimer.idAcompanante,
                ]);
                return res.status(200).send(msj);
            }
            catch (err) {
                return res.status(500).json("Error interno del servidor");
            }
        });
    }
    static cuartoPasoController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario } = req.params;
            const { idFicha, idPaciente, pasoDinamico } = req.query;
            const { fichas, paciente, antecedentes, dieta, involucrado, acompanante, areaPsiquica, historialDrogas, genero, prendas, } = req.body;
            fichas.fechaIngreso = (0, espesificarFecha_1.fechaExacta)();
            //usar interfaces para tipar los objetos
            const historiaGeneroTipada = genero;
            const areaPsiquicaTipada = areaPsiquica;
            const antecedentesTipado = antecedentes;
            const primerPasoTipado = {
                involucrado,
                acompanante,
            };
            const fichaTipada = {
                paciente,
            };
            const objCuarto = new cuarto_paso_model_1.FormularioCuartoPaso(antecedentesTipado, areaPsiquicaTipada, historialDrogas.usoDroga, historialDrogas.detallesDroga, dieta, historiaGeneroTipada, primerPasoTipado, fichaTipada, prendas);
            try {
                switch (pasoDinamico) {
                    case "caso4":
                        objCuarto.comprobarVariables();
                        const idsPaciente = yield objCuarto.crearPaciente();
                        const idsPrimerPaso = yield objCuarto.guardarPrimerPaso();
                        yield objCuarto.crearSegundoPaso(idsPaciente);
                        const idsTercerPaso = yield objCuarto.crearTercerPaso(idsPaciente);
                        const idsCuartoPaso = yield objCuarto.crearCuartoPaso();
                        const msj4 = yield objCuarto.crearFicha(dicQuery_1.diccionarioPasos.crearPrimerPaso, [
                            fichas.fechaIngreso,
                            fichas.estadoFicha,
                            fichas.borradoLogico,
                            fichas.nivel,
                            fichas.apoyoEscolar,
                            fichas.judicializacion,
                            fichas.detallesApoyo,
                            fichas.detallesJudicializacion,
                            idsPaciente,
                            idUsuario,
                            idsTercerPaso.idAreaPsiquica,
                            idsCuartoPaso,
                            idsPrimerPaso.idInvolucrado,
                            idsPrimerPaso.idAcompanante,
                        ]);
                        res.status(200).send(msj4);
                    case "paso3":
                        yield objCuarto.crearSegundoPaso(parseInt(idPaciente));
                        const idsTercerPas = yield objCuarto.crearTercerPaso(parseInt(idPaciente));
                        const idsCuartoPas = yield objCuarto.crearCuartoPaso();
                        const msj3 = yield objCuarto.crearFicha(dicQuery_1.diccionarioPasos.update3, [
                            fichas.fechaIngreso,
                            fichas.estadoFicha,
                            fichas.borradoLogico,
                            fichas.nivel,
                            fichas.apoyoEscolar,
                            fichas.judicializacion,
                            fichas.detallesApoyo,
                            fichas.detallesJudicializacion,
                            idPaciente,
                            idUsuario,
                            idsTercerPas.idAreaPsiquica,
                            idsCuartoPas,
                            idFicha,
                        ]);
                        res.status(200).send(msj3);
                    case "paso2":
                        const idsTercerPaso1 = yield objCuarto.crearTercerPaso(parseInt(idPaciente));
                        const idsCuartoPaso1 = yield objCuarto.crearCuartoPaso();
                        const msj2 = yield objCuarto.crearFicha(dicQuery_1.diccionarioPasos.update2, [
                            fichas.fechaIngreso,
                            fichas.estadoFicha,
                            fichas.borradoLogico,
                            fichas.nivel,
                            fichas.apoyoEscolar,
                            fichas.judicializacion,
                            fichas.detallesApoyo,
                            fichas.detallesJudicializacion,
                            idPaciente,
                            idUsuario,
                            idsTercerPaso1.idAreaPsiquica,
                            idsCuartoPaso1,
                            idFicha,
                        ]);
                        res.status(200).send(msj2);
                    case "paso1":
                        const idsCuartoPaso2 = yield objCuarto.crearCuartoPaso();
                        const msj1 = yield objCuarto.crearFicha(dicQuery_1.diccionarioPasos.update1, [
                            fichas.fechaIngreso,
                            fichas.estadoFicha,
                            fichas.borradoLogico,
                            fichas.nivel,
                            fichas.apoyoEscolar,
                            fichas.judicializacion,
                            fichas.detallesApoyo,
                            fichas.detallesJudicializacion,
                            idPaciente,
                            idUsuario,
                            idsCuartoPaso2,
                            idFicha,
                        ]);
                        res.status(200).send(msj1);
                }
                res.status(200).send("sin coincidencias");
            }
            catch (err) {
                res.status(500).json("Error interno del servidor");
            }
        });
    }
}
exports.FormularioController = FormularioController;
