import {
  HistoriaGenero,
  PrimerPaso,
  Pacientes,
} from "../../interfaces/tipos.entidades";
import { FormularioPrimerPaso } from "./primer.paso.model";

import { mysqlConnexion } from "../../..";
import { OkPacket } from "mysql2";
import { consultasGenerales } from "../../../consultas/consultasGenerales";

export class FormularioSegundoPaso
  extends FormularioPrimerPaso
  implements HistoriaGenero
{
  public identidadGenero: string | null;
  public orientacionSexual: string | null;
  public autoPercepcion: number | null;
  public inicioTransicioSexual: string | null;
  public tiempoLatencia: string | null;
  public apoyoFamiliar: boolean;
  public usoPrenda: boolean;
  public presenciaDisforia: boolean;
  public detallesDiforia: string | null;

  public tipoPrenda: (number | null)[] | null;

  constructor(
    genero: HistoriaGenero,
    primerPaso: PrimerPaso,
    pacientes: Pacientes,
    prendas: number[]
  ) {
    super(primerPaso, pacientes);

    (this.identidadGenero = genero.identidadGenero || null),
      (this.orientacionSexual = genero.orientacionSexual || null),
      (this.autoPercepcion = genero.autoPercepcion || null);
    (this.inicioTransicioSexual = genero.inicioTransicioSexual || null),
      (this.tiempoLatencia = genero.tiempoLatencia || null),
      (this.apoyoFamiliar = genero.apoyoFamiliar),
      (this.usoPrenda = genero.usoPrenda),
      (this.presenciaDisforia = genero.presenciaDisforia),
      (this.detallesDiforia = genero.detallesDiforia || null);

    this.tipoPrenda = prendas || null;
  }

  async crearSegundoPaso(idPaciente: number) {

    const query: string =
      "INSERT INTO HISTORIAS_IDENTIDADES_GENEROS VALUES (NULL, ?,?,?,?,?,?,?,?,?, ?)";
    const query1: string = "INSERT INTO SELECCION_PRENDA VALUES (null, ?,?)";

    try {
   
      const setHeaderHgenero: any = await consultasGenerales(query, [
        this.identidadGenero,
        this.orientacionSexual,
        this.autoPercepcion,
        this.inicioTransicioSexual,
        this.tiempoLatencia,
        this.apoyoFamiliar,
        this.usoPrenda,
        this.presenciaDisforia,
        this.detallesDiforia,
        idPaciente,
      ]);

      const idHgenero = (setHeaderHgenero as OkPacket).insertId;

      console.log();
      for (let i = 0; i < 5; i++) {
        if (i > this.tipoPrenda!.length - 1) {
          this.tipoPrenda![i] = null;
        }
      }


      this.tipoPrenda?.map(async (data)=>{

        await consultasGenerales(query1, [idHgenero, data]);

      });


      return 0;
    } catch (err) {

      console.log(err);
      throw {
        status: "failure",
        msj: "Error al crear el segundo paso",
      };
    }
  }
  async actualizarSegundoPaso(idHistoria: number, idPrenda:number[]) {

    let cont = 0;
    const objConexion = await mysqlConnexion;
    const queryHistoria = `UPDATE HISTORIAS_IDENTIDADES_GENEROS
    SET identidad_genero  = ?, orientacion_sexual= ?, autopercepcion = ? , inicio_transicion_sexual = ?,tiempo_latencia  = ?,apoyo_nucleo_familiar= ?, uso_prenda  = ?, presencia_disforia = ?, detalles_diforia = ? WHERE id_historia_identidad_genero = ?`;

    const queryPrenda = `UPDATE SELECCION_PRENDA SET fk_prenda_disconformidad  =  ? WHERE id_prenda_n_n = ?`;

 

    try {

      
      if (!idHistoria) return 0;

      await objConexion?.query(queryHistoria, [
        this.identidadGenero,
        this.orientacionSexual,
        this.autoPercepcion,
        this.inicioTransicioSexual,
        this.tiempoLatencia,
        this.apoyoFamiliar,
        this.usoPrenda,
        this.presenciaDisforia,
        this.detallesDiforia,
        idHistoria,
      ]);

    

      idPrenda.map((data)=>{
     
       consultasGenerales(queryPrenda, [

        this.tipoPrenda![cont], 
        data

       ]);
       cont +=1; 
      });

      return "Los datos han sido actualizados: segundo paso";
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
