import { consultasGenerales } from "../../consultas/consultasGenerales";
import { compararContrasena } from "../../utils/bcrypt/hash.contrasena";
import { Token } from "../../utils/jwt/generarToken";

export class Sesion {
  private email?: string;
  private contrasena?: string;
  private objToken;

  constructor(email?: string, contrasena?: string) {
    this.email = email;
    this.contrasena = contrasena;
    this.objToken = new Token();
  }

  async login() {
    try {
      const query: string = `
            SELECT email_profesional_salud, contrasena, id_profesional_salud, roles  FROM profesionales_usuarios_salud
            WHERE email_profesional_salud = ?`;

      if (!this.email || !this.contrasena) {
        throw {
          error: "Los datos no puede estar vacios",
          code: 101,
        };
      }

      const result = await consultasGenerales(query, [this.email]);

      if (!result[0]) {
        throw {
          error: "EL email no se encuentra en la base de datos",
          code: 102,
        };
      }

      const verificacion = await compararContrasena(
        this.contrasena,
        result[0].contrasena
      );

      if (!verificacion) {
        throw {
          error: "Contraseña es invalida",
          code: 103,
        };
      }

      this.objToken.formarPayload(
        result[0].id_profesional_salud,
        result[0].roles
      );

      const tokenJwt = this.objToken.generarToken();

      return tokenJwt;
    } catch (err: any) {
      throw err;
    }
  }

  setEmail(email: string) {
    this.email = email;
  }
  setContrasena(contrasena: string) {
    this.contrasena = contrasena;
  }
}
