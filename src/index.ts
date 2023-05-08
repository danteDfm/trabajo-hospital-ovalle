import { Server } from "./models/classes/model.servidor";

const objServidor = new Server();
objServidor.iniciarServidor();
const mysqlConnexion = objServidor.conexionDatabase();

export { mysqlConnexion };
