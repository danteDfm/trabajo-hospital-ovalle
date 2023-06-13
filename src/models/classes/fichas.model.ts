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

  async listarFichasInactivas(idPaciente:number) {
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

        const fichasInactivas=consultasGenerales(query, [idPaciente]);
        return fichasInactivas;
    
    } catch (err: any) {
      throw new Error(err);
    }
  }



  
}
