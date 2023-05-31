import { FichaTecnica } from "../../interfaces/tipos.entidades";

export class Ficha implements FichaTecnica {

  public fechaIngreso: Date;
  public fechaFinalizacion: Date;
  public estadoFicha: boolean;;
  public borradoLogico: boolean;
  public apoyoEscolar?: boolean;
  public judicializacio?: boolean;
  public detallesApoyo?: string;
  public detallesJudicializacion?: string;

  constructor(ficha: FichaTecnica) {
    this.fechaIngreso = ficha.fechaIngreso;
    this.fechaFinalizacion = ficha.fechaFinalizacion;
    this.estadoFicha = ficha.estadoFicha;
    this.borradoLogico = ficha.borradoLogico;
    this.apoyoEscolar = ficha.apoyoEscolar;
    this.judicializacio = ficha.judicializacio;
    this.detallesApoyo = ficha.detallesApoyo;
    this.detallesJudicializacion = ficha.detallesJudicializacion;
  }
}
