import { Request, Response } from "express";
import { FormularioPrimerPaso } from "../models/classes/formulario/primer.paso.model";
import {
  AntecedentesClinicos,
  PrimerPaso,
} from "../models/interfaces/tipos.entidades";
import {
  Pacientes,
  HistoriaGenero,
  AreaPsiquica,
} from "../models/interfaces/tipos.entidades";
import { fechaExacta } from "../utils/espesificarFecha";
import { FormularioSegundoPaso } from "../models/classes/formulario/segundo.paso.model";
import { FormularioTercerPaso } from "../models/classes/formulario/tercer.paso.model";
import { FormularioCuartoPaso } from "../models/classes/formulario/cuarto.paso.model";
import { Ficha } from "../models/classes/ficha.model";

import { EntidadPaciente } from "../models/classes/pacientes";
import { Fichas } from "../models/classes/fichas.model";


const objFicha = new Ficha();
const objFichas = new Fichas();

export class FormularioController {
  static async buscarFichaPaciente(req: Request, res: Response) {
    try {
      const { rutPaciente } = req.params;
      const dataFicha = await objFichas.listarInformacionPaciente(rutPaciente);

      res.status(400).json(dataFicha);
    } catch (err) {
      res.status(400).json({
        err,
        msj: "Error interno del servidor",
      });
    }
  }


  //este endpoint se ejecuta solo si crear o actualiza en el primer paso;
  static async primerPasoController(req: Request, res: Response) {
    const { idUsuario } = req.params;
    const { paciente, involucrado, acompanante } = req.body;
    
    let idParsUsuario = parseInt(idUsuario);
    try { 

      let rutPaciente = paciente.rutPaciente;
      await objFicha.verificarEstado(rutPaciente);

      let fechaIngreso = fechaExacta();
      let nivel = 1;

      const fichaTipada: Pacientes = paciente;

      const primerPasoTipado: PrimerPaso = {
        involucrado,
        acompanante,
      };

      let objPrimerPaso = new FormularioPrimerPaso(
        primerPasoTipado,
        fichaTipada
      );

      const idPrimerPaso = await objPrimerPaso.guardarPrimerPaso();
      const idPaciente = await objPrimerPaso.crearPaciente();

      objFicha.constructo(
        fechaIngreso,
        nivel,
        idPaciente,
        idParsUsuario,
        idPrimerPaso.idInvolucrado,
        idPrimerPaso.idAcompanante
      );

      const msj = await objFicha.crearFicha();
      return res.status(200).json(msj);


    } catch (error: any) {

      console.log(error)

      return res.status(500).json({

        error, 
        msj: "Error interno del servidro"

      });
    }
  }



  static async segundoPasoController(req: Request, res: Response) {
    const { genero, involucrado, acompanante, paciente, prendas } = req.body;

    const { idUsuario } = req.params;
    const { idPaciente, idFicha } = req.query;

    let idsPrimero;
    let fechaIngreso;
    let estadoFicha = 1;
    let nivel = 2;

    try {
      fechaIngreso = fechaExacta();
      const historiaGeneroTipada: HistoriaGenero = genero;

      const primerPasoTipado: PrimerPaso = {
        involucrado,
        acompanante,
      };
      const fichaTipada: Pacientes = paciente;

      const objSegundoPaso = new FormularioSegundoPaso(
        historiaGeneroTipada,
        primerPasoTipado,
        fichaTipada,
        prendas
      );

      if (!paciente && !acompanante && !involucrado) {
        let idPacientePars = parseInt(idPaciente as string);
        objSegundoPaso.crearSegundoPaso(idPacientePars);

        return res.status(201).json();
      }

      const idsPaciente = await objSegundoPaso.crearPaciente();
      idsPrimero = await objSegundoPaso.guardarPrimerPaso();
      await objSegundoPaso.crearSegundoPaso(1);

      return res.status(200).send();
    } catch (error: any) {
      console.log(error);
      if (error.code == 100) {
        return res.status(400).json(error.msj);
      }
      return res.status(500).json("Error interno del servidor");
    }
  }

