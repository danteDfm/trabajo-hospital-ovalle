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
  controlEquipoSaludMental?: boolean | null;
  psicoterapia?: boolean | null;
  evaluacionPsiquica?: boolean | null;
  diagnosticoPsiquiatrico?: boolean | null;
  utilizacionFarmaco?: boolean | null;
  detallesFarmacos?: string | null;

  public usoDroga:boolean | null;
  public detallesDroga: string | null

  public dieta: string | null;

  constructor(
    areaPsiquica: AreaPsiquica,
    usoDroga:boolean | null,
    detallesDroga: string| null,
    dieta: string | null,
    genero: HistoriaGenero,
    primerPaso: PrimerPaso,
    pacientes: Pacientes,
    prendas: number[]
  ) {
    super(genero, primerPaso, pacientes, prendas);

    (this.controlEquipoSaludMental = areaPsiquica.controlEquipoSaludMental || null),
      (this.psicoterapia = areaPsiquica.psicoterapia || null),
      (this.evaluacionPsiquica = areaPsiquica.evaluacionPsiquica || null),
      (this.diagnosticoPsiquiatrico = areaPsiquica.diagnosticoPsiquiatrico || null),
      (this.utilizacionFarmaco = areaPsiquica.utilizacionFarmaco || null),
      (this.detallesFarmacos = areaPsiquica.detallesFarmacos || null);

      this.usoDroga = usoDroga;
      this.detallesDroga = detallesDroga;
    this.dieta = dieta || null;
  }

  async crearTercerPaso(idPaciente: number) {
    const conexion = await mysqlConnexion;
    const query: string =
      "INSERT INTO AREAS_PSIQUICAS VALUES (NULL, ?,?,?,?,?,?)";
    const query1: string =
      "INSERT INTO HABITOS_ALIMENTICIOS VALUES (NULL, ?,?)";
    const query3:string = "INSERT INTO HISTORIAL_DROGAS VALUES (NULL, ?,?,?)";

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

      const [headDataDrogas]:any = await conexion?.query(query3, [

        this.usoDroga, 
        this.detallesDroga, 
        idPaciente

      ]);

      const idAreaPsiquica = (headDataPsico as OkPacket).insertId;
      const idDieta = (headDataDieta as OkPacket).insertId;
      const idDrogas = (headDataDrogas as OkPacket).insertId;

      await conexion?.commit();

      return {
        idAreaPsiquica,
        idDieta,
        idDrogas
      };
      
    } catch (err) {
      await conexion?.rollback();
      console.log(err);
      throw "Error de consulta";
    }
  }
}
