import { NextFunction, Request, Response } from "express";
import { Paciente } from "../models/classes/entidades_database/model.paciente";
import { IdentidadGenero } from "../models/classes/entidades_database/model.i.genero";
import { Ficha } from "../models/classes/entidades_database/model.ficha";

const objFicha = new Ficha();
const objGenero = new IdentidadGenero();
const objPaciente = new Paciente();

export class FichaController {


  static async fichaPaciente ( req: Request, res: Response){

    try{

      const dataFicha=await objPaciente.mostrarPacienteFicha(req.params.rutPaciente);
      res.status(200).json(dataFicha);
  
    }catch(err){

      res.status(500).json({

        err, 
        msj: "Error interno del servidor"

      });

    }
  }

  static async crearDetallesPaciente(
    req: any,
    res: Response,
    next: NextFunction
  ) {
    try{

      const { body } = req;

      const idDisforia = await objGenero.crearDisforia(body.disforia);
      const idGenero = await objGenero.crearIdentidadGenero({ ...body.identidadGenero }, idDisforia);
      await objGenero.seleccinarPrenda(idGenero, body.prenda);
      const idDetPaciente = await objPaciente.crearDetallesPaciente({...body.detallesPaciente,});

      const idPaciente:number = await objPaciente.crearPaciente(
        idGenero,
        idDetPaciente.idAFamilia,
        idDetPaciente.idDrogas,
        idDetPaciente.idAlimenticio,
        body.paciente
      )

      req.idPaciente = idPaciente; 
      req.saludo = "hola mundo";
    
      next();


    } catch (err) {
      res.status(500).json({
        err,
        msj: "Error interno del servidor",
      });
    }
  }

  static async crearDetallesFicha(
    req: any,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { body } = req;

      const idDetalleFicha = await Ficha.detallesFicha(
        body.detalleApoyo,
        body.funcionalidadGenital,
        body.detalleJuicio,
        body.detalleFarmaco
      );

      const idAreaPsiquica = await Ficha.areasPsiquicas(
        { ...body.psique },
        idDetalleFicha.idFarmacos
      );

      const idEncargada = await Ficha.personaEncargadas({ ...body.encargada });
      const idAcompanante = await Ficha.personaEncargadas({ ...body.acompanante});
      

      const idHistorialClinico = await Ficha.historiasClinicas({
        ...body.antecedentes,
      });

      req.idDetallesFicha = {
        idDetalleFicha,
        idAreaPsiquica,
        idEncargada,
        idHistorialClinico,
        idAcompanante
      };


      next();
    } catch (err) {
      res.status(500).json({
        err,
        msj: "Error interno del servidor",
      });
    }
  }

  static async crearFicha(req: any, res: Response) {
    try {

      const { body } = req;
      const {idUsuario} = req.params;
      const idPaciente = req.idPaciente;
      const idDetallesFicha = req.idDetallesFicha;

     

      const idFicha = await objFicha.crearFicha(
        body.apoyoEscolar,
        body.judicializacion,
        parseInt(idUsuario),
        parseInt(idPaciente),
        idDetallesFicha.idDetalleFicha.idDetalleApoyo,
        idDetallesFicha.idDetalleFicha.idDetalleJuicio,
        idDetallesFicha.idAreaPsiquica,
        idDetallesFicha.idDetalleFicha.idIndGenital,
        idDetallesFicha.idHistorialClinico,
        idDetallesFicha.idEncargada,
        idDetallesFicha.idAcompanante,
        body.date,
        body.borrado
      );

      res.status(201).send({
        msj: "Ficha tecnica creada",
        idFicha: idFicha,
      });
    } catch (err) {
      res.status(201).json({
        err,
        msj: "Error interno del servidor",
      });
    }
  }

}
