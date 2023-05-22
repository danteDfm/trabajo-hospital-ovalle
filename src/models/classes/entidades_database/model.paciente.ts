import {
  consultasGenerales,
  returnNull,
} from "../../../consultas/consultasGenerales";
import { repetir } from "../../../utils/generaConsultas";
import { dicQuerys } from "../../../consultas/dicQuery";
export class Paciente {
  constructor() {}

  async crearPaciente(fkHistoriaGenero:number, fkAntecedentesFamilia:number, fkDetallesDrogas:number, fkHabitosAlimenticios:number ,paciente:{

    rutPaciente?: string,
    nombrePaciente: string,
    pasaportePaciente?:string,
    apellidoPaternoPaciente?: string,
    apellidoMaternoPaciente?: string,
    fechaNacimientoPaciente: Date,
    antecedenteFamiliares: boolean,
    usoDroga: boolean,
    pronombre?: string,
    nombreSocial?: string,
    domicilioPaciente?: string,
    telefono: string

  }) {
    try {

      const {insertId: idPaciente}= await consultasGenerales(
        `INSERT INTO PACIENTES VALUES (null, ${repetir(
          16
        )})`,
        [ paciente.rutPaciente,
          paciente.pasaportePaciente,
          paciente.nombrePaciente,
          paciente?.apellidoPaternoPaciente,
          paciente?.apellidoMaternoPaciente,
          paciente?.pronombre,
          paciente?.nombreSocial,
          paciente?.fechaNacimientoPaciente,
          paciente?.domicilioPaciente,
          paciente.telefono,
          paciente?.usoDroga,
          paciente?.antecedenteFamiliares,
          fkHistoriaGenero, 
          fkAntecedentesFamilia,
          fkDetallesDrogas, 
          fkHabitosAlimenticios
        ]
      );
        
      return idPaciente;

      
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  
   async traerDataPaciente() {
    try {
      const dataPaciente = await consultasGenerales(` 
        SELECT  id_paciente, pa.rut_paciente,
        pa.nombre_paciente, pa.apellido_paterno_paciente,
        pa.apellido_materno_paciente
        FROM PACIENTES AS pa
        `);

    
      return dataPaciente;
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  }


   async traerXRut(rut:string){

    if(rut.length < 10 || rut.length > 10 ){

      return 0;

    }

    const query:string = `SELECT * FROM pacientes AS pa WHERE pa.rut_paciente LIKE "%${rut}%"`
    const dataXRut=await consultasGenerales(query);
    return dataXRut;
   
  }

  
  async crearDetallesPaciente(
    detallesPaciente: {
      detallesDrogas?: string;
      detallesAlimenticios?: string;
      detallesAntecedentes?: string;
    }) {
    try {
      const consultas = {
        
        drogas: "INSERT INTO DETALLES_DROGAS VALUES (NULL, ?)",
        alimenticio: "INSERT INTO HABITOS_ALIMENTICIOS VALUES (NULL, ?)",
        antecedentesFamilia: "INSERT INTO ANTECEDENTES_FAMILIARES VALUES (NULL, ?)",
      
      };

      const { insertId: idDrogas } = await returnNull(
        consultas.drogas,
        detallesPaciente.detallesDrogas
      );

      const { insertId: idAlimenticio } = await returnNull(
        consultas.alimenticio,
        detallesPaciente.detallesAlimenticios
      );

      const { insertId: idAFamilia } = await returnNull(
        consultas.antecedentesFamilia,
        detallesPaciente.detallesAntecedentes
      );

  

      return {
        idDrogas: idDrogas,
        idAlimenticio,
        idAFamilia,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async mostrarPacienteFicha(rutPaciente: string) {
    try{
     if (!rutPaciente || rutPaciente.length < 9 || rutPaciente.length > 9) {
       return "sin resultdos";
     }
 
     const paciente = await consultasGenerales(dicQuerys.paciente, [
       parseInt(rutPaciente),
     ]);
     const idPaciente = paciente[0].id_paciente;
 
     const detalles = await consultasGenerales(dicQuerys.detallesPaciente, [idPaciente,]);
     let prenda = await consultasGenerales(dicQuerys.seleccionPrenda, [idPaciente]);

     //convertir los valores en arrelgos 
     prenda = prenda.map((result:number)=>{return Object.values(result)});

     const hClinicas = await consultasGenerales(dicQuerys.historiasClinicas, [ idPaciente]);
     const aFamilia = await consultasGenerales(dicQuerys.apoyoFamilia, [idPaciente]);
     const fGenital = await consultasGenerales(dicQuerys.funcionalidadGenital, [idPaciente]);
     const juicio = await consultasGenerales(dicQuerys.detallesJuicio, [idPaciente]);
     const encargado = await consultasGenerales(dicQuerys.encargado, [idPaciente]);
     const acompanante = await consultasGenerales(dicQuerys.acompanante, [idPaciente]);
     const areaPsique = await consultasGenerales(dicQuerys.areaPsicologica, [idPaciente]);
     const ficha = await consultasGenerales(dicQuerys.ficha, [idPaciente]);
     
     

      

     return {
       paciente: paciente[0],
       detalles: detalles[0],
       prenda: prenda,
       hClinicas: hClinicas[0],
       aFamilia: aFamilia[0],
       fGenital: fGenital[0],
       juicio: juicio[0],
       encargado: encargado[0],
       acompanante: acompanante[0],
       areaPsique: areaPsique[0],
       ficha: ficha[0],
     };
    }catch(err){
 
     throw(err);
 
    }
   }
 
}


