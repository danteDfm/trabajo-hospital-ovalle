// export function repetirCadena1(veces: number, cadena: string): string{
//   try{
//     if(!veces || !cadena) throw new Error("LOS PARAMETROS NO DEBEN ESTAR VACIOS");
//     if(veces <= 0) throw new Error("DEBE SER UN NUMERO MAYOR A CERO");
    
//     let resultado: string = "";

//     for (let i: number = 0; i < veces; i++) {
//       resultado += cadena;
//     }

//     return resultado;
//   }
//   catch(err){

//     console.log(err);

//   }
//   return "";
// }

export function repetirCadena(veces: number, cadena: string): string {
 
    if (veces === 1) {
      return cadena;
    } else {
      return cadena + repetirCadena(veces - 1, cadena);
    }

}