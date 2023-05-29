import { consultasGenerales } from "../../consultas/consultasGenerales";
import { diccionarioSelect } from "../../consultas/dicQuery";


export class DataTable {
  constructor() {}

  //listar pacientes por centro
  async pacienteCentroEspesifico(centro:string, condicion:string) {
    try {

        const query: string = `SELECT  DISTINCT (rut_paciente), id_paciente,pa.nombre_paciente, pa.apellido_paterno_paciente, pa.apellido_materno_paciente,nombre_centro_salud FROM fichas_tecnicas AS ft
        JOIN pacientes AS pa ON ft.fk_paciente = pa.id_paciente
        JOIN profesionales_usuarios_salud AS pu ON pu.id_profesional_salud = ft.fk_profesional_usuario
        JOIN centros_salud AS cs ON pu.fk_centro_salud = cs.id_centro_salud
        WHERE nombre_centro_salud `+condicion+` ?
        ORDER BY id_paciente DESC  
      `;

    

      
      
      const data = await consultasGenerales(query, [centro])
      return data;
      
    } catch (err) {
      console.log(err);
      throw("Error en la consulta");
    }
  }


  //buscar paciente por id 
  async traerDataPaciente(idFicha:number){
   try{

  
    const dataFicha = await consultasGenerales(diccionarioSelect.ficha, [idFicha]);
    const dataPaciente = await consultasGenerales(diccionarioSelect.paciente, [dataFicha[0].fk_paciente]);
    const dataHistoria= await consultasGenerales(diccionarioSelect.HistoriaGenero, [dataPaciente[0].fk_historia_genero]);
    const dataDieta = await consultasGenerales(diccionarioSelect.dieta, [dataPaciente[0].fk_habitos_alimenticios]);
    const dataPrenda = await consultasGenerales(diccionarioSelect.prenda, [dataHistoria[0].id_historia_identidad_genero]);
    const dataAntecedentes = await consultasGenerales(diccionarioSelect.antecedentes, [dataFicha[0].fk_historia_clinica]);
    const involucrados = await  consultasGenerales(diccionarioSelect.involucrados, [dataFicha[0].fk_persona_involucrada_encargada]);
    const acompanantes = await  consultasGenerales(diccionarioSelect.involucrados, [dataFicha[0].fk_persona_involucrada_acompanante]);
    const dataPsique = await  consultasGenerales(diccionarioSelect.psique, [dataFicha[0].fk_area_psiquica]);

    dataFicha.push(dataAntecedentes[0]);
    dataFicha.push(dataPsique[0]);
    dataFicha.push(dataPaciente[0]);
    dataFicha.push(dataHistoria[0]);
    dataFicha.push(dataDieta[0]);
    dataFicha.push(dataPrenda[0]);
    dataFicha.push(involucrados[0]);
    dataFicha.push(acompanantes[0]);

 
    return dataFicha;

  }catch(err){

    console.log(err);
    throw("Error de consulta");

    }
  }


  async listarFichasPorRut(rutPaciente:string){

    try{
      const query:string = `SELECT rut_paciente,id_ficha_tecnica FROM fichas_tecnicas AS ft
      JOIN pacientes AS pa ON  ft.fk_paciente = pa.id_paciente
      WHERE rut_paciente = ?
    `;


      const query2 = `SELECT fecha_ingreso, nombre_paciente,apellido_paterno_paciente , apellido_materno_paciente,rut_paciente, nombre_social, identidad_genero, fecha_nacimiento_paciente FROM fichas_tecnicas AS ft
      JOIN pacientes AS pa ON ft.fk_paciente = pa.id_paciente
      JOIN historias_identidades_generos AS hg ON pa.fk_historia_genero = hg.id_historia_identidad_genero
      WHERE rut_paciente = ? AND fecha_ingreso = (SELECT max(fecha_ingreso) FROM fichas_tecnicas AS ft
      JOIN pacientes AS pa ON ft.fk_paciente = pa.id_paciente
      JOIN historias_identidades_generos AS hg ON pa.fk_historia_genero = hg.id_historia_identidad_genero
      WHERE rut_paciente = ?)`;

    const fichas=await consultasGenerales(query, [rutPaciente]);
    const dataEspesifica=await consultasGenerales(query2, [rutPaciente, rutPaciente]);

    fichas.unshift(dataEspesifica[0])

    return  fichas;
    }catch(err){

      console.log(err);
      throw new Error("Error en la consulta Listar fichas");

    }

  }

  static async buscarSoloRut(rutPaciente:string):Promise<number | undefined>{

   try{

    const query:string = "SELECT id_paciente FROM PACIENTES WHERE rut_paciente = ?";
    let dataPaciente: Promise <number | undefined> = await consultasGenerales(query, [rutPaciente]);
    return dataPaciente;

   }
   catch(err){

    console.log(err);
    throw new Error("Error listar por rut");

   }  
  }


  
}
