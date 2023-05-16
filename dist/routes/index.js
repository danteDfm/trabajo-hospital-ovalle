"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endPoints = void 0;
const express_1 = require("express");
const paciente_routes_1 = __importDefault(require("./paciente.routes"));
const ficha_routes_1 = __importDefault(require("./ficha.routes"));
const router = (0, express_1.Router)();
function endPoints(app) {
    app.use('/api', router);
    router.use('/paciente', paciente_routes_1.default);
    router.use('/ficha', ficha_routes_1.default);
}
exports.endPoints = endPoints;
