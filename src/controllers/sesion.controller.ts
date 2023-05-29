import { Request, Response } from "express";
import { Sesion } from "../models/classes/sesion.model";
import { compararContrasena } from "../utils/bcrypt/hash.contrasena";
import { Token } from "../utils/jwt/generarToken";

const objSesion = new Sesion();
const objToken = new Token();

export class SessionController {
  static async sesion(req: Request, res: Response) {
    try {

      let tokenJwt:string;
      const { emailUsuario, contrasenaUsuario } = req.body;

      if (!emailUsuario || !contrasenaUsuario) {
        throw new Error("Los datos no puede estar vacios");
      }

      objSesion.setEmail(emailUsuario);
      const dataUsuario = await objSesion.login();

      if (!dataUsuario[0]) {
        throw new Error("EL email no se encuentra en la base de datos");
      }
      const verificacion = await compararContrasena(
        contrasenaUsuario,
        dataUsuario[0].contrasena
      );
      if (!verificacion) {
        throw new Error("La contraseña es incorrecta");
      }

      objToken.formarPayload(dataUsuario[0].id_profesional_salud, dataUsuario[0].roles);
      tokenJwt=objToken.generarToken();
      
      res.set(`Authorization`, `Bearer ${tokenJwt}`);
      res.status(201).json("La peticion fue llevada con exito");

    } catch (err) {
      
      const error = (err as Error).message;
     
      console.log(error);
      res.status(500).json({

        error: error,

      });
    }
  }
}
