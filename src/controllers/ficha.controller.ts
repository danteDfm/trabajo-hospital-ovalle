import { Request, Response } from "express";
import { Paciente } from "../models/classes/entidades_database/model.paciente";
import { IdentidadGenero } from "../models/classes/entidades_database/model.i.genero";
import { Ficha } from "../models/classes/entidades_database/model.ficha";

export class FichaController {
  static async crearFicha(req: Request, res: Response) {
    try {
      const { body } = req;
      const { idPaciente } = req.params;

      


      const objGenero = new IdentidadGenero({ ...body.identidadGenero });
      const objPaciente = new Paciente();
      const idDisforia = await objGenero.crearDisforia(body.disforia);
      const idGenero = await objGenero.crearIdentidadGenero(idDisforia);
      await objGenero.seleccinarPrenda(idGenero, body.prenda);

      await objPaciente.crearDetallesPaciente({...body.detallesPaciente}, parseInt(idPaciente));

    

      const idDetalleFicha = await Ficha.detallesFicha(
        body.detalleApoyo,
        body.funcionalidadGenital,
        body.detalleJuicio,
        body.detalleFarmaco
      );


      const idAreaPsiquica =await  Ficha.areasPsiquicas(
        { ...body.psique },
        idDetalleFicha.idFarmacos
      );


      const idEncargada = await  Ficha.personaEncargadas({ ...body.encargada });

        
      const idHistorialClinico = await Ficha.historiasClinicas({
        ...body.antecedentes,
      });


      const objFicha = new Ficha(

        body.apoyoEscolar,
        body.judicializacion,
        
        1,
        parseInt(idPaciente),

        idDetalleFicha.idDetalleApoyo,
        idDetalleFicha.idDetalleJuicio,

        idAreaPsiquica,
        idDetalleFicha.idIndGenital,
        idHistorialClinico,
        idEncargada,
        idEncargada,

        body.date,
        body.borrado
      );

      const idFicha = await objFicha.crearFicha();
      
      res.status(201).json({

        msj: "Ficha tecnica creada",
        idFicha: idFicha

      });
    } catch (err) {
      res.status(201).json({
        err,
        msj: "Error interno del servidor",
      });
    }
  }
}
