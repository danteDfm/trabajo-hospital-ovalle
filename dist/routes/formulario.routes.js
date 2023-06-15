"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const formulario_controller_1 = require("../controllers/formulario.controller");
const extraccionId_1 = require("../middlewares/extraccionId");
const verificarRut_buscar_middleware_1 = require("../middlewares/verificarRut.buscar.middleware");
router.get('/listarPorRut/:rutPaciente', verificarRut_buscar_middleware_1.buscarRut, formulario_controller_1.FormularioController.buscarFichaPaciente);
router.post('/paso1/:idUsuario', formulario_controller_1.FormularioController.primerPasoController);
router.post('/paso2/:idUsuario', formulario_controller_1.FormularioController.segundoPasoController);
router.post('/paso3/:idUsuario', formulario_controller_1.FormularioController.tercerPasoController);
router.post('/paso4/:idUsuario', formulario_controller_1.FormularioController.cuartoPasoController);
router.put('/actualizar', extraccionId_1.extraccionId, formulario_controller_1.FormularioController.actualizarForm);
exports.default = router;
