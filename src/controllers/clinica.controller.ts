import {Request, Response} from 'express';
import { Consultas } from '../models/model.consultas';
import { ElementosDisforia} from '../interfaces/interfaz.formulario.registro';
import { devolucionId } from '../consultas/devolucion.Id';
import { generadoConsultas } from '../consultas/generaConsultas';

const crearEnfermedades =  async(req:Request, res:Response)=>{

   try{   

    const {body} =req;
    const objDetallesDisforia: ElementosDisforia= {

      detallesDisforia: body.detallesDisforia,
      disforia: body.disforia,
      prenda:body.prenda,
      usoPrenda: body.usoPrenda,

    }
   

    const obj = new Consultas(objDetallesDisforia);
    obj.crearFichaTecnica(devolucionId, generadoConsultas);
     res.send("hola mundo");
   }
   catch(err){

    console.log(err);
    

   }
}

export {

    crearEnfermedades

}