"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drogas = void 0;
const sequelize_1 = __importDefault(require("../database/sequelize"));
const sequelize_2 = require("sequelize");
exports.Drogas = sequelize_1.default.define('DROGAS', {
    id_drogas: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_2.DataTypes.INTEGER
    },
    nombre_drogas: {
        type: sequelize_2.DataTypes.STRING
        //defaultValue: false | true 
    }
}, {
    timestamps: false
});
