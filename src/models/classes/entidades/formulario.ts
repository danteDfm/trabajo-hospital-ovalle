import { Paciente } from "./models_dbs/paciente";
import { Ficha } from "./models_dbs/ficha";
import { PrendaDieta } from "./models_dbs/prendas";
import { HistoriaGenero } from "./models_dbs/historiaGenero";
import { AreaPsique } from "./models_dbs/areaPsiquica";
import { Involucrados } from "./models_dbs/personasInv";
import { AntecedentesCli } from "./models_dbs/antecedentesCli";

import { mysqlConnexion } from "../../..";
import { OkPacket } from "mysql2";

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
      const idDieta = (dataDieta as OkPacket).insertId;

      paciente.push(idHistoriGen);
      paciente.push(idDieta);

      const [dataPaciente]: any = await conexion?.query(
        `INSERT INTO PACIENTES VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        paciente
      );

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

      const idPaciente = (dataPaciente as OkPacket).insertId;
      const idPsique = (dataAreaPsiquica as OkPacket).insertId;
      const idAntecedente = (dataAntecedentes as OkPacket).insertId;
      const idEncargada = (dataEncargada as OkPacket).insertId;
      const idAcompanante = (dataAcompanante as OkPacket).insertId;

      ficha.push(idUsuario);
      ficha.push(idPaciente);
      ficha.push(idPsique);
      ficha.push(idAntecedente);
      ficha.push(idEncargada);
      ficha.push(idAcompanante);

      const [dataForm]: any = await conexion?.query(
        "INSERT INTO fichas_tecnicas VALUES (NULL, ?,?,?,?,?,?,?,?,?,?,?,?)",
        ficha
      );
      const idFicha = (dataForm as OkPacket).insertId;

      await conexion?.commit();
      

      return idFicha;
    } catch (err) {
      conexion?.rollback();
      console.log(err);
      throw err;
    }
  }


}
