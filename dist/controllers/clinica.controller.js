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
exports.crearEnfermedades = void 0;
const model_consultas_1 = require("../models/model.consultas");
const devolucion_Id_1 = require("../consultas/devolucion.Id");
const generaConsultas_1 = require("../consultas/generaConsultas");
const crearEnfermedades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const objDetallesDisforia = {
            detallesDisforia: body.detallesDisforia,
            disforia: body.disforia,
            prenda: body.prenda,
            usoPrenda: body.usoPrenda,
        };
        const obj = new model_consultas_1.Consultas(objDetallesDisforia);
        obj.crearFichaTecnica(devolucion_Id_1.devolucionId, generaConsultas_1.generadoConsultas);
        res.send("hola mundo");
    }
    catch (err) {
        console.log(err);
    }
});
exports.crearEnfermedades = crearEnfermedades;
