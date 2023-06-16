
import { NextFunction, Request, Response } from "express";
import { consultasGenerales } from "../consultas/consultasGenerales";

//extrae los id antes de actulizar las fichas, para mantener limpia las entidades 
export function extraccId(req:any, res:Response, next:NextFunction){
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


      req.idTablas = {

        idFicha:fichas.idFicha,
        idPaciente: paciente.idPaciente,
        idAntecedente:antecedentes.idAntecedente,
        idDieta: habitos.idDieta,
        idInvolucrado: involucrado.idInvolucrado,
        idAcompanante: acompanante.idAcompanante, 
        idAreaPsiquica: areaPsiquica.idAreaPsiquica, 
        idDrogas: historialDrogas.idDrogas,
        idGenero: genero.idGenero,
        idPrenda: prendas.idPrenda


      }
      
      delete fichas.idFicha,
      delete paciente.idPaciente,
      delete antecedentes.idAntecedente,
      delete habitos.idDieta,
      delete involucrado.idInvolucrado,
      delete acompanante.idAcompanante, 
      delete areaPsiquica.idAreaPsiquica, 
      delete historialDrogas.idDrogas,
      delete genero.idGenero,
      delete prendas.idPrenda

      next();

}


export async function buscarRut(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { rutPaciente } = req.params;
  const query: string = `SELECT id_paciente FROM PACIENTES where rut_paciente = ?`;

  try {

    const data = await consultasGenerales(query, [rutPaciente]);
    if (!data[0]){
      throw "paciente no existe en la base de datos"; 
    }
    next();
  } catch (err) {
    res.status(500).json({
      ok: false,
      err,
    });
  }
}