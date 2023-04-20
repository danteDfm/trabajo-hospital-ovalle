"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelizeConnexion = new sequelize_1.Sequelize('hospital', 'root', 'dante569', {
    dialect: 'mysql',
    logging: true,
    host: 'localhost',
    port: 3306
});
exports.default = sequelizeConnexion;
