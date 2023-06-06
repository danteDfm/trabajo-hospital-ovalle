import { mysqlConnexion } from "../../..";
import { OkPacket } from "mysql2";
import { PrimerPaso } from "../../interfaces/tipos.entidades";
import { Pacientes } from "../../interfaces/tipos.entidades";
import { EntidadPaciente } from "../entidades_dbs/Pacientes";
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

  public acompanante: {
    rutInvolucrado: string | null;
    nombreInvolucrado: string | null;
    apellidoPInvolucrado: string | null;
    apellidoMInvolucrado: string | null;
    parentescoInvolucrado: string | null;
    telefonoInvolucrado: string | null;
    domicilioInvolucrado: string | null;
    fechaNacimiento: string | null
  
  };

  constructor(primerPaso: PrimerPaso, fichaTecncica: Pacientes) {
    super(fichaTecncica);
    this.involucrado = {
      rutInvolucrado: primerPaso.involucrado.rutInvolucrado || null,
      nombreInvolucrado: primerPaso.involucrado.nombreInvolucrado || null,
      apellidoPInvolucrado: primerPaso.involucrado.apellidoPInvolucrado || null,
      apellidoMInvolucrado: primerPaso.involucrado.apellidoMInvolucrado || null,
      parentescoInvolucrado: primerPaso.involucrado.parentescoInvolucrado || null,
      telefonoInvolucrado: primerPaso.involucrado.telefonoInvolucrado || null,
      domicilioInvolucrado: primerPaso.involucrado.domicilioInvolucrado || null,
      fechaNacimiento: primerPaso.involucrado.fechaNacimiento || null
    };

    this.acompanante = {
      rutInvolucrado: primerPaso.acompanante.rutInvolucrado || null,
      nombreInvolucrado: primerPaso.acompanante.nombreInvolucrado || null,
      apellidoPInvolucrado: null,
      apellidoMInvolucrado: null,
      parentescoInvolucrado: primerPaso.acompanante.parentescoInvolucrado || null,
      telefonoInvolucrado: primerPaso.acompanante.telefonoInvolucrado || null,
      domicilioInvolucrado: null,
      fechaNacimiento: null
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
}
