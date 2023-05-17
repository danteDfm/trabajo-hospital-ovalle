import { Request, Response } from "express";
import { Paciente } from "../models/classes/entidades_database/model.paciente";

const objPaciente = new Paciente();
export class PacienteController {
  constructor() {}
  
  static async dataPaciente(req: Request, res: Response){
    try{
      const dataPaciente = await objPaciente.traerDataPaciente();
      res.status(201).json(dataPaciente)

    }catch(err){

      res.status(500).json({

        err, 
        msj: "Error interno del servidor"

      });
    }
  }

  static async traerXRutController(req: Request, res: Response){

    try{  

      const dataXrut = await objPaciente.traerXRut(req.body.rut);
      res.status(201).json(dataXrut);

    }catch(err){
      console.log(err);
      res.status(500).json({
        err, 
        msj: "Error interno del servidor"

      });
    }

  }
 
}