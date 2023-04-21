import {
   ElementosDisforia,
 } from "../interfaces/interfaz.formulario.registro";


class FormularioRegistro
      implements  
      ElementosDisforia {

  //presencia elementos Disforia 
   detallesDisforia?: string | undefined;
   disforia: boolean; 

   prenda?: number | undefined;
   usoPrenda: boolean;
  

    constructor(
      elementosDisforia: ElementosDisforia, 
   
      ){

      this.detallesDisforia = elementosDisforia.detallesDisforia;
      this.disforia = elementosDisforia.disforia;
      this.prenda = elementosDisforia.prenda;
      this.usoPrenda = elementosDisforia.usoPrenda;

    }
  

  
}
export default FormularioRegistro;