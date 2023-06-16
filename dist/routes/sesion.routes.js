"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sesion_controller_1 = require("../controllers/sesion.controller");
const sesion_middleware_1 = require("../middlewares/sesion.middleware");
const router = (0, express_1.Router)();
router.post('/credenciales', sesion_middleware_1.verficarSesion, sesion_controller_1.SessionController.sesion);
router.get('/verificar', sesion_controller_1.SessionController.datosUsuarioSesion);
exports.default = router;
