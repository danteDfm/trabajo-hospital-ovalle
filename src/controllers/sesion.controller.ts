import { Request, Response } from "express";
import { Sesion } from "../models/classes/sesion.model";
import { compararContrasena } from "../utils/bcrypt/hash.contrasena";

const objSesion = new Sesion;


export class SessionController{
    static async sesion(req:Request, res:Response){


        const {emailUsuario, contrasenaUsuario} = req.body;
        objSesion.setEmail(emailUsuario);
        const result = await objSesion.login(); 

        console.log(contrasenaUsuario);
        console.log(result[0].contrasena);

        const re = await compararContrasena(result[0].contrasena, contrasenaUsuario);

        console.log(re);
       res.send(result[0]);
         

    }
}