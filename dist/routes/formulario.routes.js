"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const formulario_controller_1 = require("../controllers/crearData/formulario.controller");
router.post('/crear/:idUsuario', formulario_controller_1.FormularioController.crearFormulario);
exports.default = router;
