"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const ficha_controller_1 = require("../controllers/ficha.controller");
const vista_usuario_controller_1 = require("../controllers/vista.usuario.controller");
router.post('/', ficha_controller_1.RouterCrudFichaTecnica.crearFichaTecnica);
router.get('/', vista_usuario_controller_1.RouterVistaEditarDatos.pacienteController);
exports.default = router;
