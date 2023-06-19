import Query from "mysql2/typings/mysql/lib/protocol/sequences/Query";
import { consultasGenerales } from "../../consultas/consultasGenerales";

export class Usuario {

  private rutProfesional?: string;
  private nombreProfesional?: string;
  private contrasenaProfesional?: string;
  private cargoProfesional?: string;
  private rolProfesional?: string;
  private centroProfesional?: number;

  //admin
  //commonUser

  constructor(
    rutProfesional?: string,
    nombreProfesional?: string,
    contrasenaProfesional?: string,
    cargoProfesional?: string,
    rolProfesional?: string,
    centroProfesional?: number,
  ) {

    this.rutProfesional = rutProfesional;
    this.nombreProfesional = nombreProfesional;
    this.contrasenaProfesional = contrasenaProfesional;
    this.cargoProfesional = cargoProfesional;
    this.rolProfesional = rolProfesional;
    this.centroProfesional = centroProfesional;
   
  }

  async ingresarUsuario() {
    try {
      const query: string = `INSERT INTO PROFESIONALES_USUARIOS_SALUD VALUES (NULL,?,?,?,?,?,?)`;

      await consultasGenerales(query, [
        this.rutProfesional,
        this.nombreProfesional,
        this.contrasenaProfesional,
        this.cargoProfesional,
        this.rolProfesional,
        this.centroProfesional
      ]);

     
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
      nombre_usuario = ?,
      contrasena = ?,
      cargo_profesional_salud  = ?,
      fk_centro_salud = ?
      WHERE id_profesional_salud = ?`;


      
      consultasGenerales(query, [
        this.rutProfesional,
        this.nombreProfesional,
        this.contrasenaProfesional,
        this.cargoProfesional,
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
        nombre_usuario,
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

  public setCentroProfesional(centroProfesional: number): void {
    this.centroProfesional = centroProfesional;
  }
  public setRolProfesional(rolProfesional: string): void {
    this.rolProfesional = rolProfesional;
  }
}
