export class Entidades{

    protected rut:string;
    protected nombre:string;
    protected apellidoPaterno?:string;
    protected apellidoMaterno?:string;

    constructor(rut:string, nombre:string, apellidoPaterno?:string, apellidoMaterno?:string){

        this.rut = rut;
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
    }


}