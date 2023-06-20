import { Request, Response } from "express";
import { Fichas } from "../models/classes/historial.fichas.model";

const objFicha = new Fichas();
export class FichasController {
  

  static async fichaActiva(req: Request, res: Response) {
    const { rutPaciente } = req.params;
    try {

      console.log(rutPaciente);
      
      const fichaActiva = await objFicha.listarFichaActiva(rutPaciente);
      
      console.log("hola");
      return res.status(201).json({
        ficha: fichaActiva[0],
      });


    } catch (err: any) {
      return res.status(500).json({
        err,
        msj: "Error interno del servidor",
      });
    }
  }
  static async fichaInactiva(req: Request, res: Response) {
    const { rutPaciente } = req.params;
    try {
      const fichasInactivas = await objFicha.listarFichasInactivas(
        rutPaciente
      );
      return res.status(201).json(fichasInactivas);
    } catch (err) {
      res.status(500).json({
        err,
        msj: "Error interno del servidor",
      });
    }
  }



  static async listarFichaId(req:Request, res:Response){

    const {idFicha} = req.params;
     const  dataFicha= await  objFicha.listarPorIdFicha(parseInt(idFicha));
    res.json(dataFicha);

  }
  
}
