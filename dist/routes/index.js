"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endPoints = void 0;
const express_1 = require("express");
const formulario_routes_1 = __importDefault(require("./formulario.routes"));
const table_routes_1 = __importDefault(require("./table.routes"));
const router = (0, express_1.Router)();
function endPoints(app) {
    app.use('/api', router);
    router.use('/form', formulario_routes_1.default);
    router.use('/table', table_routes_1.default);
}
exports.endPoints = endPoints;
