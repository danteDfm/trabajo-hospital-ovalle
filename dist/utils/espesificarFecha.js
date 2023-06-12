"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fechaExacta = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
function fechaExacta() {
    const zona = "America/Santiago";
    let fecha = new Date().toISOString().split('T').shift();
    const tiempo = (0, moment_timezone_1.default)().tz(zona).format('HH:mm:ss');
    const fechayhora = `${fecha} ${tiempo}`;
    return fechayhora;
}
exports.fechaExacta = fechaExacta;
