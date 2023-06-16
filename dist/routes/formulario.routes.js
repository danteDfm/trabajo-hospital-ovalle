"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const formulario_controller_1 = require("../controllers/formulario.controller");
const formulario_middleware_1 = require("../middlewares/formulario.middleware");
router.get('/listarPorRut/:rutPaciente', formulario_middleware_1.buscarRut, formulario_controller_1.FormularioController.buscarFichaPaciente);
router.post('/ingresar/:idUsuario', formulario_middleware_1.extraccId, formulario_controller_1.FormularioController.crearFichaTecnica);
exports.default = router;
