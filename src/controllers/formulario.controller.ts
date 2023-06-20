import { Request, Response } from "express";

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
import { FormularioCuartoPaso } from "../models/classes/formulario/cuarto.paso.model";
import { Ficha } from "../models/classes/fichaTecnica.model";
import { Fichas } from "../models/classes/historial.fichas.model";

const objFichas = new Fichas();

export class FormularioController {
  static async buscarFichaPaciente(req: Request, res: Response) {
    try {
      const { rutPaciente } = req.params;
      const dataFicha = await objFichas.listarInformacionPaciente(rutPaciente);
      res.status(201).json(dataFicha);
    } catch (err) {
      res.status(400).json({
        err,
        msj: "Error interno del servidor",
      });
    }
  }

  static async crearFichaTecnica(req: any, res: Response) {
    const {
      fichas,
      paciente,
      habitos,
      antecedentes,
      involucrado,
      acompanante,
      areaPsiquica,
      historialDrogas,
      genero,
      prendas,
    } = req.body;



    const nivel = parseInt(req.query.nivel as string);
    const idUsuario = parseInt(req.params.idUsuario as string);

    let fechaIngreso;
    let estado: boolean | undefined = true;

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
      historialDrogas.usoDrogas,
      historialDrogas.detallesDrogas,
      habitos.dieta,
      historiaGeneroTipada,
      primerPasoTipado,
      fichaTipada,
      prendas.prenda
    );

    try {
      

      const verificacionFicha = await Ficha.estatusFicha(paciente.rutPaciente);

      //update en caso de existir el paciente
      if (verificacionFicha && req.idTablas.idPaciente) {

        await objCuarto.actulizarPaciente(req.idTablas.idPaciente);
        await objCuarto.actualizarprimerPaso(
          req.idTablas.idInvolucrado,
          req.idTablas.idAcompanante
        );
        await objCuarto.actualizarSegundoPaso(req.idTablas.idGenero);
        await objCuarto.actulizarTercerPaso(
          req.idTablas.idAreaPsiquica,
          req.idTablas.idDieta,
          req.idTablas.idDrogas
        );
        await objCuarto.actualizarCuartoPaso(req.idTablas.idAntecedente);

        const objFichas = new Ficha(
          fechaIngreso,
          estado,
          nivel,
          fichas.apoyoEscolar,
          fichas.judicializacion,
          fichas.detallesApoyo,
          fichas.detallesJudicializacion
        );

        const msj = await objFichas.actulizarFicha(req.idTablas.idFicha);
        return res.status(201).json(msj);
      }

      const idPaciente = await objCuarto.crearPaciente();
      const idPrimerPaso = await objCuarto.guardarPrimerPaso();
      objCuarto.crearSegundoPaso(idPaciente);
      const idTecerPaso = await objCuarto.crearTercerPaso(idPaciente);
      const idCuartoPaso = await objCuarto.crearCuartoPaso();

      const objFichas = new Ficha(
        fechaIngreso,
        estado,
        nivel,
        fichas.apoyoEscolar,
        fichas.judicializacion,
        fichas.detallesApoyo,
        fichas.detallesJudicializacion,
        idPaciente,
        idUsuario,
        idTecerPaso.idAreaPsiquica,
        idCuartoPaso,
        idPrimerPaso.idInvolucrado,
        idPrimerPaso.idAcompanante
      );

      const msj = await objFichas.crearFichaTecnica();

      res.status(201).json(msj);
    } catch (err: any) {
      res.status(201).json({
        err,
        msj: "Error interno del servidor",
      });
    }
  }



  static async finalizar(req:Request, res:Response){


    
    const {idFicha} = req.query;
    const objFicha = new Ficha();
   
    try{
    
     const resFinalizacion = await objFicha.finalizarFicha(parseInt(idFicha as string));
     res.status(201).json(resFinalizacion);
      
    }catch(err){

      res.status(400).json({

        err, 
        msj: "Error interno del servidor"

      });

    } 
    
  }
  
}
