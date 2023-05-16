import { consultasGenerales, returnNull } from "../../../consultas/consultasGenerales";
export class IdentidadGenero{

    constructor(private IdenGenero:{

        identidadGenero?:string, 
        orientacionSexual?:string,
        inicioTransicion:Date, 
        tiempoLatencia:Date, 
        apoyoFamilia:boolean, 
        usoPrenda:number, 
        presenciaDisforia:number, 
        

    }){}


    async crearIdentidadGenero(fkDetallesDisforia?:number){

       try{



        const query:string = "INSERT INTO HISTORIAS_IDENTIDADES_GENEROS VALUES (NULL, ?,?,?,?,?,?,?,?)";
        const {insertId:idGenero} = await consultasGenerales(query, [

            this.IdenGenero.identidadGenero, 
            this.IdenGenero.orientacionSexual, 
            this.IdenGenero.inicioTransicion, 
            this.IdenGenero.tiempoLatencia, 
            this.IdenGenero.apoyoFamilia, 
            this.IdenGenero.usoPrenda, 
            this.IdenGenero.presenciaDisforia,
            fkDetallesDisforia
        ]);
        return idGenero;

       }catch(err){

        console.log(err);
        throw(err);

       }
    }

     async crearDisforia(detallesDisforia?:string){

      try{

        const query: string  = "INSERT INTO DETALLES_DISFORIA VALUES (NULL, ?)";
        const {insertId: idDisforia} = await returnNull(query, detallesDisforia);
        return idDisforia;

      }
      catch(err){

        console.log(err);
        throw(err);

      }

    }
    async seleccinarPrenda(fkHG?:number, seleccionPrenda?:number[]){

       try{

        const query: string  =  `INSERT INTO  SELECCION_PRENDA VALUES (NULL, ${fkHG}, ?)`;

        seleccionPrenda?.map(async prenda =>{

         await returnNull(query, prenda);

        });

        return 0;
       }catch(err){

            console.log(err);
            throw(err);
       }

    }

}