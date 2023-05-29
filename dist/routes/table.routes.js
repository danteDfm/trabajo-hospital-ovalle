"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const dataTable_controller_1 = require("../controllers/dataTable.controller");
router.get('/dataTable', dataTable_controller_1.TableController.tablePacientes);
router.get('/dataTable/diferente', dataTable_controller_1.TableController.tableCentrosDiferente);
router.get('/dataFicha/:idFicha', dataTable_controller_1.TableController.mostrarFicha);
//tabla
router.get('/tableFicha/:rutPaciente', dataTable_controller_1.TableController.fichasPacientes);
exports.default = router;
