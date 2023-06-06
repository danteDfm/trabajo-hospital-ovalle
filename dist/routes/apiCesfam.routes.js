"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const apiCesfam_controller_1 = require("../controllers/apiCesfam.controller");
router.post('/obtener', apiCesfam_controller_1.Cesfam.api);
exports.default = router;
