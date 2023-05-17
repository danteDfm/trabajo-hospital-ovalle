"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const ficha_controller_1 = require("../controllers/ficha.controller");
router.post("/crear/:idUsuario", ficha_controller_1.FichaController.crearDetallesPaciente, ficha_controller_1.FichaController.crearDetallesFicha, ficha_controller_1.FichaController.crearFicha);
router.get('/mostrar/:rutPaciente', ficha_controller_1.FichaController.fichaPaciente);
exports.default = router;
