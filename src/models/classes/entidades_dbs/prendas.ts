import { Prenda } from "../../interfaces/tipos.entidades";

export class CPrenda implements Prenda {
  public tipoPrenda?: Array<number>;

  constructor(prenda: Prenda) {
    this.tipoPrenda = prenda.tipoPrenda;
  }
}
