"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
class Token {
    constructor() {
        process.env.TZ = 'UTC';
        this.secret = process.env.SECRET_TOKEN;
        this.payload = {};
        this.token = "";
        this.dataToken = {};
    }
    formarPayload(idUser, roleUser) {
        this.payload = {
            sub: idUser,
            scope: roleUser,
        };
        return this.payload;
    }
    generarToken() {
        this.token = jsonwebtoken_1.default.sign(this.payload, this.secret, { expiresIn: '5h' });
        return this.token;
    }
    verificarToken(token) {
        this.dataToken = jsonwebtoken_1.default.verify(token, this.secret);
        return this.dataToken;
    }
}
exports.Token = Token;
