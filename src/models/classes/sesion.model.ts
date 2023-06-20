import { consultasGenerales } from "../../consultas/consultasGenerales";
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

  async login(idProfesional: number, rol: string) {
    try {
      this.objToken.formarPayload(idProfesional, rol);

      const tokenJwt = this.objToken.generarToken();

      return tokenJwt;
    } catch (err: any) {
      throw err;
    }
  }

  verificarToken(token: string) {
    try {
      const tokenFormat = token.split(" ").pop()?.toString();
      if (!tokenFormat) throw { ok: false };
      const data = this.objToken.verificarToken(tokenFormat);

      return data;
    } catch (err) {
      throw err;
    }
  }

  async seleccionarUsuario(idUser: number) {
    const query: string = `
    select id_profesional_salud, nombre_usuario, cargo_profesional_salud,
    roles, comuna_centro_atencion, nombre_centro_salud ,logo  from PROFESIONALES_USUARIOS_SALUD as ps
    left join CENTROS_SALUD as cs on ps.fk_centro_salud = cs.id_centro_salud
    where id_profesional_salud  = ?;
    `;

    try {
      if (!idUser) throw "id vacio";
      const dataUsuario = await consultasGenerales(query, [idUser]);
      return dataUsuario[0];
    } catch (err) {
      console.log(err);
      throw new Error("Error en la solicitud");
    }
  }

  setEmail(email: string) {
    this.email = email;
  }
  setContrasena(contrasena: string) {
    this.contrasena = contrasena;
  }
}
