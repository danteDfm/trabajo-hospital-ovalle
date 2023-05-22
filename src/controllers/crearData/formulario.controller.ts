import { Formulario } from "../../models/classes/entidades/formulario";
import { Paciente } from "../../models/classes/entidades/models_dbs/paciente";
import { Ficha } from "../../models/classes/entidades/models_dbs/ficha";
import { PrendaDieta } from "../../models/classes/entidades/models_dbs/prendas";
import { HistoriaGenero } from "../../models/classes/entidades/models_dbs/historiaGenero";
import { AreaPsique } from "../../models/classes/entidades/models_dbs/areaPsiquica";
import { Involucrados } from "../../models/classes/entidades/models_dbs/personasInv";
import { AntecedentesCli } from "../../models/classes/entidades/models_dbs/antecedentesCli";

import { Request, Response } from "express";
import {
  TypeFichaTecnica,
  TypePaciente,
  PrendaYdieta,
  TypeHistoriaGenero,
  AreaPsiquica,
  TypePersonasInv,
  TypeAntecedentesClinicos
} from "../../models/types/tipos.entidades";

export class FormularioController {
  static async crearFormulario(req: Request, res: Response) {
    try {
      const {
        ficha,
        antecedentesClinicos,
        personasInv,
        personasAcom,
        AreaPsiquica,
        paciente,
        historiaGenero,
        prendaYdieta,
      } = req.body;
      const {idUsuario} = req.params;

      const pacienteTipado: TypePaciente = paciente;
      const fichaTipada: TypeFichaTecnica = ficha;
      const PrendaTipada: PrendaYdieta = prendaYdieta;
      const GeneroTipado: TypeHistoriaGenero = historiaGenero;
      const psiqueTipado: AreaPsiquica = AreaPsiquica;
      const encargado:TypePersonasInv = personasInv;
      const aompanante:TypePersonasInv = personasInv;
      const antecedentes:TypeAntecedentesClinicos = antecedentesClinicos;
      
      let dataPaciente: Paciente = new Paciente(pacienteTipado);
      let dataFicha: Ficha = new Ficha(fichaTipada);
      let dataPrenda: PrendaDieta = new PrendaDieta(PrendaTipada);
      let dataHistoriaGen: HistoriaGenero = new HistoriaGenero(GeneroTipado);
      let dataAreaPsiquica: AreaPsique = new AreaPsique(psiqueTipado);
      let dataEncargado:Involucrados = new Involucrados(personasInv);
      let datainvolucrado:Involucrados = new Involucrados(personasAcom);
      let dataAntecedentes:AntecedentesCli = new AntecedentesCli(antecedentes);

      let crearFormulario = new Formulario(
        dataPaciente,
        dataFicha,
        dataPrenda,
        dataHistoriaGen,
        dataAreaPsiquica,
        dataEncargado,
        datainvolucrado,
        dataAntecedentes
      );
      crearFormulario.crearFicha(parseInt(idUsuario));

      res.status(201).json("hola mundo");
    } catch (err) {
      res.status(500).json({
        err,
        msj: "Error interno del servidro",
      });

    }
  }
}
