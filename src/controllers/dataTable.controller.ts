import { Request, Response } from "express";
import { Tabla } from "../models/classes/tabla.model";

export class TablaController {
  static async listarPaciente(req: Request, res: Response) {
    try {

      const objTable = new Tabla();
      const dataPaciente = await objTable.listarPacientes();

      return res.status(200).json(dataPaciente);
    } catch (err: any) {
      return res.status(500).json({
        err,
        msj: "Error interno del servidor",
      });
    }
  }
}
