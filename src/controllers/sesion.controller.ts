import { Request, Response } from "express";
import { Sesion } from "../models/classes/sesion.model";

const objSesion = new Sesion();

export class SessionController {
  static async sesion(req: any, res: Response) {
    try {
      const { idProfesional, rol } = req.dataUsuario;

      const token = await objSesion.login(idProfesional, rol);

      res.set("Content-Type", "application/json");
      res.setHeader("Authorization", `Bearer ${token}`);
      res.status(200).json({ message: "peticion llevada a cabo" });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json("Error interno del servidor");
    }
  }

  static async datosUsuarioSesion(req: Request, res: Response) {
    const header = req.headers;
    try {
      if (header.authorization == "Bearer null") throw { ok: false };

      const data: any = objSesion.verificarToken(
        header.authorization as string
      );

      const resultData = await objSesion.seleccionarUsuario(data.sub);
      console.log(resultData);
      res.status(200).json({
        ok: true,
        resultData,
      });
    } catch (err) {
      res.status(400).json(err);
    }
  }
}
