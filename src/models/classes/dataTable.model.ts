import { consultasGenerales } from "../../consultas/consultasGenerales";
import { diccionarioSelect } from "../../consultas/dicQuery";

export class DataTable {
  constructor() {}

  //buscar paciente por centro
  async pacienteCentroEspesifico(centro:string, condicion:string) {
    try {

      
      const query: string = `SELECT nombre_centro_salud,id_paciente, id_ficha_tecnica , rut_paciente,
      nombre_paciente,apellido_paterno_paciente, apellido_materno_paciente 
      FROM fichas_tecnicas AS ft JOIN pacientes AS  pa ON ft.fk_paciente = pa.id_paciente
      left JOIN PROFESIONALES_USUARIOS_SALUD AS ps ON ft.fk_profesional_usuario = ps.id_profesional_salud
      left JOIN  centros_salud AS cs ON ps.fk_centro_salud = cs.id_centro_salud
      WHERE nombre_centro_salud `+condicion+` ?
      ORDER BY id_paciente DESC`;

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

  
}
