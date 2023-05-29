import { Request, Response } from "express";
import { Usuario } from "../models/classes/usurio.model";
import { compararContrasena, hashContrasena } from "../utils/bcrypt/hash.contrasena";

let objUsuario = new Usuario();
export class UsuarioController {
  static async crearUsuario(req: Request, res: Response) {
    try {
      let existenciaUser: boolean;
      let contrasenaHasheada: string;
      const {
        rutProfesional,
        nombreProfesional,
        cargoProfesional,
        contrasenaProfesional,
        emailProfesional,
        centroProfesional,
        rolProfesional,
      } = req.body;

       existenciaUser = await objUsuario.exitenciaUsuario(rutProfesional);
      if (existenciaUser) throw "Usuario ya existe en la base de datos";

      contrasenaHasheada = await hashContrasena(contrasenaProfesional);
      

      objUsuario.setRutProfesional(rutProfesional);
      objUsuario.setNombreProfesional(nombreProfesional);
      objUsuario.setCargoProfesional(cargoProfesional);
      objUsuario.setContrasenaProfesional(contrasenaHasheada);
      objUsuario.SetEmailProfesional(emailProfesional);
      objUsuario.setCentroProfesional(centroProfesional);
      objUsuario.setRolProfesional(rolProfesional);

      const msjCrearUser = await objUsuario.ingresarUsuario();
      res.status(201).json(msjCrearUser);
    } catch (err) {
      res.status(500).json({
        err,
        msj: "Error interno del servidor",
      });
    }
  }

  static async listaUsuarios(req: Request, res: Response) {
    try {
      const resultListar = await objUsuario.listarUsuarios();
      res.status(201).json(resultListar);
    } catch (err) {
      res.status(500).json({
        err,
        mjs: "Error interno del servidor",
      });
    }
  }

  static async actualizarUsuario(req: Request, res: Response) {
    try {
      const { idUsuario } = req.params;
      let contrasenaHasheada: string;
    
      const {
        rutProfesional,
        nombreProfesional,
        cargoProfesional,
        contrasenaProfesional,
        emailProfesional,
        centroProfesional,
      } = req.body;

      contrasenaHasheada = await hashContrasena(contrasenaProfesional);


      objUsuario.setRutProfesional(rutProfesional);
      objUsuario.setNombreProfesional(nombreProfesional);
      objUsuario.setCargoProfesional(cargoProfesional);
      objUsuario.setContrasenaProfesional(contrasenaHasheada);
      objUsuario.SetEmailProfesional(emailProfesional);
      objUsuario.setCentroProfesional(centroProfesional);

      const msjActualizarUsuario: string = await objUsuario.actualizarUsuario(
        parseInt(idUsuario)
      );
      res.status(201).json(msjActualizarUsuario);
    } catch (err) {
      res.status(500).json({
        err,
        msj: "Error interno del servidor",
      });
    }
  }
}
