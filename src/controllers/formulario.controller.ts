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
import {
  diccCuartoPaso,
  diccSegundoPaso,
  diccTercerPaso,
  primerPaso,
} from "../consultas/dicQuery";
import { EntidadPaciente } from "../models/classes/Pacientes";

export class FormularioController {
  static async primerPasoController(req: Request, res: Response) {
    try {
      const { idUsuario } = req.params;
      const { paciente, involucrado, acompanante, fichas } = req.body;

      fichas.fechaIngreso = fechaExacta();
      const fichaTipada: Pacientes = paciente;

      const primerPasoTipado: PrimerPaso = {
        involucrado,
        acompanante,
      };

      let objPrimerPaso = new FormularioPrimerPaso(
        primerPasoTipado,
        fichaTipada
      );

      objPrimerPaso.comprobarVariables();

      const idPrimerPaso = await objPrimerPaso.guardarPrimerPaso();

      const idPaciente = await objPrimerPaso.crearPaciente();
      const ficha: any = await objPrimerPaso.crearFicha(primerPaso, [
        fichas.fechaIngreso,
        fichas.estadoFicha,
        fichas.borradoLogico,
        fichas.nivel,
        idPaciente,
        idUsuario,
        idPrimerPaso.idInvolucrado,
        idPrimerPaso.idAcompanante,
      ]);

      return res.status(200).json(ficha);
    } catch (error: any) {
      console.log(error);
      if (error.code == 100) {
        return res.status(400).json(error.msj);
      }
      return res.status(500).json("Error interno del servidor");
    }
  }

  static async segundoPasoController(req: Request, res: Response) {
    try {
      const { genero, involucrado, acompanante, paciente, fichas, prendas } =
        req.body;

      const { idUsuario } = req.params;
      const { idPaciente, idFicha, pasoDinamico } = req.query;
      let idsPrimero;

      fichas.fechaIngreso = fechaExacta();

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

      switch (pasoDinamico) {
        case "caso1":
          //en caso de no entrar al if se crean nuevos campos

          objSegundoPaso.comprobarVariables();
          const idDbs = await objSegundoPaso.crearPaciente();

          idsPrimero = await objSegundoPaso.guardarPrimerPaso();
          await objSegundoPaso.crearSegundoPaso(idDbs);

          const msj = await objSegundoPaso.crearFicha(diccSegundoPaso.case1, [
            fichas.fechaIngreso,
            fichas.estadoFicha,
            fichas.borradoLogico,
            fichas.nivel,
            idDbs,
            idUsuario,
            idsPrimero.idInvolucrado,
            idsPrimero.idAcompanante,
          ]);

          return res.status(200).send(msj);

        case "caso2":
          objSegundoPaso.crearSegundoPaso(parseInt(idPaciente as string));

          const msj2 = await objSegundoPaso.crearFicha(diccSegundoPaso.case2, [
            fichas.fechaIngreso,
            fichas.nivel,
            idFicha,
          ]);

          return res.status(200).send(msj2);

        default:
          return res.status(200).send("no se encontraaron coincidencias");
      }
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

    const { idFicha, idPaciente } = req.query;
    const { pasoDinamico } = req.params;
    const { idUsuario } = req.params;

    fichas.fechaIngreso = fechaExacta();

    //usar interfaces para tipar los objetos

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
      switch (pasoDinamico) {
        case "caso1":
          objTercer.comprobarVariables();
          const idPacient = await objTercer.crearPaciente();
          const idprimer = await objTercer.guardarPrimerPaso();
          await objTercer.crearSegundoPaso(idPacient);
          const idTercer = await objTercer.crearTercerPaso(idPacient);
          const msj1 = await objTercer.crearFicha(diccTercerPaso.case1, [
            fichas.fechaIngreso,
            fichas.borradoLogico,
            fichas.estadoFicha,
            fichas.nivel,
            fichas.apoyoEscolar,
            fichas.detallesApoyo,
            idPacient,
            idUsuario,
            idTercer.idAreaPsiquica,
            idprimer.idInvolucrado,
            idprimer.idAcompanante,
          ]);

          res.status(201).json(msj1);

        case "caso2":
          console.log("segundo caso");

          objTercer.crearSegundoPaso(parseInt(idPaciente as string));
          const idTercerPaso2 = await objTercer.crearTercerPaso(
            parseInt(idPaciente as string)
          );

          const msj2 = await objTercer.crearFicha(diccTercerPaso.case2, [
            fichas.fechaIngreso,
            fichas.nivel,
            fichas.apoyoEscolar,
            fichas.detallesApoyo,
            idTercerPaso2.idAreaPsiquica,
            idFicha,
          ]);

          return res.status(201).json(msj2);

        case "caso3":
          const idTercerPaso = await objTercer.crearTercerPaso(
            parseInt(idPaciente as string)
          );

          const msj = await objTercer.crearFicha(diccTercerPaso.case3, [
            fichas.fechaIngreso,
            fichas.nivel,
            fichas.apoyoEscolar,
            fichas.detallesApoyo,
            idTercerPaso.idAreaPsiquica,
            idFicha,
          ]);

          return res.status(200).json(msj);

        default:
          return res.status(200).send("no han habido coincidencias");
      }
    } catch (err: any) {
      return res.status(500).json("Error interno del servidor");
    }
  }

  static async cuartoPasoController(req: Request, res: Response) {
    const { pasoDinamico, idUsuario } = req.params;

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

    fichas.fechaIngreso = fechaExacta();


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
      switch (pasoDinamico) {
        case "caso1":
          try {
            console.log("caso 1");

            objCuarto.comprobarVariables();
            const idsPaciente = await objCuarto.crearPaciente();

            const idsPrimerPaso = await objCuarto.guardarPrimerPaso();
            await objCuarto.crearSegundoPaso(idsPaciente);
            const idsTercerPaso = await objCuarto.crearTercerPaso(idsPaciente);
            const idsCuartoPaso = await objCuarto.crearCuartoPaso();

            const msj4 = await objCuarto.crearFicha(
              diccCuartoPaso.crearPrimerPaso,
              [
                fichas.fechaIngreso,
                fichas.estadoFicha,
                fichas.nivel,
                fichas.apoyoEscolar,
                fichas.judicializacion,
                fichas.detallesApoyo,
                fichas.detallesJudicializacion,
                idsPaciente,
                idUsuario,
                idsTercerPaso.idAreaPsiquica,
                idsCuartoPaso,
                idsPrimerPaso.idInvolucrado,
                idsPrimerPaso.idAcompanante,
              ]
            );

            return res.status(200).send(msj4);
          } catch (err: any) {
            return res.status(400).send({
              err,
              msj: "Error interno del servidor",
            });
          }
        default:
          return res.status(200).send("sin coincidencias");
      }
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
