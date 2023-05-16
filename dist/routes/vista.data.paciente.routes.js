"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const vista_listar_usuario_controller_1 = require("../controllers/antes/vista.listar.usuario.controller");
router.get('/listar', vista_listar_usuario_controller_1.DataPacienteController.listarPaciente);
router.get('/listar-detalles/:idFicha', vista_listar_usuario_controller_1.DataPacienteController.listarPacientesDetalles);
exports.default = router;
