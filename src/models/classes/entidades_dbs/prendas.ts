import { PrendaYdieta } from "../../types/tipos.entidades";

export class PrendaDieta{

    public detallesHabitoAlimenticio:string;
    public fkPrendaDisconformidad?:Array<number>;

    constructor(pyd:PrendaYdieta){

        this.detallesHabitoAlimenticio = pyd.detallesHabitoAlimenticio;
        this.fkPrendaDisconformidad = pyd.fkPrendaDisconformidad;

    }

}