"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabla_controller_1 = require("../controllers/tabla.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/listar', tabla_controller_1.TablaController.listarPaciente);
exports.default = router;
