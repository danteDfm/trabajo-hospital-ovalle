//clase principal
import { Formulario } from "../models/classes/formulario.model";

//clases
import { Paciente } from "../models/classes/entidades_dbs/paciente";
import { Involucrado } from "../models/classes/entidades_dbs/personasInv";

//interfaces
import { InterfacePaciente } from "../models/interfaces/tipos.entidades";
import { InterfacePersonasInv } from "../models/interfaces/tipos.entidades";

import { Request, Response } from "express";

export class FormularioController {
  static async guardarFichaTecnica(req: Request, res: Response) {
    try {

      let objFormulario;

      const {ficha ,paciente, involucrado, acompanante } = req.body;
      const { paso } = req.query;

      let  pacienteTipado: InterfacePaciente; 
      let involucradoTipado: InterfacePersonasInv;
      let acompananteTipado: InterfacePersonasInv;

     

  
      if (paso === "primero" && ficha.estadoFicha){

        //tipado de objetos
        pacienteTipado = paciente;
        involucradoTipado= involucrado;
        acompananteTipado= acompanante;

        //creacion de entidades
        const nuevoPaciente = new Paciente(pacienteTipado);
        const nuevoInvolucrado = new Involucrado(involucradoTipado);
        const nuevoAcompanante = new Involucrado(acompananteTipado);

        
        objFormulario = new Formulario(nuevoPaciente, nuevoInvolucrado, nuevoAcompanante);
        const msj = await objFormulario.crearPrimerPaso();

      

        console.log(msj);

        return res.status(200).json(msj);
      }

      res.status(200).json("Formulario completado");


    } catch (err: any) {

      res.status(400).json({

        msj: err.message, 
        
      });

    }
  }
}
