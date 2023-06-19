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
  public autopercepcion: number | null;
  public inicioTransicioSexual: Date | null;
  public tiempoLatencia: Date | null;
  public apoyoFamiliar: boolean;
  public usoPrenda: boolean;
  public presenciaDisforia: boolean;
  public detallesDiforia: string | null;


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
      this.autopercepcion = genero.autopercepcion|| null;
      (this.inicioTransicioSexual = genero.inicioTransicioSexual || null),
      (this.tiempoLatencia = genero.tiempoLatencia || null),
      (this.apoyoFamiliar = genero.apoyoFamiliar),
      (this.usoPrenda = genero.usoPrenda),
      (this.presenciaDisforia = genero.presenciaDisforia),
      (this.detallesDiforia = genero.detallesDiforia || null);
    

      this.tipoPrenda = prendas || null;

  } 



  async crearSegundoPaso(idPaciente: number){

    const conexion = await mysqlConnexion;
    const query: string =  "INSERT INTO HISTORIAS_IDENTIDADES_GENEROS VALUES (NULL, ?,?,?,?,?,?,?,?,?, ?)";
    const query1: string = "INSERT INTO SELECCION_PRENDA VALUES (null, ?,?)";

    try {

      await conexion?.beginTransaction();

      const [setHeaderHgenero]: any = await conexion?.query(query, [
        this.identidadGenero,
        this.orientacionSexual,
        this.autopercepcion,
        this.inicioTransicioSexual,
        this.tiempoLatencia,
        this.apoyoFamiliar,
        this.usoPrenda,
        this.presenciaDisforia,
        this.detallesDiforia,
        idPaciente,
       
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
  
      throw {
        status: "failure",
        msj: "Error al crear el segundo paso",
      };
    }
  }
  async actualizarSegundoPaso(idHistoria:number){
    const objConexion = await mysqlConnexion;
    const queryHistoria = `UPDATE HISTORIAS_IDENTIDADES_GENEROS
    SET identidad_genero  = ?, orientacion_sexual= ?, autopercepcion = ? ,tiempo_latencia  = ?,apoyo_nucleo_familiar= ?, uso_prenda  = ?, presencia_disforia = ?, detalles_diforia = ? WHERE id_historia_identidad_genero = ?`;

    const queryPrenda = `UPDATE SELECCION_PRENDA SET fk_prenda_disconformidad  =  ? WHERE id_prenda_n_n = ?`;

    try{

      if(!idHistoria) return 0;
      await objConexion?.query(queryHistoria,[
        this.identidadGenero, 
        this.orientacionSexual, 
        this.autopercepcion,
        this.tiempoLatencia, 
        this.apoyoFamiliar, 
        this.usoPrenda, 
        this.presenciaDisforia, 
        this.detallesDiforia, 
        idHistoria
      ]);
  
      // this.tipoPrenda?.map(async (prendas) =>{

      //   await objConexion?.query(queryPrenda, [prendas, idPrenda]);

      // });
      
    
        return "Los datos han sido actualizados: segundo paso";

    }catch(err:any){
      throw new Error(err);
    }

  }
}



