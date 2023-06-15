"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const formulario_controller_1 = require("../controllers/formulario.controller");
const verificarRut_buscar_middleware_1 = require("../middlewares/verificarRut.buscar.middleware");
router.get('/listarPorRut/:rutPaciente', verificarRut_buscar_middleware_1.buscarRut, formulario_controller_1.FormularioController.buscarFichaPaciente);
router.post('/ingresar/:idUsuario', formulario_controller_1.FormularioController.crearFichaTecnica);
exports.default = router;
