import { NextFunction, Request, Response } from "express";
import { consultasGenerales } from "../consultas/consultasGenerales";
import { compararContrasena } from "../utils/bcrypt/hash.contrasena";

export async function verficarSesion(
  req: any,
  res: Response,
  next: NextFunction
) {
  const query: string = `
    SELECT email_profesional_salud, contrasena, id_profesional_salud, roles FROM profesionales_usuarios_salud
    WHERE email_profesional_salud = ?`;

  const { emailUsuario, contrasenaUsuario } = req.body;
  try {



    if (!emailUsuario || !contrasenaUsuario) {
      throw {
        error: "Los datos no puede estar vacios",
        code: 101,
      };
    }

    const result = await consultasGenerales(query, [emailUsuario]);

    if (!result[0]) {
      throw {
        error: "EL email no se encuentra en la base de datos",
        code: 102,
      };
    }

    const verificacion = await compararContrasena(
      contrasenaUsuario,
      result[0].contrasena
    );

    if (!verificacion) {
      throw {
        error: "Contraseña es invalida",
        code: 103,
      };
    }
  
    req.dataUsuario = {
      idProfesional: result[0].id_profesional_salud,
      rol: result[0].roles,
    };

    next();
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
}
