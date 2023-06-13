import { OkPacket } from "mysql2";
import { Pacientes } from "../interfaces/tipos.entidades";
import { consultasGenerales } from "../../consultas/consultasGenerales";
import { query } from "express";

export class EntidadPaciente implements Pacientes {
  
  rutPaciente?: string;
  nombrePaciente: string;
  apellidoPaternoPa: string | null;
  apellidoMaternoPa: string | null;
  pronombre: string | null;
  nombreSocial: string | null;
  fechaNacimientoPa: Date;
  domicilioPaciente: string | null;
  telefonoPaciente: string | null;

  constructor(fichas: Pacientes) {
    this.rutPaciente = fichas.rutPaciente;
    this.nombrePaciente = fichas.nombrePaciente;
    this.apellidoPaternoPa = fichas.apellidoPaternoPa || null;
    this.apellidoMaternoPa = fichas.apellidoMaternoPa || null;
    this.pronombre = fichas.pronombre || null;
    this.nombreSocial = fichas.nombreSocial || null;
    this.fechaNacimientoPa = fichas.fechaNacimientoPa || null;
    this.domicilioPaciente = fichas.domicilioPaciente || null;
    this.telefonoPaciente = fichas.telefonoPaciente || null;
  }

  async crearPaciente(): Promise<number> {
    try {
      let idPaciente: number;
      let pacienteFormateada;

      const consulta: string =
        "SELECT id_paciente FROM PACIENTES WHERE rut_paciente = ?";
      const creacion: string =
        "INSERT INTO PACIENTES VALUES (NULL, ?,?,?,?,?,?,?,?,?)";

      const dataPaciente = await consultasGenerales(consulta, [
        this.rutPaciente,
      ]);

      if (dataPaciente && dataPaciente.length > 0) {
        idPaciente = dataPaciente[0].id_paciente;
        return idPaciente;
      }

      const setHeaderPaciente: any = await consultasGenerales(creacion, [
        this.rutPaciente,
        this.nombrePaciente,
        this.apellidoPaternoPa,
        this.apellidoMaternoPa,
        this.fechaNacimientoPa,
        this.domicilioPaciente,
        this.telefonoPaciente,
        this.pronombre,
        this.nombreSocial,
      ]);

      idPaciente = (setHeaderPaciente as OkPacket).insertId;
      return idPaciente;
    } catch (err) {
      console.log(err);

      throw "Error al ejecutar la consulta";
    }
  }

  comprobarVariables() {
    try {
      if (
        !this.rutPaciente ||
        !this.nombrePaciente ||
        !this.fechaNacimientoPa
      ) {
        throw 100;
      }
    } catch (err) {
      throw {
        code: err,
        status: "failure",
        msj: "Error, estas variables no pueden venir vacias, rutPaciente, nombrePaciente, fechaNacimiento",
      };
    }
  }
  async crearFicha(
    query: string,
    datos: (string | number | Date | null | undefined)[]
  ) {
    try {
      const data: any = await consultasGenerales(query, datos);
      const idFicha = (data as OkPacket).insertId;
      return "La operacion fue llevada con exito";
    } catch (err) {
      throw "Error en crear la ficha tecnica";
    }
  }
  async actulizarPaciente(idPaciente: number) {
    try {

      const query: string = `UPDATE PACIENTES SET nombre_paciente = ?, apellido_paterno_paciente = ?, apellido_materno_paciente = ?, domicilio_paciente  = ?, telefono_paciente = ?,  pronombre = ?,  nombre_social = ?
        WHERE id_paciente  = ?
        `;

      await consultasGenerales(query, [
        this.nombrePaciente,
        this.apellidoPaternoPa,
        this.apellidoMaternoPa,
        this.domicilioPaciente,
        this.telefonoPaciente,
        this.pronombre,
        this.nombreSocial,
        idPaciente,
      ]);

      return "Los datos han sido actualizados";

    } catch (err: any) {
      throw new Error(err);
    }
  }
}
