"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const fichas_controllers_1 = require("../controllers/fichas.controllers");
const historial_ficha_middleware_1 = require("../middlewares/historial.ficha.middleware");
router.get('/activa/:idPaciente', historial_ficha_middleware_1.verificarId, fichas_controllers_1.FichasController.fichaActiva);
router.get('/inactivas/:idPaciente', historial_ficha_middleware_1.verificarId, fichas_controllers_1.FichasController.fichaInactiva);
exports.default = router;
