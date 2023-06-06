import { FormularioSegundoPaso } from "./segundo.paso.model";
import {
  AreaPsiquica,
  PrimerPaso,
  Pacientes,
  HistoriaGenero,
} from "../../interfaces/tipos.entidades";
import { mysqlConnexion } from "../../..";
import { OkPacket } from "mysql2";

export class FormularioTercerPaso
  extends FormularioSegundoPaso
  implements AreaPsiquica
{
  controlEquipoSaludMental?: boolean;
  psicoterapia?: boolean;
  evaluacionPsiquica?: boolean;
  diagnosticoPsiquiatrico?: boolean;
  utilizacionFarmaco?: boolean;
  detallesFarmacos?: string;

  public dieta: string;

  constructor(
    areaPsiquica: AreaPsiquica,
    dieta: string,
    genero: HistoriaGenero,
    primerPaso: PrimerPaso,
    pacientes: Pacientes,
    prendas: number[]
  ) {
    super(genero, primerPaso, pacientes, prendas);

    (this.controlEquipoSaludMental = areaPsiquica.controlEquipoSaludMental),
      (this.psicoterapia = areaPsiquica.psicoterapia),
      (this.evaluacionPsiquica = areaPsiquica.evaluacionPsiquica),
      (this.diagnosticoPsiquiatrico = areaPsiquica.diagnosticoPsiquiatrico),
      (this.utilizacionFarmaco = areaPsiquica.utilizacionFarmaco),
      (this.detallesFarmacos = areaPsiquica.detallesFarmacos);

    this.dieta = dieta;
  }

  async crearTercerPaso(idPaciente: number) {
    const conexion = await mysqlConnexion;
    const query: string =
      "INSERT INTO AREAS_PSIQUICAS VALUES (NULL, ?,?,?,?,?,?)";
    const query1: string =
      "INSERT INTO HABITOS_ALIMENTICIOS VALUES (NULL, ?,?)";
    try {
      await conexion?.beginTransaction();
      const [headDataPsico]: any = await conexion?.query(query, [
        this.controlEquipoSaludMental,
        this.psicoterapia,
        this.evaluacionPsiquica,
        this.diagnosticoPsiquiatrico,
        this.utilizacionFarmaco,
        this.detallesFarmacos,
      ]);

      const [headDataDieta]: any = await conexion?.query(query1, [
        this.dieta,
        idPaciente,
      ]);

      const idAreaPsiquica = (headDataPsico as OkPacket).insertId;
      const idDieta = (headDataDieta as OkPacket).insertId;

      await conexion?.commit();

      return {
        idAreaPsiquica,
        idDieta,
      };
      
    } catch (err) {
      await conexion?.rollback();
      console.log(err);
      throw "Error de consulta";
    }
  }
}
