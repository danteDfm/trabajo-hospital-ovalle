"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainController = void 0;
const main_model_1 = require("../models/classes/main.model");
const estadisticasFicha = new main_model_1.PaginaPrincipal;
class MainController {
    static estadisticas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const gen = ["masculino", "femenino", "genero fluido", "agenero", "biogenero"];
            let generos = [];
            let totalPacientes = 0;
            let long = gen.length;
            const ingresosDia = yield estadisticasFicha.ingresosDelDia();
            totalPacientes = yield estadisticasFicha.TotalPacientes();
            for (let i = 0; i < long; i++) {
                generos.push(yield estadisticasFicha.cantidadGeneros(gen[i]));
            }
            res.status(201).json({
                generos,
                totalPacientes,
                ingresosDia
            });
        });
    }
}
exports.MainController = MainController;
