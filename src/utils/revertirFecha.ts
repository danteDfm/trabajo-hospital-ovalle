export function revertirFecha(fecha: Array<string>) {

    let nuevaFecha:string;
    let dateArray:Array<string>;
    let fechaFormat:Array<string>;

     fechaFormat=fecha.map(result =>{

       dateArray = result.split("/");
       nuevaFecha = dateArray.reverse().join("/");
       return nuevaFecha;

    });

  
 
  return fechaFormat;
}
