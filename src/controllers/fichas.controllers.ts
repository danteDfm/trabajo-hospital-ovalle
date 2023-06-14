import { Request, Response } from "express";
import { Fichas } from "../models/classes/fichas.model";

const objFicha = new Fichas();
export class FichasController {
  static async fichaActiva(req: Request, res: Response) {
    const { idFicha } = req.params;
    try {
      const fichaActiva = await objFicha.listarFichaActiva(parseInt(idFicha));
      return res.status(201).json({
        fichaActiva,
      });
    } catch (err: any) {
      return res.status(500).json({
        err,
        msj: "Error interno del servidor",
      });
    }
  }
  static async fichaInactiva(req: Request, res: Response) {
    const { idPaciente } = req.params;
    try {
      const fichasInactivas = await objFicha.listarFichasInactivas(
        parseInt(idPaciente)
      );
      return res.status(201).json(fichasInactivas);
    } catch (err) {
      res.status(500).json({
        err,
        msj: "Error interno del servidor",
      });
    }
  }
}
