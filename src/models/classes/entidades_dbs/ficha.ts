import { TypeFichaTecnica } from "../../types/tipos.entidades";

export class Ficha{

    public fechaIngreso: Date;
    public borradoLogico: boolean;
    public apoyoEscolar: boolean;
    public judicializacio: boolean;
    public detallesApoyo?: string;
    public detallesJudicializacion?:string;

    constructor(ficha: TypeFichaTecnica){

        this.fechaIngreso = ficha.fechaIngreso;
        this.borradoLogico = ficha.borradoLogico;
        this.apoyoEscolar = ficha.apoyoEscolar;
        this.judicializacio = ficha.judicializacio;
        this.detallesApoyo = ficha.detallesApoyo;
        this.detallesJudicializacion = ficha.detallesJudicializacion;

    }
}