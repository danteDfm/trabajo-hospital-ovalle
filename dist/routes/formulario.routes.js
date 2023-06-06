"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const formulario_controller_1 = require("../controllers/formulario.controller");
router.post('/primer-paso/:idUsuario', formulario_controller_1.FormularioController.primerPasoController);
router.post('/segundo-paso/:idUsuario', formulario_controller_1.FormularioController.segundoPasoController);
router.post('/tercer-paso/:idUsuario', formulario_controller_1.FormularioController.tercerPasoController);
exports.default = router;
