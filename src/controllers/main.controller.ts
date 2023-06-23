import { PaginaPrincipal } from "../models/classes/main.model";
import { Request, Response } from "express";

const estadisticasFicha = new PaginaPrincipal();

export class MainController {
  static async estadisticas(req: Request, res: Response) {
    const gen = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
    ];
    let ingresosDia;
    let generos: Array<number> = [];
    let totalPacientes: number = 0;
    let long = gen.length;

    ingresosDia = await estadisticasFicha.ingresosDelDia();
    
    totalPacientes = await estadisticasFicha.TotalPacientes();
    for (let i = 0; i < long; i++) {
      generos.push(await estadisticasFicha.cantidadGeneros(gen[i]));
    }

    await estadisticasFicha.estadisticaAreaPsiquica();
    res.status(201).json({
      generos,
      totalPacientes,
      ingresosDia,
    });
  }
}
