"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const dataTable_controller_1 = require("../controllers/crearData/dataTable.controller");
router.get('/mostrar', dataTable_controller_1.TableController.mostrarPaciente);
exports.default = router;
