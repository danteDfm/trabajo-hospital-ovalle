"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const usuario_controller_1 = require("../controllers/usuario.controller");
router.post('/guardar', usuario_controller_1.UsuarioController.crearUsuario);
router.get('/listar', usuario_controller_1.UsuarioController.listaUsuarios);
router.post('/actualizar/:idUsuario', usuario_controller_1.UsuarioController.actualizarUsuario);
exports.default = router;
