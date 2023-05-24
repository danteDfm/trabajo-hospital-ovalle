import Query from "mysql2/typings/mysql/lib/protocol/sequences/Query";
import { consultasGenerales } from "../../consultas/consultasGenerales";

export class Usuario {
  private rutProfesional?: string;
  private nombreProfesional?: string;
  private cargoProfesional?: string;
  private contrasenaProfesional?: string;
  private emailProfesional?: string;
  private centroProfesional?: number;
  private rolProfesional?: string;

  //admin
  //commonUser

  constructor(
    rutProfesional?: string,
    nombreProfesional?: string,
    cargoProfesional?: string,
    contrasenaProfesional?: string,
    emailProfesional?: string,
    centroProfesional?: number,
    rolProfesional?: string
  ) {
    this.rutProfesional = rutProfesional;
    this.nombreProfesional = nombreProfesional;
    this.emailProfesional = cargoProfesional;
    this.cargoProfesional = contrasenaProfesional;
    this.contrasenaProfesional = emailProfesional;
    this.centroProfesional = centroProfesional;
    this.rolProfesional = rolProfesional;
  }

  async ingresarUsuario() {
    try {
      const query: string = `INSERT INTO PROFESIONALES_USUARIOS_SALUD VALUES (NULL, ?,?,?,?,?,?,?)`;

      await consultasGenerales(query, [
        this.rutProfesional,
        this.nombreProfesional,
        this.emailProfesional,
        this.cargoProfesional,
        this.contrasenaProfesional,
        this.centroProfesional,
        this.rolProfesional,
      ]);

      console.log(this.rutProfesional);
      return "Usuario ha sido creado";
    } catch (err) {
      console.log(err);
      throw "Error al crear el usuario";
    }
  }

  async actualizarUsuario(idProfesionalSalud: number) {
    try {
      const query: string = `
    UPDATE PROFESIONALES_USUARIOS_SALUD SET
    rut_profesional_salud = ?, 
    nombre_profesional_salud = ?,
    email_profesional_salud = ?,
    cargo_profesional_salud  = ?,
    contrasena = ?,
    fk_centro_salud = ?
    WHERE id_profesional_salud = ?`;

      consultasGenerales(query, [
        this.rutProfesional,
        this.nombreProfesional,
        this.emailProfesional,
        this.cargoProfesional,
        this.contrasenaProfesional,
        this.centroProfesional,
        idProfesionalSalud,
      ]);

      return "Los cambios se han guardado correctamente";
    } catch (err) {
      console.log(err);
      throw "Error al actualizar usuario";
    }
  }
  async listarUsuarios() {
    try {
      const rolApartado = "administrador";
      const query: string = `
    SELECT id_profesional_salud,
    rut_profesional_salud,
    nombre_profesional_salud, email_profesional_salud,
    cargo_profesional_salud,  
    fk_centro_salud, roles FROM PROFESIONALES_USUARIOS_SALUD WHERE roles != ?`;
      const listUsuarios = await consultasGenerales(query, [rolApartado]);
      return listUsuarios;
    } catch (err) {
      console.log(err);
      throw "Error consulta listar usuario";
    }
  }

  async exitenciaUsuario(rutProfesional: string) {
    try {
      const query =
        "SELECT EXISTS (SELECT 1 FROM PROFESIONALES_USUARIOS_SALUD WHERE rut_profesional_salud = ?) AS existe_registro;";
      const existe = await consultasGenerales(query, [rutProfesional]);
      return existe[0].existe_registro;
    } catch (err) {
      console.log(err);
      throw "Error en la cosulta, existencia usuario";
    }
  }

  public setRutProfesional(rutProfesional: string): void {
    this.rutProfesional = rutProfesional;
  }
  public setNombreProfesional(nombreProfesional: string): void {
    this.nombreProfesional = nombreProfesional;
  }
  public setCargoProfesional(cargoProfesional: string): void {
    this.cargoProfesional = cargoProfesional;
  }
  public setContrasenaProfesional(contrasenaProfesional: string): void {
    this.contrasenaProfesional = contrasenaProfesional;
  }

  public SetEmailProfesional(emailProfesional: string): void {
    this.emailProfesional = emailProfesional;
  }
  public setCentroProfesional(centroProfesional: number): void {
    this.centroProfesional = centroProfesional;
  }
  public setRolProfesional(rolProfesional: string): void {
    this.rolProfesional = rolProfesional;
  }
}
