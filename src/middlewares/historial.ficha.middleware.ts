import { NextFunction, Request, Response } from "express";
export function verificarId(req:Request, res:Response, next:NextFunction){

    const {idPaciente} = req.params;
    if(!idPaciente){
        return res.status(400).json({

            ok:false, 
            err: "le id debe ser obligatorio"
        });
    }
    next(); 
}