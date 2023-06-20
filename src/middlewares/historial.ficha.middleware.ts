import { NextFunction, Request, Response } from "express";
export function verificarId(req:Request, res:Response, next:NextFunction){

    const {rutPaciente} = req.params;
    if(!rutPaciente){
        return res.status(400).json({

            ok:false, 
            err: "le id debe ser obligatorio"
        });
    }
    next(); 
}