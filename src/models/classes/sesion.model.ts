import { consultasGenerales } from "../../consultas/consultasGenerales";

export class Sesion {
  private email?: string;
  private contrasena?: string;

  constructor(email?: string, contrasena?: string) {
    this.email = email;
    this.contrasena = contrasena;
  }

  async login() {
    try {

      const query: string = `
            SELECT email_profesional_salud, contrasena FROM profesionales_usuarios_salud
            WHERE email_profesional_salud = ?`;

      const result = await consultasGenerales(query, [this.email]);
      return result;

    } catch (err) {
      console.log(err);
      throw new Error("Error en la consulta");
    }
  }

  setEmail(email: string) {
    this.email = email;
  }
  setContrasena(contrasena: string) {
    this.contrasena = contrasena;
  }
}
