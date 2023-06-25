import { consultasGenerales } from "../../consultas/consultasGenerales";

export class PaginaPrincipal {
  async TotalPacientes() {
    const totalPacientes = await consultasGenerales(
      `SELECT COUNT(id_paciente) AS "paciente" FROM pacientes`
    );
    return totalPacientes[0];
  }
  async cantidadGeneros(genero: string) {
    const [result]: any = await consultasGenerales(
      `SELECT count(identidad_genero) AS "generos" FROM historias_identidades_generos
        WHERE identidad_genero = ?`,
      [genero]
    );

    return result.generos;
  }
  async ingresosDelDia() {
    const query = `SELECT count(id_ficha_tecnica) as ingresosDia FROM fichas_tecnicas WHERE DATE(fecha_ingreso) = CURDATE();`;
    const result = await consultasGenerales(query);
    return result[0];
  }
  async estadisticaAreaPsiquica() {
    const query: string = `
        select 
        control_equipo_salud_mental
        from AREAS_PSIQUICAS where control_equipo_salud_mental = 1 `;

    const total: string = `
        select 
        control_equipo_salud_mental
        from AREAS_PSIQUICAS`;

    const dataAreaPsiquica = await consultasGenerales(query);

    //personas que usan drogas/total de personas
  }

  async estadisticasDisforia() {
    const query: string = `select presencia_disforia  from HISTORIAS_IDENTIDADES_GENEROS`;

    try {
      let porcentajeDis;
      let personasConDisforia: Number[] = [];
      const resultado = await consultasGenerales(query);

      for (let i = 0; i < resultado.length; i++) {
        if (resultado[i].presencia_disforia == 1) {
          personasConDisforia.push(resultado[i].presencia_disforia);
        }
      }

      porcentajeDis = (personasConDisforia.length / resultado.length) * 100;
      porcentajeDis = porcentajeDis.toFixed(2);

      return parseFloat(porcentajeDis);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async estadisticasApoyo(){

    const query = `select apoyo_nucleo_familiar from HISTORIAS_IDENTIDADES_GENEROS`;

    try {

        let porcentajeapoyo;
        let apoyo: Number[] = [];
        const resultado = await consultasGenerales(query);
  
        for (let i = 0; i < resultado.length; i++) {
          if (resultado[i].apoyo_nucleo_familiar == 1) {
            apoyo.push(resultado[i].apoyo_nucleo_familiar);
          }
        }
        
        porcentajeapoyo = (apoyo.length / resultado.length) * 100;
        porcentajeapoyo = porcentajeapoyo.toFixed(2);

        return parseFloat(porcentajeapoyo);
      } catch (err: any) {
        throw new Error(err);
      }

  }

 async estadisticasDrogas(){

    const query = `SELECT uso_droga FROM  HISTORIAL_DROGAS`;

    try {

        let porcentajeDrogas;
        let siUsa: Number[] = [];
        const resultado = await consultasGenerales(query);
  
        for (let i = 0; i < resultado.length; i++) {
          if (resultado[i].uso_droga == 1){
            siUsa.push(resultado[i].uso_droga);
          }
        }   
        porcentajeDrogas = (siUsa.length / resultado.length) * 100;
        porcentajeDrogas = porcentajeDrogas.toFixed(2);   
        return parseFloat(porcentajeDrogas);
      } catch (err: any) {
        throw new Error(err);
      }

  }
 async  estadisticasFarmacos(){

    const query:string = `select utilizacion_farmaco from AREAS_PSIQUICAS`;

    try {

      let porcentajeFarmacos;
      let siUsa: Number[] = [];
      const resultado = await consultasGenerales(query);

      for (let i = 0; i < resultado.length; i++) {
        if (resultado[i].utilizacion_farmaco == 1){
          siUsa.push(resultado[i].utilizacion_farmaco);
        }
      }   
      porcentajeFarmacos = (siUsa.length / resultado.length) * 100;
      porcentajeFarmacos = porcentajeFarmacos.toFixed(2);   
      return parseFloat(porcentajeFarmacos);

    } catch (err: any) {
      throw new Error(err);
    }


  }

  async areapsiquica(){

    const query:string = `select 
    control_equipo_salud_mental,
    psicoterapia,
    evaluacion_psiquica,
    diagnostico_psiquiatrico
    from AREAS_PSIQUICAS`;
    let ControlEquipo:(number)[] = [];
    let psicoterapia:(number)[] = [];
    let psiquica:(number)[] = [];
    let psiquiatrica:(number)[] = [];

    try{

      let dataTotal=await consultasGenerales(query);
      let pacientesEnControl:number[] = [];
      let pacientesEnpsico: number[] = []; 
      let pacientesEvaluacionPsiquica:number[] = []; 
      let conDiagnosticoPsiquiatrico: number[] = [];

      
      for(let i = 0; i<dataTotal.length; i++){


        if(dataTotal[i].control_equipo_salud_mental){

         ControlEquipo.push( dataTotal[i].control_equipo_salud_mental);

        }
        if(dataTotal[i].psicoterapia){
          psicoterapia.push(dataTotal[i].psicoterapia);
        }
        if(dataTotal[i].evaluacion_psiquica){
          psiquica.push(dataTotal[i].evaluacion_psiquica);
        }
        if(dataTotal[i].diagnostico_psiquiatrico){
          psiquiatrica.push(dataTotal[i].diagnostico_psiquiatrico);
        }

      }


      

      const totalEnControl = ControlEquipo.length;   
      const totalEnpsico = psicoterapia.length;
      const totalEnEvalu = psiquica.length;
      const totalPsiquiatrica  = psiquiatrica.length;
    
 

      return {
        totalEnControl, 
        totalEnpsico,
        totalEnEvalu,
        totalPsiquiatrica

      };


    }catch(err:any){

      throw new Error(err);

    }

  }
}
