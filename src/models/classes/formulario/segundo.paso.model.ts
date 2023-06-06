import {
  HistoriaGenero,
  PrimerPaso,
  Pacientes
} from "../../interfaces/tipos.entidades";
import { FormularioPrimerPaso } from "./primer.paso.model";

import { mysqlConnexion } from "../../..";
import { OkPacket } from "mysql2";

export class FormularioSegundoPaso
  extends FormularioPrimerPaso
  implements HistoriaGenero
{
  public identidadGenero: string | null;
  public orientacionSexual: string | null;
  public inicioTransicioSexual: Date | null;
  public tiempoLatencia: Date | null;
  public apoyoFamiliar: boolean | null;
  public usoPrenda: boolean | null;
  public presenciaDisforia: boolean | null;
  public detallesDiforia: string | null;
  public autoPercepcion: number | null;

  public tipoPrenda:(number)[]| null;

  constructor(
    genero: HistoriaGenero,
    primerPaso: PrimerPaso,
    pacientes: Pacientes,
    prendas: (number)[]
  ) {
    super(primerPaso, pacientes);

    
   
    (this.identidadGenero = genero.identidadGenero || null),
      (this.orientacionSexual = genero.orientacionSexual || null),
      (this.inicioTransicioSexual = genero.inicioTransicioSexual || null),
      (this.tiempoLatencia = genero.tiempoLatencia || null),
      (this.apoyoFamiliar = genero.apoyoFamiliar || null),
      (this.usoPrenda = genero.usoPrenda || null),
      (this.presenciaDisforia = genero.presenciaDisforia || null),
      (this.detallesDiforia = genero.detallesDiforia || null);
      this.autoPercepcion = genero.autoPercepcion || null

      this.tipoPrenda = prendas || null;

  } 



  async crearSegundoPaso(idPaciente: number) {
    const conexion = await mysqlConnexion;
    const query: string =
      "INSERT INTO HISTORIAS_IDENTIDADES_GENEROS VALUES (NULL, ?,?,?,?,?,?,?,?,?, ?)";
    const query1: string = "INSERT INTO SELECCION_PRENDA VALUES (null, ?,?)";

    try {

      await conexion?.beginTransaction();
      const [setHeaderHgenero]: any = await conexion?.query(query, [
        this.identidadGenero,
        this.orientacionSexual,
        this.inicioTransicioSexual,
        this.tiempoLatencia,
        this.apoyoFamiliar,
        this.usoPrenda,
        this.presenciaDisforia,
        this.detallesDiforia,
        idPaciente,
        this.autoPercepcion
      ]);


      const idHgenero = (setHeaderHgenero as OkPacket).insertId;

      this.tipoPrenda?.map(async (prendas) =>{
        await conexion?.query(query1, [idHgenero, prendas]);
      });

      await conexion?.commit();

      return 0;
    } catch (err) {

      console.log(err);
      await conexion?.rollback();
      if (err == 101) {
        throw {
          code: err,
          status: "failure",
          msj: "Error, el id no debe venir vacio",
        };
      }


      throw {
        status: "failure",
        msj: "Error al crear el segundo paso",
      };
    }
  }
}
