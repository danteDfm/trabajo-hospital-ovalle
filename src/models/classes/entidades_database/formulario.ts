// import { mysqlConnexion } from "../../..";
// import { diccionarioAct } from "../../../consultas/dicActualizar";
// import { Paciente, DetallesPaciente} from "../../interfaces/data.ficha.tecnica";
// import { cambio } from "../../../utils/cambioEstado";



// export class Formulario{

//   private paciente:Paciente;
//   private detallePc:DetallesPaciente;
  

//   constructor(paciente: Paciente, detallePc:DetallesPaciente){

//     this.paciente = paciente;
//     this.detallePc = detallePc;
   
//   }
  
//     async actualizarFormulario() {

//       const queryDrogas = "UPDATE DETALLES_DROGAS SET detalles_drogas = ? WHERE id_droga = ?";
//       const queryHalimento = "UPDATE HABITOS_ALIMENTICIOS SET detalle_habito_alimenticio = ? WHERE id_habito_alimenticio = ?";
//       const queryAfamilia = "UPDATE  ANTECEDENTES_FAMILIARES SET detalles_antecedente = ? WHERE id_antecedentes_familia = ?";

//       const conexion = await mysqlConnexion;
//       let paciente = Object.values(this.paciente)
      

//   try{
//           await conexion?.beginTransaction();

//           paciente[10]  = cambio(this.detallePc.detallesDrogas);
//           paciente[11] = cambio(this.detallePc.detallesAntecedenteFami);

//           await conexion?.query(queryDrogas,[this.detallePc.detallesDrogas, this.detallePc.idDroga]);
//           await conexion?.query(queryHalimento,[this.detallePc.detallesAlimenticio, this.detallePc.idDetalleAli]);
//           await conexion?.query(queryAfamilia,[this.detallePc.detallesAntecedenteFami, this.detallePc.idAnteFami]);
//           await conexion?.query(diccionarioAct.paciente, paciente);

          
//           await conexion?.commit();
//           return this.paciente;

//       }catch(err){

//           await conexion?.rollback();
//           console.log(err);

//       }
//     }
// }
