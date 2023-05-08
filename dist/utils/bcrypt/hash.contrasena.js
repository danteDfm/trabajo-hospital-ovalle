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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compararContrasena = exports.hashContrasena = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
function hashContrasena(contrasena) {
    return __awaiter(this, void 0, void 0, function* () {
        let salt = yield bcrypt_1.default.genSalt(10);
        let hash = yield bcrypt_1.default.hash(contrasena, salt);
        return hash;
    });
}
exports.hashContrasena = hashContrasena;
function compararContrasena(contrasenaDbs, contrasenaRecibida) {
    return __awaiter(this, void 0, void 0, function* () {
        let comparacion = yield bcrypt_1.default.compare(contrasenaDbs, contrasenaRecibida);
        return comparacion;
    });
}
exports.compararContrasena = compararContrasena;
