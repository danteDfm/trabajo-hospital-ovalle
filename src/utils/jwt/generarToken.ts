import jsonToken from "jsonwebtoken";
import 'dotenv/config';

export class Token {

  private secret: string;
  private payload: {};
  private token: string;
  private dataToken: {};

  constructor() {
    this.secret = process.env.SECRET_TOKEN as string;
    this.payload = {};
    this.token = "";
    this.dataToken = {};
  }

  formarPayload(idUser: number, roleUser: string) {
    this.payload = {
      sub: idUser,
      scope: roleUser,
    };
    return this.payload;
  }

  generarToken() {
    this.token = jsonToken.sign(this.payload, this.secret, {expiresIn: '5h'});
    return this.token;
  }

  verificarToken() {
    this.dataToken = jsonToken.verify(this.token, this.secret);
    return this.dataToken;
  }
}
