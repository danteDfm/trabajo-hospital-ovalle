"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const paciente_controller_1 = require("../../controllers/paciente.controller");
router.post('/crear', paciente_controller_1.PacienteController.crearPaciente);
exports.default = router;
