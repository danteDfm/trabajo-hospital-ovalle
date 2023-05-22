import { TypeHistoriaGenero } from "../../../types/tipos.entidades";

export class HistoriaGenero {
    
  public identidadGenero?: string;
  public orientacionSexual?: string;
  public inicioTransicioSexual: Date;
  public tiempoLatencia: Date;
  public apoyoFamiliar: boolean;
  public usoPrenda: boolean;
  public presenciaDisforia: boolean;
  public detallesDiforia?: string;

  constructor(genero: TypeHistoriaGenero) {
    this.identidadGenero = genero.identidadGenero;
    this.orientacionSexual = genero.orientacionSexual;
    this.inicioTransicioSexual = genero.inicioTransicioSexual;
    this.tiempoLatencia = genero.tiempoLatencia;
    this.apoyoFamiliar = genero.apoyoFamiliar;
    this.usoPrenda = genero.usoPrenda;
    this.presenciaDisforia = genero.presenciaDisforia;
    this.detallesDiforia = genero.detallesDiforia;
  }
}
