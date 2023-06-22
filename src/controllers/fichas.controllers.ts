import { Request, Response } from "express";
import { Fichas } from "../models/classes/historial.fichas.model";

const objFicha = new Fichas();
export class FichasController {
  

  static async fichaActiva(req: Request, res: Response) {
    const { rutPaciente } = req.params;
    try {

      
      
      const fichaActiva = await objFicha.listarFichaActiva(rutPaciente);

      return res.status(201).json({

        fichaActiva
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

  try{

    const {idFicha} = req.params;
    const  dataFicha= await  objFicha.listarPorIdFicha(parseInt(idFicha));
   res.status(201).json(dataFicha);

  }catch(err){

    res.status(400).json({

      err, 
      msj: "Error interno del servidor"
    });

  }
  }
  
}
