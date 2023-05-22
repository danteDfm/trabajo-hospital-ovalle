import { consultasGenerales } from "../../../consultas/consultasGenerales";

export class DataTable {
  constructor() {}

  async dataPaciente() {
    try {
      const query: string = `SELECT id_paciente, id_ficha_tecnica , rut_paciente,
      nombre_paciente,apellido_paterno_paciente, apellido_materno_paciente 
      FROM fichas_tecnicas AS ft JOIN pacientes AS  pa ON ft.fk_paciente = pa.id_paciente
      ORDER BY id_paciente DESC `;

      const data = await consultasGenerales(query);

      return data;
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  }
}
