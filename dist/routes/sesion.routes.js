"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sesion_controller_1 = require("../controllers/sesion.controller");
const router = (0, express_1.Router)();
router.post('/credenciales', sesion_controller_1.SessionController.sesion);
exports.default = router;
