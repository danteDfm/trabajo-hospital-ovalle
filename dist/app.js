"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.settings();
        this.middlewares();
        this.start();
    }
    settings() {
        this.app.set('port', process.env.PORT || 3002);
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use((0, cors_1.default)());
        this.app.use(morgan('dev'));
        this.app.use(express_1.default.json());
    }
    routes() {
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("SERVER UP PORT");
        });
    }
}
