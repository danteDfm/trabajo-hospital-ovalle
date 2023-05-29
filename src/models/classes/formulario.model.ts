import { Paciente } from "./entidades_dbs/paciente";
import { Ficha } from "./entidades_dbs/ficha";
import { PrendaDieta } from "./entidades_dbs/prendas";
import { HistoriaGenero } from "./entidades_dbs/historiaGenero";
import { AreaPsique } from "./entidades_dbs/areaPsiquica";
import { Involucrados } from "./entidades_dbs/personasInv";
import { AntecedentesCli } from "./entidades_dbs/antecedentesCli";

import { mysqlConnexion } from "../..";
import { OkPacket } from "mysql2";
import { consultasGenerales } from "../../consultas/consultasGenerales";

export class Formulario {
  private paciente: Paciente;
  private ficha: Ficha;
  private prenda: PrendaDieta;
  private historiaGen: HistoriaGenero;
  private areaPsiquica: AreaPsique;
  private encargada: Involucrados;
  private acompanante: Involucrados;
  private antecedentes: AntecedentesCli;

  constructor(
    paciente: Paciente,
    ficha: Ficha,
    prenda: PrendaDieta,
    historiGen: HistoriaGenero,
    areaPsiquica: AreaPsique,
    encargada: Involucrados,
    acompanante: Involucrados,
    antecedentes: AntecedentesCli
  ) {
    this.paciente = paciente;
    this.ficha = ficha;
    this.prenda = prenda;
    this.historiaGen = historiGen;
    this.areaPsiquica = areaPsiquica;
    this.encargada = encargada;
    this.acompanante = acompanante;
    this.antecedentes = antecedentes;
  }

  async crearFicha(idUsuario: number) {
    const genero = Object.values(this.historiaGen);
    const prendaYdieta = Object.values(this.prenda);
    const areaPsiquica = Object.values(this.areaPsiquica);
    const encargada = Object.values(this.encargada);
    const acompanante = Object.values(this.acompanante);
    const antecedentes = Object.values(this.antecedentes);
    const paciente = Object.values(this.paciente);
    const ficha = Object.values(this.ficha);

    const prenda = prendaYdieta[1];
    const dieta = prendaYdieta[0];

    const conexion = await mysqlConnexion;

    try {
      await conexion?.beginTransaction();

      const [dataGen]: any = await conexion?.query(
        "INSERT INTO HISTORIAS_IDENTIDADES_GENEROS VALUES(NULL, ?,?,?,?,?,?,?,?)",
        genero
      );

      const idHistoriGen = (dataGen as OkPacket).insertId;

      prenda.map(async (data: number) => {
        await conexion?.query(
          `INSERT INTO SELECCION_PRENDA VALUES (NULL, ${idHistoriGen}, ?)`,
          data
        );
      });

      const [dataDieta]: any = await conexion?.query(
        "INSERT INTO HABITOS_ALIMENTICIOS VALUES (NULL, ?)",
        [dieta]
      );

      let idDieta = (dataDieta as OkPacket).insertId;

      paciente.push(idHistoriGen);
      paciente.push(idDieta);

      const [dataPaciente]: any = await conexion?.query(
        `INSERT INTO PACIENTES VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        paciente
      );

      const idPaciente = (dataPaciente as OkPacket).insertId;

      const [dataAreaPsiquica]: any = await conexion?.query(
        "INSERT INTO AREAS_PSIQUICAS VALUES (NULL, ?,?,?,?,?,?)",
        areaPsiquica
      );

      const [dataEncargada]: any = await conexion?.query(
        "INSERT INTO PERSONAS_INVOLUCRADAS_TRANSICION VALUES (NULL, ?,?,?,?,?,?,?,?)",
        encargada
      );
      const [dataAcompanante]: any = await conexion?.query(
        "INSERT INTO PERSONAS_INVOLUCRADAS_TRANSICION VALUES (NULL, ?,?,?,?,?,?,?,?)",
        acompanante
      );

      const [dataAntecedentes]: any = await conexion?.query(
        "INSERT INTO HISTORIAS_CLINICAS VALUES (NULL, ?,?,?,?,?,?)",
        antecedentes
      );

      const idPsique = (dataAreaPsiquica as OkPacket).insertId;
      const idAntecedente = (dataAntecedentes as OkPacket).insertId;
      const idEncargada = (dataEncargada as OkPacket).insertId;
      const idAcompanante = (dataAcompanante as OkPacket).insertId;

      ficha.push(idPaciente);
      ficha.push(idUsuario);
      ficha.push(idPsique);
      ficha.push(idAntecedente);
      ficha.push(idEncargada);
      ficha.push(idAcompanante);

      const [dataForm]: any = await conexion?.query(
        "INSERT INTO fichas_tecnicas VALUES (NULL, ?,?,?,?,?,?,?,?,?,?,?, ?)",
        ficha
      );

      const idFicha = (dataForm as OkPacket).insertId;

      await conexion?.commit();
      return "Ficha creada Correctamente";
    } catch (err) {
      conexion?.rollback();
      console.log(err);
      throw new Error("Error en la consulta");
    }
  }

  static async buscarPaciente(rutPaciente: string) {
    try {
      const query: string = ` 
      SELECT
        id_paciente,
          fecha_ingreso,
          rut_paciente,
          pasaporte,
          nombre_paciente,
          apellido_paterno_paciente,
          apellido_materno_paciente,
          pronombre,
          nombre_social,
          fecha_nacimiento_paciente,
          domicilio_paciente,
          telefono_paciente,
          uso_droga,
          antecedente_familires,
          detalles_uso_droga,
          detalles_antecedentes_familia,
          fk_historia_genero,
          fk_habitos_alimenticios
      FROM fichas_tecnicas AS ft
      JOIN pacientes AS pa ON ft.fk_paciente = pa.id_paciente
      WHERE rut_paciente LIKE "%${rutPaciente}"
      AND pa.id_paciente = (
          SELECT MAX(id_paciente)
          FROM pacientes
          WHERE rut_paciente LIKE "%${rutPaciente}"
      )
      `;

     

      const dataPaciente: Array<string> = await consultasGenerales(query);
      return dataPaciente;
    } catch (err) {
      console.log(err);
      throw new Error("Error de consulta");
    }
  }
}