  static async tercerPasoController(req: Request, res: Response) {
    const {
      fichas,
      paciente,
      dieta,
      involucrado,
      acompanante,
      areaPsiquica,
      historialDrogas,
      genero,
      prendas,
    } = req.body;

    let fechaIngreso;
    let nivel = 3;

    const { idFicha, idPaciente } = req.query;
    const { idUsuario } = req.params;

    fechaIngreso = fechaExacta();

    const historiaGeneroTipada: HistoriaGenero = genero;
    const areaPsiquicaTipada: AreaPsiquica = areaPsiquica;

    const primerPasoTipado: PrimerPaso = {
      involucrado,
      acompanante,
    };

    const fichaTipada: Pacientes = paciente;

    const objTercer = new FormularioTercerPaso(
      areaPsiquicaTipada,
      historialDrogas.usoDroga,
      historialDrogas.detallesDroga,
      dieta,
      historiaGeneroTipada,
      primerPasoTipado,
      fichaTipada,
      prendas
    );

    try {
      if (!paciente && !acompanante && !involucrado) {
        let idPacientePars = parseInt(idPaciente as string);
        objTercer.crearSegundoPaso(idPacientePars);

        return res.status(201).json();
      }

      if (!areaPsiquica && !dieta) {
      }

      const idPacient = await objTercer.crearPaciente();
      const idprimer = await objTercer.guardarPrimerPaso();
      await objTercer.crearSegundoPaso(idPacient);
      const idTercer = await objTercer.crearTercerPaso(idPacient);

      res.status(200).json("hola mundo");
    } catch (err: any) {
      return res.status(500).json("Error interno del servidor");
    }
  }

  static async cuartoPasoController(req: Request, res: Response) {
    const { pasoDinamico, idUsuario } = req.params;

    let fechaIngreso;
    let estadoFicha = 1;
    let nivel = 4;

    const {
      fichas,
      paciente,
      antecedentes,
      dieta,
      involucrado,
      acompanante,
      areaPsiquica,
      historialDrogas,
      genero,
      prendas,
    } = req.body;

    fechaIngreso = fechaExacta();

    const historiaGeneroTipada: HistoriaGenero = genero;
    const areaPsiquicaTipada: AreaPsiquica = areaPsiquica;
    const antecedentesTipado: AntecedentesClinicos = antecedentes;
    const primerPasoTipado: PrimerPaso = {
      involucrado,
      acompanante,
    };

    const fichaTipada: Pacientes = paciente;
    const objCuarto = new FormularioCuartoPaso(
      antecedentesTipado,
      areaPsiquicaTipada,
      historialDrogas.usoDroga,
      historialDrogas.detallesDroga,
      dieta,
      historiaGeneroTipada,
      primerPasoTipado,
      fichaTipada,
      prendas
    );

    try {
      const idsPaciente = await objCuarto.crearPaciente();

      const idsPrimerPaso = await objCuarto.guardarPrimerPaso();
      await objCuarto.crearSegundoPaso(idsPaciente);
      const idsTercerPaso = await objCuarto.crearTercerPaso(idsPaciente);
      const idsCuartoPaso = await objCuarto.crearCuartoPaso();

      return res.status(200).send();
    } catch (err) {
      return res.status(500).json("Error interno del servidor");
    }
  }

  static async actualizarForm(req: any, res: Response) {
    let objCuartoPaso;

    const {
      paciente,
      involucrado,
      acompanante,
      historiaGenero,
      detallesPrendas,
      areaPsiquica,
      detallesDieta,
      antecedentes,
    } = req.body;
    try {
      console.log(req.idTablas);

      const pacienteTipado: Pacientes = paciente;
      const primerPasoTipado: PrimerPaso = {
        involucrado,
        acompanante,
      };
      const generoTipado: HistoriaGenero = historiaGenero;
      const areaPsiquicaTipada: AreaPsiquica = areaPsiquica;
      const antecentesTipado: AntecedentesClinicos = antecedentes;

      res.send("hola mundo");
    } catch (err: any) {
      console.log(err);
      res.status(400).json({
        err,
        msj: "Error interno del servidor",
      });
    }
  }
}
