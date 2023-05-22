// import { Request, Response } from "express";
// import { Formulario } from "../models/classes/entidades_database/formulario";
// import { DetallesPaciente, Paciente } from "../models/interfaces/data.ficha.tecnica";

// export class formularioController {
//   static async updateForm(req: Request, res: Response) {
//     try {
//       const { body } = req;

//       const paciente: Paciente = body.paciente;
//       const detallePc: DetallesPaciente = body.detallePc;

//       const objEntidades = new Formulario(paciente, detallePc );

//       const data = await objEntidades.actualizarFormulario();

//       res.json(data);
//     } catch (err){
//       res.json({
//         err,
//         msj: "Error interno del servidor",
//       });
//     }
//   }
// }
