import { HistoriaGenero } from "../../interfaces/tipos.entidades";



export class CHistoriaGenero implements HistoriaGenero{
    
   public identidadGenero?: string | null;
   public orientacionSexual?: string | null;
   public inicioTransicioSexual?: Date | null;
   public tiempoLatencia?: Date | null;
   public apoyoFamiliar?: boolean | null;
   public usoPrenda?: boolean | null;
   public presenciaDisforia?: boolean | null;
   public detallesDiforia?: string | null;

   constructor(genero:HistoriaGenero) {
     this.identidadGenero = genero.identidadGenero ? genero.identidadGenero : null;
     this.orientacionSexual = genero.orientacionSexual;
     this.inicioTransicioSexual = genero.inicioTransicioSexual;
     this.tiempoLatencia = genero.tiempoLatencia;
     this.apoyoFamiliar = genero.apoyoFamiliar;
     this.usoPrenda = genero.usoPrenda;
     this.presenciaDisforia = genero.presenciaDisforia;
     this.detallesDiforia = genero.detallesDiforia;
   }
 }
