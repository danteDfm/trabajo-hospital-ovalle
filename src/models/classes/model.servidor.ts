import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { endPoints } from "../../routes";
import ConexionDatabase from "../../database/conexion.database";



export class Server {
  private app: Application;
  private objConexion;

  constructor() {

    this.objConexion = new ConexionDatabase;
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }
  settings(): void {
    this.app.set("port", process.env.PORT || 3002);
  }
  middlewares(): void {
    this.app.use(cors());
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }

  routes(): void {
    endPoints(this.app);
  }

  async conexionDatabase() {
    try {

      return this.objConexion.getConnection();

    } catch (err) {
      console.log(err);
    }
  }

  iniciarServidor(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("SERVER UP PORT " + this.app.get("port"));
    });
  }
}
