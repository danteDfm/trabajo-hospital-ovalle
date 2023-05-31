import { Formulario } from "../models/classes/formulario.model";
import { Paciente } from "../models/classes/entidades_dbs/paciente";
import { InterfacePaciente } from "../models/interfaces/tipos.entidades";
import { Request, Response } from "express";



export class FormularioController {
 

  static async guardarFichaTecnica(req:Request, res:Response){

    try{
      
    const {paciente}=req.body;

    const pacienteTipado:InterfacePaciente = paciente; 
    const nuevoPaciente = new Paciente(pacienteTipado);

    console.log(nuevoPaciente);

    const objForm = new Formulario(nuevoPaciente);

    console.log(objForm.paciente);

      res.json("hola");
    }catch(err:any){


      res.json(err);

    }



  }

}
