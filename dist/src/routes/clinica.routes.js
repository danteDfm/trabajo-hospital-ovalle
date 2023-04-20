"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const clinica_controller_1 = require("../controllers/clinica.controller");
router.post('/enfermedades', clinica_controller_1.crearEnfermedades);
exports.default = router;
