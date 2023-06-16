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

    if(!rutProfesional || !emailProfesional || !contrasenaProfesional || !nombreProfesional || !centroProfesional || !cargoProfesional || !rolProfesional){
       
        throw({
            msj: 'Los datos no deben estar vacios'
        });
    }

    next();
    
  }catch(err:any){

    res.status(400).json(err.msj);

  }
}   

// "rutProfesional": "196676672",
// "nombreProfesional": "Dante Flores",
// "cargoProfesional": "programador",
// "contrasenaProfesional": "dante569",
// "emailProfesional": "dante@gmail.com",
// "rolProfesional": "adminUser",
// "centroProfesional": 1
