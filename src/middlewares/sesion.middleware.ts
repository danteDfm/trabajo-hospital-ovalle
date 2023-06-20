import { NextFunction, Request, Response } from "express";
import { consultasGenerales } from "../consultas/consultasGenerales";
import { compararContrasena } from "../utils/bcrypt/hash.contrasena";

export async function verficarSesion(
  req: any,
  res: Response,
  next: NextFunction
) {
  const query: string = `
    SELECT nombre_usuario, contrasena, id_profesional_salud, roles FROM profesionales_usuarios_salud
    WHERE nombre_usuario = ?`;

  const { emailUsuario, contrasenaUsuario } = req.body;
  try {
    if (!emailUsuario || !contrasenaUsuario) {
      throw "Los datos no puede estar vacios";
    }

    const result = await consultasGenerales(query, [emailUsuario]);

    if (!result[0]) {
      throw "EL usuario no se encuentra en la base de datos";
    }

    const verificacion = await compararContrasena(
      contrasenaUsuario,
      result[0].contrasena
    );

    if (!verificacion) {
      throw "Contraseña es invalida";
    }

    req.dataUsuario = {
      idProfesional: result[0].id_profesional_salud,
      rol: result[0].roles,
    };

    next();
  } catch (err) {
    return res.status(400).json(err);
  }
}
