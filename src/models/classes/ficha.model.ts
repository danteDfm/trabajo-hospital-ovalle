import { consultasGenerales } from "../../consultas/consultasGenerales";

export class Ficha {
  fechaIngreso?: string;
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

  async actualizarFicha(fechaIngreso: string, nivel: number, idFicha: number) {
    const query: string = `UPDATE fichas_tecnicas 
    SET fecha_ingreso = ?, nivelFormulario = ? 
    WHERE  id_ficha_tecnica = ?
    `;

    try {
      await consultasGenerales(query, [fechaIngreso, nivel, idFicha]);

      return "La ficha ha sido actulizada con los nuevos datos correctamente";
    } catch (err: any) {
      throw new Error(err);
    }
  }


  

  async crearFichaTecnica(estado:boolean){
    const query: string = `INSERT INTO fichas_tecnicas(
        fecha_ingreso,
        estado_ficha,
        nivelFormulario, 
        apoyo_escolar,
        judicializacion,
        detalles_apoyo_es,
        detalles_judicializacion,
        fk_paciente,
        fk_profesional_usuario,
        fk_area_psiquica,
        fk_historia_clinica,
        fk_persona_involucrada_encargada,
        fk_persona_involucrada_acompanante)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    try {

      
      await consultasGenerales(query, [
        this.fechaIngreso,
        estado,
        this.nivelFormulario,
        this.apoyoEscolar,
        this.judicializacion,
        this.detallesApoyo,
        this.detallesJudicializacion,
        this.fkPaciente,
        this.fkUsuario,
        this.fkAreaPsiquica,
        this.fkHistoria,
        this.fkeEncargada,
        this.fkAcompanante,
      ]);

      return `Los datos han sido creado correctamente`;
    } catch (err: any) {
      throw new Error(err);
    }
  }




  async verificarEstado(rutPaciente: string) {
    const query: string = `select estado_ficha, id_ficha_tecnica from fichas_tecnicas as ft
    left join PACIENTES as pa on ft.fk_paciente = pa.id_paciente
    where rut_paciente  = ?  AND estado_ficha = 1
    `;

    const queryUpdate = `update fichas_tecnicas set estado_ficha = 0,
    nivelFormulario  = 0
    where id_ficha_tecnica = ?`;

    let estado;
    let idFicha;
    let idPaciente;

    console.log(idFicha);

    try {
      let estadioFicha = await consultasGenerales(query, [rutPaciente]);

      if (!estadioFicha[0]) return 0;

      estado = estadioFicha[0].estado_ficha;
      idFicha = estadioFicha[0].id_ficha_tecnica;
      idPaciente = estadioFicha[0].id_paciente;

      if (estado == 1) {
        console.log(idFicha);
        consultasGenerales(queryUpdate, [idFicha]);
        return idPaciente;
      }

      return 0;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
