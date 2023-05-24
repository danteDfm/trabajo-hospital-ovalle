import { PaginaPrincipal } from "../models/classes/main.model";
import { Request, Response } from "express";

const estadisticasFicha = new PaginaPrincipal;

export class MainController{

    static async estadisticas(req:Request, res:Response){

        const gen = ["masculino", "femenino", "genero fluido", "agenero", "biogenero"];
      
        let generos:Array<number> = [];
        let totalPacientes:number = 0;
        let long = gen.length;


       totalPacientes =  await estadisticasFicha.TotalPacientes();
       for(let i=0; i<long; i++){
           generos.push(await estadisticasFicha.cantidadGeneros(gen[i]));
       }

       
         res.status(201).json({

            generos,
            totalPacientes

         });

    }


}