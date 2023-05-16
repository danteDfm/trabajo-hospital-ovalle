import { consultasGenerales, returnNull } from "../../../consultas/consultasGenerales";
import { repetir } from "../../../utils/generaConsultas";


export class Paciente {
  constructor(
    private paciente?: {
      fechaNacimientoPaciente: Date;
      antecedenteFamiliares: string;
      usoDroga: string;
      pronombre?: string;
      nombreSocial?: string;
      domicilioPaciente?: string;
      rutPaciente: string;
      nombrePaciente: string;
      apellidoPaternoPaciente?: string;
      apellidoMaternoPaciente?: string;
    }
  ) {}

  async crearPaciente() {
    try {
      const result = await consultasGenerales(
        `INSERT INTO PACIENTES VALUES (null, ${repetir(
          10
        )} , null, null, null)`,
        [
          this.paciente?.rutPaciente,
          this.paciente?.nombrePaciente,
          this.paciente?.apellidoPaternoPaciente,
          this.paciente?.apellidoMaternoPaciente,
          this.paciente?.pronombre,
          this.paciente?.nombreSocial,
          this.paciente?.fechaNacimientoPaciente,
          this.paciente?.domicilioPaciente,
          this.paciente?.usoDroga,
          this.paciente?.antecedenteFamiliares,
        ]
      );

      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

 static async traerDataPaciente() {
    try {

      const dataPaciente = await consultasGenerales(`SELECT  id_ficha_tecnica,
     rut_paciente, nombre_paciente, 
     apellido_paterno_paciente,
     apellido_materno_paciente  FROM 
     FICHAS_TECNICAS AS ft JOIN PACIENTES AS pa ON  ft.fk_paciente = pa.id_paciente`);

      console.log(dataPaciente);
      return dataPaciente;
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  }

   actualiarLlavesForaneas(
    fkAFamilia: number,
    fkDDrogas: number,
    fkHAlimenticios: number,
    idFicha: number
  ) {
    try {
      consultasGenerales(
        `UPDATE PACIENTES SET fk_antecedentes_familiares = ?, fk_detalles_drogas = ?, fk_habitos_alimenticios=? 
         WHERE id_paciente = ?`, [fkAFamilia, fkDDrogas, fkHAlimenticios, idFicha]
      );
    } catch (err) {
      console.log(err);
      throw new Error("Error de consulta");
    }
  }

   async crearDetallesPaciente(detallesPaciente: {
    detallesDrogas?: string;
    detallesAlimenticios?: string;
    detallesAntecedentes?: string;
    
  }, idPaciente:number) {
    try {

      const consultas = {

        drogas: "INSERT INTO DETALLES_DROGAS VALUES (NULL, ?)",
        alimenticio: "INSERT INTO HABITOS_ALIMENTICIOS VALUES (NULL, ?)",
        antecedentesFamilia: "INSERT INTO ANTECEDENTES_FAMILIARES VALUES (NULL, ?)",

      };

      const {insertId: idDrogas} = await returnNull(consultas.drogas, detallesPaciente.detallesDrogas);

      const { insertId: idAlimenticio } = await returnNull(
        consultas.alimenticio, detallesPaciente.detallesAlimenticios);

       const { insertId: idAFamilia } = await returnNull(
        consultas.antecedentesFamilia,detallesPaciente.detallesAntecedentes);

        this.actualiarLlavesForaneas(idAFamilia, idDrogas, idAFamilia, idPaciente);

      return {

        idDrogas: idDrogas,
        idAlimenticio,
        idAFamilia
        
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
