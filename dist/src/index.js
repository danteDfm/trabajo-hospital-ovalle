"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('port', process.env.PORT || 3002);
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
    }
    routes() {
    }
    iniciarServidor() {
        this.app.listen(this.app.get('port'), () => {
            console.log("SERVER UP PORT");
        });
    }
}
const objServidor = new Server();
objServidor.iniciarServidor();
