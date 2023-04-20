import {Request, Response} from 'express';
;import {FormularioRegistro} from '../models/model.paciente';

const crearEnfermedades =  async(req:Request, res:Response)=>{

   try{

    const obj  = new FormularioRegistro();
     obj.crearFichaTecnica();
    res.send("hola mundo");
   }
   catch(err){

    

   }
}

export {

    crearEnfermedades

}