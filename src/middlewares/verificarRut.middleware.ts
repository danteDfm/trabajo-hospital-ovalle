import { NextFunction, Request, Response, response } from "express";
import { consultasGenerales } from "../consultas/consultasGenerales";

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
