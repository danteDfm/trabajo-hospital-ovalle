import { consultasGenerales } from "../../../consultas/consultasGenerales";


export class Usuario{

  private rutProfesionalSalud?: string;
  private nombreProfesionalSalud?: string;
  private emailProfesionalSalud?: string;
  private contrasena?: string;
  private cargoProfesionalSalud?: string;
  private centroSalud?: number;

 
  constructor(profesional: {
    
    rutProfesional?: string;
    nombreProfesional?: string;
    emailProfesional?: string;
    contrasena?: string;
    cargoProfesional?: string;
    centroSalud?: number;
  }) {
    this.rutProfesionalSalud = profesional?.rutProfesional;
    this.nombreProfesionalSalud = profesional?.nombreProfesional;
    this.emailProfesionalSalud = profesional?.nombreProfesional;
    this.contrasena = profesional?.contrasena;
    this.cargoProfesionalSalud = profesional?.cargoProfesional;
    this.centroSalud = profesional?.centroSalud;

    
  }

  async crearProfesional() {
    try {
      
      const query: string = `INSERT INTO  PROFESIONALES_USUARIOS_SALUD
      VALUES (NULL, ?,?  ,? ,? ,? ,?)`;

      const objqueryCrear = await consultasGenerales(query, [
        this.rutProfesionalSalud,
        this.nombreProfesionalSalud,
        this.emailProfesionalSalud,
        this.cargoProfesionalSalud,
        this.centroSalud,
        this.contrasena,
      ]);

      console.log(objqueryCrear);
      
    } catch(err){

      throw(err);
    }
  }

  async listarProfesional(id:number) {
    try {
      
      const query: string = "SELECT * FROM PROFESIONALES_USUARIOS_SALUD WHERE id_profesional_salud = ?";

      const dataProfesional = await consultasGenerales(query, [id]);

      this.rutProfesionalSalud =  await dataProfesional[0]?.rut_profesional_salud;
      this.nombreProfesionalSalud = await dataProfesional[0]?.nombre_profesional_salud;
      this.emailProfesionalSalud = await dataProfesional[0]?.email_profesional_salud;
      this.cargoProfesionalSalud = await dataProfesional[0]?.cargo_profesional_salud;
      this.centroSalud = await dataProfesional[0]?.fk_centro_salud;
      this.contrasena = await dataProfesional[0]?.constrasena;

     
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async actualizarProfesional() {
    try {
      const query: string = `UPDATE PROFESIONALES_USUARIOS_SALUD SET email_profesional_salud = ?,
      cargo_profesional_salud = ?,
      fk_centro_salud = ?,
      contrasena = ? 
      WHERE rut_profesional = ?
    `;
      const dataProfesional = await consultasGenerales(query, [
        this.emailProfesionalSalud,
        this.cargoProfesionalSalud,
        this.centroSalud,
        this.contrasena,
        this.rutProfesionalSalud,
      ]);

      return dataProfesional;

    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  getNombre() {
    return this.nombreProfesionalSalud;
  }
  getRut() {
    return this.rutProfesionalSalud;
  }
  getEmail() {

    return this.emailProfesionalSalud;
  }
  getContrasena() {
    return this.contrasena;
  }
  getCargo() {
    return this.cargoProfesionalSalud;
  }
  getCentro() {
    return this.centroSalud;
  }
}
