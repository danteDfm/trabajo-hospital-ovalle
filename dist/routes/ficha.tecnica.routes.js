"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const ficha_controller_1 = require("../controllers/ficha.controller");
router.post('/', ficha_controller_1.CrearFichaTecnica.crearFicha);
exports.default = router;
