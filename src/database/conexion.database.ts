import mysql, { Pool } from "mysql2/promise";


class ConexionDatabase {

  sqlConexion: Pool | null = null;

  constructor() {

      this.crearConexion();
  }

  async crearConexion(){
    try {

      const sql =  mysql.createPool({

        host: "localhost",
        database: "DB_SEGUIMIENTO_DE_TRANSITION",
        user: "root",
        password: "dante569",
      });

      this.sqlConexion = sql;
      

    } catch (err) {
      console.log(`ERROR DE CONEXION A LA BASE DE DATOS ---> ${err}`);
      throw new Error("LA CONEXION A LA BASE D DATOS SE HA PERDIDO");
    }
  }

  async getConnection(){

    if (!this.sqlConexion) {
      throw new Error("LA CONEXION AUN NO SE HA ESTABLECIDO");
    } 
    return this.sqlConexion;
  }


  async closeConnection() {
    if (this.sqlConexion) {

      await this.sqlConexion.end();
    }
  }
}

export default ConexionDatabase;
