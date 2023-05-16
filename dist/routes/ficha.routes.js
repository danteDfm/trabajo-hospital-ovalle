"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const ficha_controller_1 = require("../controllers/ficha.controller");
router.post('/crear/:idPaciente', ficha_controller_1.FichaController.crearFicha);
exports.default = router;
