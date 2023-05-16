"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const usuario_controller_1 = require("../controllers/usuario.controller");
router.get('/listar-usuario', usuario_controller_1.ProfesionalSalud.listar);
exports.default = router;
