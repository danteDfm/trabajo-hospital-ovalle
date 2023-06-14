import { consultasGenerales } from "../../consultas/consultasGenerales";

export class Fichas {
  async listarFichaActiva(idFicha: number) {
    const query: string = `
        select 
        nombre_paciente, 
        apellido_paterno_paciente, 
        id_ficha_tecnica, 
        fecha_ingreso,
        fecha_finalizacion, 
        estado_ficha, 
        nivelFormulario
        from fichas_tecnicas as ft
        join PACIENTES AS pa ON ft.fk_paciente = pa.id_paciente
        WHERE  estado_ficha = 1 and id_ficha_tecnica = ?
        `;

    try {
      const fichaActiva = await consultasGenerales(query, [idFicha]);
      return fichaActiva;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async listarFichasInactivas(idPaciente: number) {
    const query: string = `select 
    nombre_paciente, 
    apellido_paterno_paciente, 
    id_ficha_tecnica, 
    fecha_ingreso,
    fecha_finalizacion, 
    estado_ficha, 
    nivelFormulario
    from fichas_tecnicas as ft
    join PACIENTES AS pa ON ft.fk_paciente = pa.id_paciente
    WHERE fk_paciente = 1 
    order by fecha_ingreso desc `;

    try {
      const fichasInactivas = consultasGenerales(query, [idPaciente]);
      return fichasInactivas;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async listarInformacionPaciente(rutPaciente: string) {
    const queryFichaTecnica = `SELECT * FROM Pacientes AS pa
    JOIN fichas_tecnicas AS ft ON pa.id_paciente = ft.fk_paciente 
    WHERE rut_paciente = ? AND id_ficha_tecnica = (SELECT max(id_ficha_tecnica) FROM Pacientes AS pa join fichas_tecnicas AS ft ON pa.id_paciente = ft.fk_paciente 
    WHERE rut_paciente = ?)
    ORDER BY fecha_ingreso desc 
    `;
    const queryAntecedentes: string = `SELECT * FROM HISTORIAS_CLINICAS
    WHERE id_historia_clinica = ?`;
    const queryInvolucrada: string = `SELECT * FROM PERSONAS_INVOLUCRADAS_TRANSICION
    WHERE id_persona_involucrada_transicion = ?
    `;
    const queryPsique: string = `SELECT * FROM AREAS_PSIQUICAS WHERE id_area_psiquica = ?`;
    const queryDdrogas: string = `select * from HISTORIAL_DROGAS
    where fk_paciente  = ? and id_historial_droga = (select max(id_historial_droga) from HISTORIAL_DROGAS WHERE fk_paciente  = ?)
    `;
    const queryDieta: string = `SELECT * FROM HABITOS_ALIMENTICIOS
    where fk_paciente  = ? and id_habito_alimenticio = (SELECT MAX(id_habito_alimenticio) FROM HABITOS_ALIMENTICIOS
    where fk_paciente = ?)
    `;
    const queryIdentidad: string = `SELECT * FROM HISTORIAS_IDENTIDADES_GENEROS
    WHERE fk_paciente = 5 and id_historia_identidad_genero = (SELECT max(id_historia_identidad_genero) FROM HISTORIAS_IDENTIDADES_GENEROS
    WHERE fk_paciente = 5)`;
    const queryPrenda: string = `select * from SELECCION_PRENDA where fk_historia_genero = ?`;

    let idPaciente: number;
    let idFichaTecnica: number;
    let idHistoria: number;
    let fkAreaPsiquica: number;
    let fkHistoriaClinica: number;
    let fkEncargada;
    let fkAcompanante;
    let dataAntecedentes;
    let dataInvolucrado;
    let dataAcompanante;
    let dataPsique;
    let dataDroga;
    let dataDieta;
    let dataHistoria;
    let dataPrenda;

    try {
      const dataFicha = await consultasGenerales(queryFichaTecnica, [
        rutPaciente,
        rutPaciente,
      ]);

      idPaciente = dataFicha[0].id_paciente;
      fkAreaPsiquica = dataFicha[0].fk_area_psiquica;
      fkHistoriaClinica = dataFicha[0].fk_historia_clinica;
      fkEncargada = dataFicha[0].fk_persona_involucrada_encargada;
      fkAcompanante = dataFicha[0].fk_persona_involucrada_acompanante;

      delete dataFicha[0].fk_profesional_usuario;
      delete dataFicha[0].fk_paciente;
      delete dataFicha[0].fk_area_psiquica;
      delete dataFicha[0].fk_historia_clinica;
      delete dataFicha[0].fk_persona_involucrada_acompanante;
      delete dataFicha[0].fk_persona_involucrada_encargada;

      dataAntecedentes = await consultasGenerales(queryAntecedentes, [
        fkHistoriaClinica,
      ]);

      dataInvolucrado = await consultasGenerales(queryInvolucrada, [
        fkEncargada,
      ]);

      dataAcompanante = await consultasGenerales(queryInvolucrada, [
        fkAcompanante,
      ]);

      dataPsique = await consultasGenerales(queryPsique, [fkAreaPsiquica]);

      dataDroga = await consultasGenerales(queryDdrogas, [
        idPaciente,
        idPaciente,
      ]);

      dataDieta = await consultasGenerales(queryDieta, [
        idPaciente,
        idPaciente,
      ]);

      dataHistoria = await consultasGenerales(queryIdentidad, [
        idPaciente,
        idPaciente,
      ]);
      idHistoria = dataHistoria[0].id_historia_identidad_genero;

      dataPrenda = await consultasGenerales(queryPrenda, [idHistoria]);

      return {
        ficha: dataFicha[0],
        antecedentes: dataAntecedentes[0],
        involucrado: dataInvolucrado[0],
        acompanante: dataAcompanante[0],
        areaPsiquica: dataPsique[0],
        historialDrogas: dataDroga[0],
        habitosAlimenticios: dataDieta[0],
        historiaGenero: dataHistoria[0],
        dataPrenda,
      };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
