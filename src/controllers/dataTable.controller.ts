import { DataTable } from "../models/classes/dataTable.model";
import { Request, Response } from "express";

const objDataTable = new DataTable();

export class TableController {

  static async tablePacientes(req: Request, res: Response) {
    try {
      const pacientes = await objDataTable.pacienteCentroEspesifico("Antonio Tirado Lanas", "=");
      res.status(201).json(pacientes);

    } catch (err) {
      res.status(500).json({
        err,
        msj: "Error interno del servidor",
      });
    }
  }


  static async tableCentrosDiferente(req: Request, res: Response) {
    try {
      const pacientes = await objDataTable.pacienteCentroEspesifico("Antonio Tirado Lanas", "!=");
      res.status(201).json(pacientes);

    } catch (err) {
      res.status(500).json({
        err,
        msj: "Error interno del servidor",
      });
    }
  }


  //buscar paciente por id 
  static async mostrarFicha(req:Request, res:Response){
    try{
      
      const {idFicha} = req.params;
      const dataFicha =  await objDataTable.traerDataPaciente(parseInt(idFicha));
      res.status(201).json(dataFicha);

    }catch(err){
      res.status(500).json({
        err,
        msj: "Error interno del servidor",
      });
    }

  }
}
