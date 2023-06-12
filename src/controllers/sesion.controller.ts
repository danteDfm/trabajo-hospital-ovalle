import { Request, Response } from "express";
import { Sesion } from "../models/classes/sesion.model";

const objSesion = new Sesion();

export class SessionController {
  static async sesion(req: Request, res: Response) {
    try {
      const { emailUsuario, contrasenaUsuario } = req.body;
      objSesion.setEmail(emailUsuario);
      objSesion.setContrasena(contrasenaUsuario);

      const token = await objSesion.login();
      res.set("Content-Type", "application/json");
      res.setHeader("Authorization", `Bearer ${token}`);
      res.status(200).json({ message: "peticion llevada a cabo" });
    } catch (err: any) {
      if (err.code == 103 || err.code == 101 || err.code == 102) {
        return res.status(400).json(err.error);
      }

      console.log(err);
      return res.status(500).json("Error interno del servidor");
    }
  }

  
  static async verificarToken(req: Request, res: Response) {
    const header = req.headers;
    try {
      if (header.authorization == "Bearer null") throw { ok: false };
      const data: any = objSesion.verificarToken(
        header.authorization as string
      );

      const resultData = await objSesion.seleccionarUsuario(data.sub);

      res.status(200).json({
        ok: true,
        resultData,
      });
    } catch (err) {
      res.status(400).json(err);
    }
  }
}
