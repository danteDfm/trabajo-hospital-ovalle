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
      const { paciente, involucrado, acompanante } = req.body;
      const { paso } = req.query;

      //tipado de objetos
      const pacienteTipado: InterfacePaciente = paciente;
      const involucradoTipado: InterfacePersonasInv = involucrado;
      const acompananteTipado: InterfacePersonasInv = acompanante;


      const nuevoPaciente = new Paciente(pacienteTipado);
      const nuevoInvolucrado = new Involucrado(involucradoTipado);
      const nuevoAcompanante = new Involucrado(acompananteTipado);

      const objFormulario = new Formulario(nuevoPaciente, nuevoInvolucrado, nuevoAcompanante);

      objFormulario.crearPrimerPaso();




      if (paso === "primero") return res.status(200).json("primer paso completado");

      res.status(200).json("Formulario completado");
    } catch (err: any) {
      res.json(err);
    }
  }
}
