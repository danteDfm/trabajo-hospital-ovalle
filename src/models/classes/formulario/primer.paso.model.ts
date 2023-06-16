import { mysqlConnexion } from "../../..";
import { OkPacket } from "mysql2";
import { PrimerPaso } from "../../interfaces/tipos.entidades";
import { Pacientes } from "../../interfaces/tipos.entidades";
import { EntidadPaciente } from "../pacientes";
import { consultasGenerales } from "../../../consultas/consultasGenerales";

export class FormularioPrimerPaso extends EntidadPaciente implements PrimerPaso {
  //
  private nivel = "paso1";

  //datos involucrados
  public involucrado: {
    rutInvolucrado: string | null;
    nombreInvolucrado: string | null;
    apellidoPInvolucrado: string | null;
    apellidoMInvolucrado: string | null;
    parentescoInvolucrado: string | null;
    telefonoInvolucrado: string | null;
    domicilioInvolucrado: string | null;
    fechaNacimiento: string | null
  };

  public acompanante:{

      rutInvolucrado: string | null;
      nombreInvolucrado: string | null;
      apellidoPInvolucrado: string | null;
      apellidoMInvolucrado: string | null;
      parentescoInvolucrado: string | null;
      telefonoInvolucrado: string | null;
      domicilioInvolucrado: string | null;
      fechaNacimiento: string | null

  };

  constructor(primerPaso: PrimerPaso, fichaTecncica: Pacientes){

    super(fichaTecncica);
    this.involucrado = {
      rutInvolucrado: primerPaso.involucrado.rutInvolucrado || null,
      nombreInvolucrado: primerPaso.involucrado.nombreInvolucrado || null,
      apellidoPInvolucrado: primerPaso.involucrado.apellidoPInvolucrado || null,
      apellidoMInvolucrado: primerPaso.involucrado.apellidoMInvolucrado || null,
      fechaNacimiento: primerPaso.involucrado.fechaNacimiento || null,
      parentescoInvolucrado: primerPaso.involucrado.parentescoInvolucrado || null,
      telefonoInvolucrado: primerPaso.involucrado.telefonoInvolucrado || null,
      domicilioInvolucrado: primerPaso.involucrado.domicilioInvolucrado || null,
     
    };

    this.acompanante = {
      rutInvolucrado: primerPaso.acompanante.rutInvolucrado || null,
      nombreInvolucrado: primerPaso.acompanante.nombreInvolucrado || null,
      apellidoPInvolucrado: null,
      apellidoMInvolucrado: null,
      fechaNacimiento: null,
      parentescoInvolucrado: primerPaso.acompanante.parentescoInvolucrado || null,
      telefonoInvolucrado: primerPaso.acompanante.telefonoInvolucrado || null,
      domicilioInvolucrado: null,
 
    };
  }

  async guardarPrimerPaso(){

    const objConexion = await mysqlConnexion;
    const arregloInvolucrado = Object.values(this.involucrado);
    const arregloAcompanante = Object.values(this.acompanante);

    const query2: string =
      "INSERT INTO  PERSONAS_INVOLUCRADAS_TRANSICION VALUES (null, ?,?,?,?,?,?,?,?)";
    try {

      const [setHeaderInvolucrado]: any = await objConexion?.query(
        query2,
        arregloInvolucrado
      );

      const [setHeaderAcompanante]: any = await objConexion?.query(
        query2,
        arregloAcompanante
      );

      const idInvolucrado = (setHeaderInvolucrado as OkPacket).insertId;
      const idAcompanante = (setHeaderAcompanante as OkPacket).insertId;

      return {
        idInvolucrado,
        idAcompanante,
      };
    } catch (err: any) {

      console.log(err);
      throw {
        status: "failure",
        msj: "Error en consulta",
      };
    }
  }

  async actualizarprimerPaso(idPeronsaInvo:number, idPersonaAcom:number){

     
    const query:string =  `UPDATE PERSONAS_INVOLUCRADAS_TRANSICION 
    SET nombres_persona_involucrada = ?, apellido_paterno_persona_involucrada  = ?, apellido_materno_persona_involucrada = ?, 
    parentesco_persona_involucrada = ?,
    telefono_persona_involucrada = ?, 
    domicilio_persona_involucrada  = ?
    WHERE id_persona_involucrada_transicion  = ?
    `;
    
   try{   

    if(!idPeronsaInvo) return 0;

    await consultasGenerales(query, [
      this.involucrado.nombreInvolucrado,
      this.involucrado.apellidoPInvolucrado,
      this.involucrado.apellidoMInvolucrado,
      this.involucrado.parentescoInvolucrado,
      this.involucrado.telefonoInvolucrado,
      this.involucrado.domicilioInvolucrado,
      idPeronsaInvo
    ]); 

    if(!idPersonaAcom) return 0;

    await consultasGenerales(query, [
      this.acompanante.nombreInvolucrado,
      this.acompanante.apellidoPInvolucrado,
      this.acompanante.apellidoMInvolucrado,
      this.acompanante.parentescoInvolucrado,
      this.acompanante.telefonoInvolucrado,
      this.acompanante.domicilioInvolucrado,
      idPersonaAcom
    ]);

    return "Los datos han sido actualizados: primer paso";

   }catch(err:any){
    throw new Error(err);
   }

  }
}

