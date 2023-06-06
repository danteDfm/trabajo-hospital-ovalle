import { Request, Response } from "express";
import { FormularioPrimerPaso } from "../models/classes/formulario/primer.paso.model";
import { PrimerPaso } from "../models/interfaces/tipos.entidades";
import {
  Pacientes,
  HistoriaGenero,
  AreaPsiquica,
} from "../models/interfaces/tipos.entidades";
import { fechaExacta } from "../utils/espesificarFecha";
import { FormularioSegundoPaso } from "../models/classes/formulario/segundo.paso.model";
import { FormularioTercerPaso } from "../models/classes/formulario/tercer.paso.model";

export class FormularioController {
  static async primerPasoController(req: Request, res: Response) {
    try {
      const query: string = `INSERT INTO FICHAS_TECNICAS (fecha_ingreso, estado_ficha, borrado_logico,nivelFormulario ,fk_paciente, fk_profesional_usuario, fk_persona_involucrada_encargada, fk_persona_involucrada_acompanante) VALUES (?,?,?,?,?,?, ?,?)`;

      const { idUsuario } = req.params;
      const { paciente, involucrado, acompanante, fichas } = req.body;
      fichas.fechaIngreso = fechaExacta();

      const fichaTipada: Pacientes = {
        paciente,
      };

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
      const ficha: any = await objPrimerPaso.crearFicha(query, [
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
      const { idPaciente, idFicha } = req.query;
      let idsPrimero;

      fichas.fechaIngreso = fechaExacta();

      const historiaGeneroTipada: HistoriaGenero = genero;

      const primerPasoTipado: PrimerPaso = {
        involucrado,
        acompanante,
      };
      const fichaTipada: Pacientes = {
        paciente,
      };

      const objSegundoPaso = new FormularioSegundoPaso(
        historiaGeneroTipada,
        primerPasoTipado,
        fichaTipada,
        prendas
      );

      //si los campos viene con noplica significa que existen campos en el paso uno y se esta siguiendo un formulario anterior
      //para este paso necesitamos tanto id de usuario como de la ficha
      if (
        primerPasoTipado.involucrado.rutInvolucrado == "no aplica" &&
        primerPasoTipado.acompanante.rutInvolucrado == "no aplica" &&
        fichaTipada.paciente.rutPaciente == "no aplica"
      ) {
        //necessitamos verificar que el id no sea undefined para hacer un parseo y asi mandar un numero para crear las tablas segundo paso

        if (idPaciente != undefined) {
          let idParseado: number = parseInt(idPaciente as string, 10);
          objSegundoPaso.crearSegundoPaso(idParseado);
        }

        //se actualiza la tabla ficha con la hora, el nivel, para eso necesitamos el id de la ficha
        const msj = await objSegundoPaso.crearFicha(
          `UPDATE  fichas_tecnicas SET fecha_ingreso = ?, nivelFormulario = ?
         where id_ficha_tecnica =  ?`,
          [fichas.fechaIngreso, fichas.nivel, idFicha]
        );

        return res.status(200).send(msj);
      }

      //en caso de no entrar al if se crean nuevos campos

      objSegundoPaso.comprobarVariables();
      const idDbs = await objSegundoPaso.crearPaciente();

      idsPrimero = await objSegundoPaso.guardarPrimerPaso();
      await objSegundoPaso.crearSegundoPaso(idDbs);
      const msj = await objSegundoPaso.crearFicha(
        `INSERT INTO FICHAS_TECNICAS (fecha_ingreso, estado_ficha, borrado_logico,nivelFormulario ,fk_paciente, fk_profesional_usuario, fk_persona_involucrada_encargada, fk_persona_involucrada_acompanante) VALUES (?,?,?,?,?,?,?,?)`,
        [
          fichas.fechaIngreso,
          fichas.estadoFicha,
          fichas.borradoLogico,
          fichas.nivel,
          idDbs,
          idUsuario,
          idsPrimero.idInvolucrado,
          idsPrimero.idAcompanante,
        ]
      );

      return res.status(200).send(msj);
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
      genero,
      prendas,
    } = req.body;

    const { idPaciente } = req.query;
    const { idFicha } = req.query;
    const { idUsuario } = req.params;

    fichas.fechaIngreso = fechaExacta();

    //usar interfaces para tipar los objetos

    const historiaGeneroTipada: HistoriaGenero = genero;
    const areaPsiquicaTipada: AreaPsiquica = areaPsiquica;

    const primerPasoTipado: PrimerPaso = {
      involucrado,
      acompanante,
    };

    const fichaTipada: Pacientes = {
      paciente,
    };

    const objTercer = new FormularioTercerPaso(
      areaPsiquicaTipada,
      dieta,
      historiaGeneroTipada,
      primerPasoTipado,
      fichaTipada,
      prendas
    );

    if (
      idPaciente != undefined &&
      paciente.rutPaciente == "noaplica" &&
      genero.identidadGenero == "noaplica" &&
      involucrado.rutInvolucrado == "noaplica" &&
      acompanante.rutInvolucrado == "noaplica" &&
      idFicha != undefined
    ) {



      console.log("primer caso");
      const idTercerPaso = await objTercer.crearTercerPaso(
        parseInt(idPaciente as string)
      );

      const msj = await objTercer.crearFicha(
        `
        UPDATE fichas_tecnicas SET fecha_ingreso = ?,
        nivelFormulario = ?, apoyo_escolar = ?, detalles_apoyo_es = ?, fk_area_psiquica=? WHERE id_ficha_tecnica = ? `,
        [
          fichas.fechaIngreso,
          fichas.nivel,
          fichas.apoyoEscolar,
          fichas.detallesApoyo,
          idTercerPaso.idAreaPsiquica,
          idFicha,
        ]
      );

      return res.status(200).send(msj);
    }

    if (  

      idPaciente != undefined &&
      idFicha != undefined &&
      paciente.rutPaciente == "noaplica" &&
      involucrado.rutInvolucrado == "noaplica" &&
      acompanante.rutInvolucrado == "noaplica"

    ) { 

      console.log("segundo caso");

      objTercer.crearSegundoPaso(parseInt(idPaciente as string));
      
      const idTercerPaso= await objTercer.crearTercerPaso(parseInt(idPaciente as string));

      objTercer.crearFicha(`UPDATE fichas_tecnicas SET
      fecha_ingreso = ?,
      nivelFormulario = ?
      poyo_escolar = ?,
      detalles_apoyo_es = ?,
      fk_area_psiquica=? 
      where id_ficha_tecnica =  ?
      WHERE id_ficha_tecnica= ?`, [

        fichas.fechaIngreso,
        fichas.nivel,
        fichas.apoyoEscolar,
        fichas.detallesApoyo,
        idTercerPaso.idAreaPsiquica,
        idFicha

      ]);

    }

    return res.send("hola mundo");
  }
}
