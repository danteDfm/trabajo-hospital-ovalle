import { DataTable } from "../../models/classes/entidades/dataTable";
import { Request, Response } from "express";

const objDataTable = new DataTable();

export class TableController {
  static async mostrarPaciente(req: Request, res: Response) {
    try {
      const pacientes = await objDataTable.dataPaciente();

      res.status(201).json(pacientes);
    } catch (err) {
      res.status(500).json({
        err,
        msj: "Error interno del servidor",
      });
    }
  }
}
