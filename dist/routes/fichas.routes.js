"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const fichas_controllers_1 = require("../controllers/fichas.controllers");
router.get('/activa/:idFicha', fichas_controllers_1.FichasController.fichaActiva);
router.get('/inactivas/:idFicha', fichas_controllers_1.FichasController.fichaInactiva);
exports.default = router;
