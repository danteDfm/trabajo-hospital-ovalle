"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endPoints = void 0;
const express_1 = require("express");
const vista_data_paciente_routes_1 = __importDefault(require("./vista.data.paciente.routes"));
const ficha_tecnica_routes_1 = __importDefault(require("./ficha.tecnica.routes"));
const router = (0, express_1.Router)();
function endPoints(app) {
    app.use('/api', router);
    router.use('/enfermedades', ficha_tecnica_routes_1.default);
    router.use('/vista-editar', vista_data_paciente_routes_1.default);
}
exports.endPoints = endPoints;
