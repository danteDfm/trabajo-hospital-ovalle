import { NextFunction, Request, Response } from "express";

export function vericarDataUsuario(req: Request, res: Response, next: NextFunction) {
  let {
    rutProfesional,
    nombreProfesional,
    cargoProfesional,
    contrasenaProfesional,
    emailProfesional,
    centroProfesional,
    rolProfesional,
  } = req.body;

  try{

    if(!rutProfesional || !contrasenaProfesional || !nombreProfesional || !centroProfesional || !cargoProfesional || !rolProfesional){
       
        throw({
            msj: 'Los datos no deben estar vacios'
        });
    }

    next();
    
  }catch(err:any){

    res.status(400).json(err.msj);

  }
}   

