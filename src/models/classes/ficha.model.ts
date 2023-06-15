import { consultasGenerales } from "../../consultas/consultasGenerales";

export class Ficha {
  fechaIngreso?: string;
  fechaFinalizacion?: Date;
  estadoFicha?: boolean;
  nivelFormulario?: number;
  apoyoEscolar?: boolean;
  judicializacion?: boolean;
  detallesApoyo?: string;
  detallesJudicializacion?: string;
  fkPaciente?: number;
  fkUsuario?: number;
  fkAreaPsiquica?: number;
  fkHistoria?: number;
  fkeEncargada?: number;
  fkAcompanante?: number;

  constructor(
    fechaIngreso?: string,
    fechaFinalizacion?: Date,
    estadoFicha?: boolean,
    nivelFormulario?: number,
    apoyoEscolar?: boolean,
    judicializacion?: boolean,
    detallesApoyo?: string,
    detallesJudicializacion?: string,
    fkPaciente?: number,
    fkUsuario?: number,
    fkAreaPsiquica?: number,
    fkHistoria?: number,
    fkeEncargada?: number,
    fkAcompanante?: number
  ) {
    this.fechaIngreso = fechaIngreso;
    this.fechaFinalizacion = fechaFinalizacion;
    this.estadoFicha = estadoFicha;
    this.nivelFormulario = nivelFormulario;
    this.apoyoEscolar = apoyoEscolar;
    this.judicializacion = judicializacion;
    this.detallesApoyo = detallesApoyo;
    this.detallesJudicializacion = detallesJudicializacion;
    this.fkPaciente = fkPaciente;
    this.fkUsuario = fkUsuario;
    this.fkAreaPsiquica = fkAreaPsiquica;
    this.fkHistoria = fkHistoria;
    this.fkeEncargada = fkeEncargada;
    this.fkAcompanante = fkAcompanante;
  }

  constructo(
    fechaIngreso?: string,
    nivelFormulario?: number,
    fkPaciente?: number,
    fkUsuario?: number,
    fkeEncargada?: number,
    fkAcompanante?: number
  ) {
    this.fechaIngreso = fechaIngreso;
    this.nivelFormulario = nivelFormulario;
    this.fkPaciente = fkPaciente;
    this.fkUsuario = fkUsuario;
    this.fkeEncargada = fkeEncargada;
    this.fkAcompanante = fkAcompanante;
  }

  async crearFicha() {

    const query = `
        insert into fichas_tecnicas
        (fecha_ingreso,
        nivelFormulario,
        fk_paciente,
        fk_profesional_usuario,
        fk_persona_involucrada_encargada,
        fk_persona_involucrada_acompanante)
        VALUES (?,?,?,?,?,?)`;

    try {
      await consultasGenerales(query, [
        this.fechaIngreso,
        this.nivelFormulario,
        this.fkPaciente,
        this.fkUsuario,
        this.fkeEncargada,
        this.fkAcompanante,
      ]);

      return `Ficha ha sido creada correctamente`;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async verificarEstado(rutPaciente:string){

    const query:string = `select estado_ficha, id_ficha_tecnica from fichas_tecnicas as ft
    left join PACIENTES as pa on ft.fk_paciente = pa.id_paciente
    where rut_paciente  = ?  AND estado_ficha = 1
    `;

    const queryUpdate = `update fichas_tecnicas set estado_ficha = 0
    where id_ficha_tecnica = ?`;

    let estado;
    let idFicha;
  try{


 
    let estadioFicha = await consultasGenerales(query, [rutPaciente]);

    if(!estadioFicha[0]) return 0;

    

     estado=estadioFicha[0].estado_ficha;
     idFicha=estadioFicha[0].id_ficha_tecnica;

    if(estado == 1){

      console.log(idFicha);
      consultasGenerales(queryUpdate, [idFicha]);

    }


    return 0;

  }catch(err:any){

    console.log(err);
    throw new Error(err);

  };

  }
}
