import { consultasGenerales } from "../../consultas/consultasGenerales";

export class Tabla {
  async listarPacientes() {
    try {

        const query: string = `select id_paciente, id_ficha_tecnica ,fecha_ingreso, rut_paciente, nombre_paciente,
         nombre_social,apellido_paterno_paciente, apellido_materno_paciente, nombre_centro_salud from  fichas_tecnicas as ft
            join PACIENTES as pa on ft.fk_paciente = pa.id_paciente
            join PROFESIONALES_USUARIOS_SALUD as ucs on ft.fk_profesional_usuario = id_profesional_salud 
            join  CENTROS_SALUD as cs on fk_centro_salud = cs.id_centro_salud
            where estado_ficha  =  true 
            order by fecha_ingreso desc 
        `;

      const dataPaciente = await consultasGenerales(query);

      console.log(dataPaciente);

      return dataPaciente;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
