import { FormularioSegundoPaso } from "./segundo.paso.model";
import {
  AreaPsiquica,
  PrimerPaso,
  Pacientes,
  HistoriaGenero,
} from "../../interfaces/tipos.entidades";
import { mysqlConnexion } from "../../..";
import { OkPacket } from "mysql2";
import { consultasGenerales } from "../../../consultas/consultasGenerales";

export class FormularioTercerPaso
  extends FormularioSegundoPaso
  implements AreaPsiquica
{
  controlEquipoSaludMental?: boolean;
  psicoterapia?: boolean;
  evaluacionPsiquica?: boolean;
  diagnosticoPsiquiatrico?: boolean;
  utilizacionFarmaco?: boolean;
  detallesFarmacos?: string | null;

  public usoDroga: boolean;
  public detallesDroga: string | null;

  public dieta: string | null;

  constructor(
    areaPsiquica: AreaPsiquica,
    usoDroga: boolean,
    detallesDroga: string | null,
    dieta: string | null,
    genero: HistoriaGenero,
    primerPaso: PrimerPaso,
    pacientes: Pacientes,
    prendas: number[]
  ) {
    super(genero, primerPaso, pacientes, prendas);

     (this.controlEquipoSaludMental =
      areaPsiquica.controlEquipoSaludMental),
      (this.psicoterapia = areaPsiquica.psicoterapia),
      (this.evaluacionPsiquica = areaPsiquica.evaluacionPsiquica),
      (this.diagnosticoPsiquiatrico =
        areaPsiquica.diagnosticoPsiquiatrico ),
      (this.utilizacionFarmaco = areaPsiquica.utilizacionFarmaco),
      (this.detallesFarmacos = areaPsiquica.detallesFarmacos || null);

      this.usoDroga = usoDroga;

     
      this.detallesDroga = detallesDroga || null;

      this.dieta = dieta || null;
  }

  async crearTercerPaso(idPaciente: number) {

    const query: string =
      "INSERT INTO AREAS_PSIQUICAS VALUES (NULL, ?,?,?,?,?,?)";

    const query1: string =
      "INSERT INTO HABITOS_ALIMENTICIOS VALUES (NULL, ?,?)";

    const query3: string = "INSERT INTO HISTORIAL_DROGAS VALUES (NULL, ?,?,?)";

    try {
   
      const headDataPsico: any = await consultasGenerales(query, [
        this.controlEquipoSaludMental,
        this.psicoterapia,
        this.evaluacionPsiquica,
        this.diagnosticoPsiquiatrico,
        this.utilizacionFarmaco,
        this.detallesFarmacos,
      ]);

      const headDataDieta: any = await consultasGenerales(query1, [
        this.dieta,
        idPaciente,
      ]);

      const headDataDrogas: any = await consultasGenerales(query3, [
        this.usoDroga,
        this.detallesDroga,
        idPaciente,
      ]);

      const idAreaPsiquica = (headDataPsico as OkPacket).insertId;
      const idDieta = (headDataDieta as OkPacket).insertId;
      const idDrogas = (headDataDrogas as OkPacket).insertId;



      return {
        idAreaPsiquica,
        idDieta,
        idDrogas,
      };
    } catch (err) {
  
      console.log(err);
      throw "Error de consulta";
    }
  }

  async actulizarTercerPaso(idAreaPsiquica:number, idDieta:number, idDrogas:Number){

    const objConexion = await mysqlConnexion;
    const queryAreaPsique: string = `UPDATE AREAS_PSIQUICAS SET
    control_equipo_salud_mental = ?, psicoterapia  = ?,
    evaluacion_psiquica= ?,  diagnostico_psiquiatrico = ?, utilizacion_farmaco = ?, detalles_farmacos = ? WHERE id_area_psiquica = ?`;

    const queryHabitos:string = `UPDATE HABITOS_ALIMENTICIOS SET detalle_habito_alimenticio = ? WHERE id_habito_alimenticio = ?`;

    const queryDrogas:string = `UPDATE HISTORIAL_DROGAS
    SET uso_droga = ?, 
    detalles_uso_droga = ?
    WHERE id_historial_droga = ?
    `;
    try{  

      if(!idAreaPsiquica) return 0;

      await objConexion?.query(queryAreaPsique, [
        this.controlEquipoSaludMental, 
        this.psicoterapia, 
        this.evaluacionPsiquica, 
        this.diagnosticoPsiquiatrico, 
        this.utilizacionFarmaco, 
        this.detallesFarmacos,
        idAreaPsiquica
      ]);

      if(!idDieta) return 0;

      await objConexion?.query(queryHabitos, [this.dieta, idDieta]);

      if(!idDrogas) return 0;
 
      await objConexion?.query(queryDrogas, [
        this.usoDroga, 
        this.detallesDroga,
        idDrogas
      ]);

      return "Los datos han sido actualizados: tercer paso";

    }catch(err:any){


      throw new Error(err);

    }

  }
}

