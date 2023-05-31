import { Request, Response } from "express";
import { Sesion } from "../models/classes/sesion.model";
import { compararContrasena } from "../utils/bcrypt/hash.contrasena";
import { Token } from "../utils/jwt/generarToken";

const objSesion = new Sesion();


export class SessionController {
  static async sesion(req: Request, res: Response) {
    try {
      
      const { emailUsuario, contrasenaUsuario } = req.body;

      objSesion.setEmail(emailUsuario);
      objSesion.setContrasena(contrasenaUsuario);
    
      const token= await objSesion.login();

      res.set('Content-Type', 'application/json');
      res.set(`Authorization`, `Bearer ${token}`);
      res.status(200).json("La peticion fue llevada con exito");

    } catch (err: any){

      if (err.code == 103 || err.code  == 101 || err.code == 102) {
       return res.status(400).json(err.error);
      }
     return res.status(500).json("Error interno del servidor");
    }
  }
}


//header 

//res.set('Content-Type', 'application/json');
//res.set(`Authorization`, `Bearer ${token}`);