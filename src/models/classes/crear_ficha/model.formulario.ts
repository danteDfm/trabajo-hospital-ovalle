import { devolucionId } from "../../../consultas/devolucion.Id";
import { generadorConsultas } from "../../../utils/generaConsultas";
import {
  InformacionPaciente,
  IdentidadGenero,
  EntornoPaciente,
  AreaPsiquica,
  AntecedentesClinicosPaciente,
} from "./ficha.pasos";

type Ids = number | null;

export class FormularioRegistro {
  informacionPaciente: InformacionPaciente;
  indentidadGenero: IdentidadGenero;
  entornoPaciente: EntornoPaciente;
  areaPsiquica: AreaPsiquica;
  antecedentesClinicosPaciente: AntecedentesClinicosPaciente;

  constructor() {
    this.informacionPaciente = new InformacionPaciente();
    this.indentidadGenero = new IdentidadGenero();
    this.entornoPaciente = new EntornoPaciente();
    this.areaPsiquica = new AreaPsiquica();
    this.antecedentesClinicosPaciente = new AntecedentesClinicosPaciente();
  }

  async crearTablasTerciarias() {


    
    const idPresenciaDisforia = await devolucionId(
      generadorConsultas(`PRESENCIA_DISFORIA`, 1),
      [this.areaPsiquica.datosPsiquicos.disforia.presenciaDisforia
      ],
      true
    );

     devolucionId(
      generadorConsultas(`DETALLES_DISFORIA`, 2),
      [
        this.areaPsiquica.datosPsiquicos.disforia.detallesDisforia, idPresenciaDisforia
      ],
      this.areaPsiquica.datosPsiquicos.disforia.presenciaDisforia
    );
      

  

     devolucionId(
      generadorConsultas(`SELECCION_PRENDA`, 1),
      [
      
        this.indentidadGenero.historiaIdentidadGenero.prendasDisconformidadGenero,
      ],
      this.indentidadGenero.historiaIdentidadGenero.prendasDisconformidadGenero
        .usoPrenda
    );  

    
    const idUsoPrenda = await devolucionId(
      generadorConsultas(`USO_PRENDAS`, 1),
      [
        this.indentidadGenero.historiaIdentidadGenero.prendasDisconformidadGenero.usoPrenda,
      ],
      true
    );  


    const idPresenciaAntecedentesFamiliares = await devolucionId(
      generadorConsultas(`PRESENCIA_ANTECEDENTES`, 2),
      [
        this.entornoPaciente.entornoPaciente.antecedentesFamiliares,
       
      
      ],
      true
    );  


     devolucionId(
      generadorConsultas(`ANTECEDENTES_FAMILIARES`, 1),
      [
        this.entornoPaciente.entornoPaciente.antecedentesFamiliares
          .detallesAntecedentes, idPresenciaAntecedentesFamiliares
      ],
      this.entornoPaciente.entornoPaciente.antecedentesFamiliares
        .presenciaAntecedentes
    );

   

    const idUsoDrogas = await devolucionId(
      generadorConsultas(`USO_DROGAS`, 1),
      [this.areaPsiquica.datosPsiquicos.habitos.usoDrogas],
      true
    );

 

   const idDroga = await devolucionId(
      generadorConsultas(`DROGAS`, 2),
      [this.areaPsiquica.datosPsiquicos.habitos.drogas, idUsoDrogas],
      this.areaPsiquica.datosPsiquicos.habitos.usoDrogas
    );



    
    const idUsoFarmaco =await  devolucionId(
      generadorConsultas(`USO_FARMACO`, 1),
      [this.areaPsiquica.datosPsiquicos.habitos.alimenticios],
      true
    );


    devolucionId(
      generadorConsultas(`TIPOS_FARMACOS`, 2),
      [this.areaPsiquica.datosPsiquicos.usofarmacos.tipoFarmaco, idUsoFarmaco],
      this.areaPsiquica.datosPsiquicos.usofarmacos.usoFarmaco
    );



   




    const idHabitosAlimenticios =await devolucionId(
      generadorConsultas(`HABITOS_ALIMENTICIOS`, 1),
      [this.areaPsiquica.datosPsiquicos.habitos.alimenticios],
      true
    );

    return {
      idUsoPrenda,
      idPresenciaDisforia,
      idPresenciaAntecedentesFamiliares,
      idUsoDrogas,
      idUsoFarmaco,
      idHabitosAlimenticios,
    };
  }

