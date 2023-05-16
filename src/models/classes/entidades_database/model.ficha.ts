import {
  consultasGenerales,
  returnNull,
} from "../../../consultas/consultasGenerales";


export class Ficha {


  constructor(

      private apoyoEscolar: number,
      private judicializacion: number,
      private fkUsuario: number,
      private fkPaciente: number,
      private fkApoyo: number,
      private fkJuicio: number,
      private fkAreaPsiquica: number,
      private fkFuncionalidadG: number,
      private fkHistoriasClinicas: number,
      private fkPersonaEncargada: number,
      private fkPersonaAcompanante: number,
      private fechaIngreso: Date,
      private borrado: boolean
  ) {}

  async crearFicha() {
    try {

      console.log("?,".repeat(13).slice(0,-1));

      

      const query: string = `INSERT INTO FICHAS_TECNICAS VALUES (null, ${"?,".repeat(13).slice(0, -1)})`;
      const { insertId: idFicha } = await consultasGenerales(query, [
        this.fechaIngreso,
        this.borrado,

        this.apoyoEscolar,
        this.judicializacion,

        this.fkUsuario,
        this.fkPaciente,
        this.fkApoyo,
        this.fkJuicio,
        this.fkAreaPsiquica,
        this.fkFuncionalidadG,
        this.fkHistoriasClinicas,
        this.fkPersonaEncargada,
        this.fkPersonaAcompanante,
      ]);

      return idFicha;

    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async historiasClinicas(antecedentes: {
    perinatales?: string;
    hospitalizaciones?: string;
    quirurgicos?: string;
    alergicos?: string;
    pni?: string;
  }) {
    try {
      const query: string =
        "INSERT INTO HISTORIAS_CLINICAS VALUES (NULL, ?,?,?,?,?)";

      const { insertId: idAntecedentes } = await consultasGenerales(query, [
        antecedentes.perinatales,
        antecedentes.hospitalizaciones,
        antecedentes.quirurgicos,
        antecedentes.alergicos,
        antecedentes.pni,
      ]);

      return idAntecedentes;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async personaEncargadas(encargada: {
    rutInvolucrada: string;
    nombresInvolucrada: string;
    apellidoPInvolucrada: string;
    apellidoMInvolucrada: string;
    parentescoInvolucrada: string;
    responsabilidadInvolucrada: string;
    telefonoInvolucrada: string;
    domicilioInvolucrada: string;
  }) {
    try {
      const query: string =
        "INSERT INTO PERSONAS_INVOLUCRADAS_TRANSICION VALUES (NULL, ?,?,?,?,?,?,?,?)";
      const { insertId: idInvolucrado } = await consultasGenerales(query, [
        encargada.rutInvolucrada,
        encargada.nombresInvolucrada,
        encargada.apellidoPInvolucrada,
        encargada.apellidoMInvolucrada,
        encargada.parentescoInvolucrada,
        encargada.responsabilidadInvolucrada,
        encargada.telefonoInvolucrada,
        encargada.domicilioInvolucrada,
      ]);

      return idInvolucrado;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async detallesFicha(
    detalleApoyo: string,
    aGenital?: string,
    detalleJuicio?: string,
    detallesFarmacos?: string
  ) {
    try{

      const query: string = "INSERT INTO ANTECEDENTES_FUNCIONALIDADES_GENITAL VALUES (null, ?)";
      const queryA: string = "INSERT INTO DETALLES_APOYO VALUES (NULL, ?)";
      const queryJ: string = "INSERT INTO  DETALLES_JUICIO VALUES (NULL, ?)";
      const queryF: string = "INSERT INTO  TIPOS_FARMACOS VALUES (NULL, ?)";

    const { insertId: idIndGenital } = await consultasGenerales(query, [aGenital]);
    const { insertId: idDetalleApoyo } = await returnNull(queryA, detalleApoyo);
    const { insertId: idDetalleJuicio } = await returnNull(queryJ, detalleJuicio);
    const { insertId: idFarmacos } = await returnNull(queryF, detallesFarmacos);

    

    return {

      idIndGenital,
      idDetalleApoyo,
      idDetalleJuicio,
      idFarmacos,
    };
    }catch(err){

      console.log(err);
      throw(err);

    }
  }

  static async areasPsiquicas(
    psique: {
      controlEquipo: number;
      psicoterapia: number;
      evolucionPsiquica: number;
      diagnosticoPsiquiatrico: number;
      utilizacionFarmaco: number;
    },
    idFarmacos: number
  ) {
    try {
      const query: string =
        "INSERT INTO AREAS_PSIQUICAS VALUES (NULL, ?,?,?,?,?,?)";

      const { insertId: idAreapsiquica } = await consultasGenerales(query, [
        psique.controlEquipo,
        psique.psicoterapia,
        psique.evolucionPsiquica,
        psique.diagnosticoPsiquiatrico,
        psique.utilizacionFarmaco,
        idFarmacos,
      ]);

      return idAreapsiquica;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
