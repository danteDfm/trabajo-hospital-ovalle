import { consultasGenerales } from "../../consultas/consultasGenerales";

export class Tabla {
  async listarPacientesPorCentro(nombreCentro:string) {

    const query: string = ` 
    SELECT estado_ficha, id_paciente, id_ficha_tecnica, fecha_ingreso, rut_paciente, nombre_paciente,
    nombre_social, apellido_paterno_paciente, apellido_materno_paciente, nombre_centro_salud
    FROM fichas_tecnicas AS ft
    JOIN PACIENTES AS pa ON ft.fk_paciente = pa.id_paciente
    JOIN PROFESIONALES_USUARIOS_SALUD AS ucs ON ft.fk_profesional_usuario = id_profesional_salud
    JOIN CENTROS_SALUD AS cs ON fk_centro_salud = cs.id_centro_salud
    WHERE nombre_centro_salud = ?
    ORDER BY CASE WHEN estado_ficha = 'inactivo' THEN 1 ELSE 0 END, fecha_ingreso DESC
    `;

    try {

      
      if(!nombreCentro) throw({

        ok:false,
        msj: "Falta el nombre del centro"

      });
        
      const dataPaciente = await consultasGenerales(query, [nombreCentro]);


      return dataPaciente;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }


  async pacientesOtrosCentros(nombreCentro:string){

    const query:string = `SELECT estado_ficha, id_paciente, id_ficha_tecnica, fecha_ingreso, rut_paciente, nombre_paciente,
    nombre_social, apellido_paterno_paciente, apellido_materno_paciente, nombre_centro_salud
    FROM fichas_tecnicas AS ft
    JOIN PACIENTES AS pa ON ft.fk_paciente = pa.id_paciente
    JOIN PROFESIONALES_USUARIOS_SALUD AS ucs ON ft.fk_profesional_usuario = id_profesional_salud
    JOIN CENTROS_SALUD AS cs ON fk_centro_salud = cs.id_centro_salud
    WHERE nombre_centro_salud != ?
    ORDER BY fecha_ingreso DESC`;

    try{

      if(!nombreCentro) throw({

        ok:false,
        msj: "Falta el nombre del centro"

      });

       const dataPaciente = await consultasGenerales(query, [nombreCentro]);
       return dataPaciente;


    }catch(err:any){


      throw new Error(err);

    }


  }
}