  async crearTablasSecundarias(
    idUsoPrenda: Ids,
    idPresenciaDisforia: Ids,
    idPresenciaAntecedentesFamiliares: Ids,
    idUsoDrogas: Ids,
    idUsoFarmaco: Ids,
    idHabitosAlimenticios: Ids
  ) {
    const idHistoriaIdentidadGenero = await devolucionId(
      generadorConsultas(`HISTORIAS_IDENTIDADES_GENEROS`, 7),
      [
        this.indentidadGenero.historiaIdentidadGenero.historiaGenero
          .identidadGenero,
        this.indentidadGenero.historiaIdentidadGenero.historiaGenero
          .orientacionSexual,
        this.indentidadGenero.historiaIdentidadGenero.historiaGenero
          .inicioTransicion,
        this.indentidadGenero.historiaIdentidadGenero.historiaGenero
          .tiempoLtencia,
        this.indentidadGenero.historiaIdentidadGenero.historiaGenero
          .apoyoNucleoFamiliar,
        idPresenciaDisforia,
        idUsoPrenda,
      ],
      true
    );


    const idPaciente = await devolucionId(
      generadorConsultas(`PACIENTES`, 11),
      [
        this.informacionPaciente.dataPaciente.rutPaciente,
        this.informacionPaciente.dataPaciente.nombrePaciente,
        this.informacionPaciente.dataPaciente.apellidoPaternoPaciente,
        this.informacionPaciente.dataPaciente.apellidoMaternoPaciente,
        this.informacionPaciente.dataPaciente.pronombre,
        this.informacionPaciente.dataPaciente.nombreSocial,
        this.informacionPaciente.dataPaciente.fechaNacimiento,
        this.informacionPaciente.dataPaciente.domicilioPaciente,
        idHabitosAlimenticios,
        idUsoDrogas,
        idPresenciaAntecedentesFamiliares,
        idHistoriaIdentidadGenero,
      ],
      true
    );

    const idAreaPsiquica =await  devolucionId(
      generadorConsultas(`AREAS_PSIQUICAS`, 2),
      [
        this.areaPsiquica.datosPsiquicos.datosPsiquicos
          .controlEquipoSaludMental,
        this.areaPsiquica.datosPsiquicos.datosPsiquicos.psicoterapia,
        this.areaPsiquica.datosPsiquicos.datosPsiquicos.evaluacionPsiquica,
        this.areaPsiquica.datosPsiquicos.datosPsiquicos.diagnosicoPsiquiatrico,
        idUsoFarmaco,
      ],
      true
    );

    const idApoyoEscolaridad = await devolucionId(
      generadorConsultas(`APOYO_ESCOLARIDADES`, 4),
      [
        this.entornoPaciente.entornoPaciente.escolaridad.gradoEscolar,
        this.entornoPaciente.entornoPaciente.escolaridad.gradoDeApoyo,
        this.entornoPaciente.entornoPaciente.escolaridad.actorInvolucrado,
        this.entornoPaciente.entornoPaciente.escolaridad.detallesApoyo,
      ],
      true
    );

    const idFuncionalidadGenital =await  devolucionId(
      generadorConsultas(`ANTECEDENTES_FUNCIONALIDADES_GENITAL`, 1),
      [
        this.antecedentesClinicosPaciente.antecedentesClinicos
          .detallesAntecedentesGenitales,
      ],
      true
    );

    const idPersonaAcompanante = await devolucionId(
      generadorConsultas(`PERSONAS_ACOMPANANTES`, 4),
      [
        this.informacionPaciente.dataInvolucrados.dataAcompanante
          .nombreCompletoAcompanante,
        this.informacionPaciente.dataInvolucrados.dataAcompanante
          .rutAcompanante,
        this.informacionPaciente.dataInvolucrados.dataAcompanante
          .parentescoAcompanante,
        this.informacionPaciente.dataInvolucrados.dataAcompanante
          .telefonoAcompanante,
      ],
      true
    );

    const idPersonaInvolucrada =await  devolucionId(
      generadorConsultas(`PERSONAS_INVOLUCRADAS_TRANSICION`, 7),
      [
        this.informacionPaciente.dataInvolucrados.dataInvolucrado
          .rutPersonaInvolucrada,
        this.informacionPaciente.dataInvolucrados.dataInvolucrado
          .nombresPersonaInvolucrada,
        this.informacionPaciente.dataInvolucrados.dataInvolucrado
          .apellidoPaternoInvolucrado,
        this.informacionPaciente.dataInvolucrados.dataInvolucrado
          .apellidoMaternoInvolucrado,
        this.informacionPaciente.dataInvolucrados.dataInvolucrado
          .parentescoPersonaInvolucrada,
        this.informacionPaciente.dataInvolucrados.dataInvolucrado
          .telefonoPersonaInvolucrada,
        this.informacionPaciente.dataInvolucrados.dataInvolucrado
          .domicilioPersonaInvolucrada,
      ],
      true
    );

    const idHistoriasClinicas = await devolucionId(
      generadorConsultas(`HISTORIAS_CLINICAS`, 5),
      [
        this.antecedentesClinicosPaciente.antecedentesClinicos
          .detallesAntecedentesPerinatales,
        this.antecedentesClinicosPaciente.antecedentesClinicos
          .detallesAntecedentesHospitalizaciones,
        this.antecedentesClinicosPaciente.antecedentesClinicos
          .detallesAntecedentesQuirurgicos,
        this.antecedentesClinicosPaciente.antecedentesClinicos
          .detallesAntecedentesAlergicos,
        this.antecedentesClinicosPaciente.antecedentesClinicos
          .detallesAntecedentesPni,
      ],
      true
    );

    return {
      idPaciente,
      idApoyoEscolaridad,
      idAreaPsiquica,
      idFuncionalidadGenital,
      idHistoriasClinicas,
      idPersonaAcompanante,
      idPersonaInvolucrada,
    };
  }

  crearTablaPrimaria(
    fechaIngreso: Date,
    borradoLogico: boolean,
    idUser: Ids,
    idPaciente: Ids,
    idApoyoEscolaridad: Ids,
    idAreaPsiquica: Ids,
    idFuncionalidadGenital: Ids,
    idHistoriasClinicas: Ids,
    idPersonaAcompanante: Ids,
    idPersonaInvolucrada: Ids
  ) {
    devolucionId(
      generadorConsultas(`FICHAS_TECNICAS`, 10),
      [
        fechaIngreso,
        borradoLogico,
        idUser,
        idPaciente,
        idApoyoEscolaridad,
        idAreaPsiquica,
        idFuncionalidadGenital,
        idHistoriasClinicas,
        idPersonaAcompanante,
        idPersonaInvolucrada,
      ],
      true
    );
  }
}
