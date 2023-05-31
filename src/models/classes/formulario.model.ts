import { Paciente } from "./entidades_dbs/paciente";
import { Involucrado } from "./entidades_dbs/personasInv";
import { mysqlConnexion } from "../..";
import { OkPacket } from "mysql2";

export class Formulario {
  private paciente: Paciente;
  private involucrado: Involucrado;
  private acompanante: Involucrado;
  private conexion: any;

  constructor(
    paciente: Paciente,
    involucrado: Involucrado,
    acompanante: Involucrado
  ) {
    this.paciente = paciente;
    this.involucrado = involucrado;
    this.acompanante = acompanante;
  }

  async crearPrimerPaso() {
    const conexion = await mysqlConnexion;
    const valuePaciente = Object.values(this.paciente);
    const valueInvolucrado = Object.values(this.involucrado);
    const valueAcompanante = Object.values(this.acompanante);

    try {

      const [resultadoPaciente]: any = await conexion?.query(`INSERT INTO PACIENTES VALUES (NULL, ?,?,?,?,?,?,?,?,?)`,
      valuePaciente
      );

      const [resultadoInvolucrado]:any = await conexion?.query(`INSERT INTO PERSONAS_INVOLUCRADAS_TRANSICION VALUES (NULL, ?,?,?,?,?,?,?)`, valueInvolucrado);

      const [resultadoAcompanante]:any = await conexion?.query(`INSERT INTO PERSONAS_INVOLUCRADAS_TRANSICION VALUES (NULL, ?,?,?,?,?,?,?)`, valueAcompanante);


      const idp = (resultadoPaciente as OkPacket).insertId;
      const ida = (resultadoInvolucrado as OkPacket).insertId;
      const idi = (resultadoAcompanante as OkPacket).insertId;

      console.log(idp);
      console.log(ida);
      console.log(idi);
    } catch (error:any) {
      throw new Error("Error de consulta primer paso");
    }
  }
}
