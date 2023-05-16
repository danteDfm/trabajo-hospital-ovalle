import { Request, Response } from "express";
import { Paciente } from "../models/classes/entidades_database/model.paciente";

export class PacienteController {
  constructor() {}

  static async crearPaciente(req: Request, res: Response) {
    try {

      const {body} = req;


      const objPaciente = new Paciente(body.paciente);
      await objPaciente.crearPaciente();


      res.status(201).json({
        msj: "Usuario creado correctamente",
      });
    } catch (err) {
      res.status(500).json({
        err,
        msj: "Error interno del servidor"
      });
    }
  }
  
  static async dataPaciente(req: Request, res: Response){

    try{

      const dataPaciente = await Paciente.traerDataPaciente();
      res.status(201).json(dataPaciente)

    }catch(err){

      
      res.status(500).json({

        err, 
        msj: "Error interno del servidor"

      });
    }
  }
 
}